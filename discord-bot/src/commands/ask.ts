import { CommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('Ask the bot a question')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question you want to ask')
      .setRequired(true)
  )

export async function execute(interaction: CommandInteraction) {
  return interaction.reply('Fuck you stupid ass hole')
}
