import { CommandInteraction, SlashCommandBuilder } from 'discord.js'
import 'dotenv/config'
export const data = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('Ask the bot a question')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question you want to ask')
      .setRequired(true)
  )

export async function execute(interaction: any) {
  const question = interaction.options.getString('question')

  await interaction.deferReply()
  const answer = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  }).then((res) => res.json())
  setTimeout(() => {}, 10000)
  if (answer.result.output.length > 2000) {
    return await interaction.editReply(answer.result.output.slice(0, 2000))
  }

  // return interaction.reply('Fuck you stupid ass hole')
  return await interaction.editReply(answer.result.output)
}
