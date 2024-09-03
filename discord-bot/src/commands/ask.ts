import { SlashCommandBuilder } from 'discord.js'
import { APIResponse } from '../types/types'
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
  try {
    const question: string = interaction.options.getString('question') as string
    console.log(question)
    await interaction.deferReply()
    const answer: APIResponse = await fetch(
      process.env.API_ENDPOINT as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      }
    ).then((res) => res.json())
    setTimeout(() => {}, 2000)
    // if (answer.result.output.length > 2000) {
    //   return await interaction.editReply(answer.result.output.slice(0, 2000))
    // }
    const resultData: string =
      answer.result.output +
      '\n\n' +
      '**Citation:**' +
      '\n' +
      answer.links.map((link) => `• ${link}`).join('\n')
    return await interaction.editReply(resultData)
  } catch (error) {
    console.error(error)
    throw new Error(
      'There was an error while processing your request, please try again'
    )
  }
}
