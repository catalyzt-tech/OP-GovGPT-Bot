import { SlashCommandBuilder } from 'discord.js'
import { APIResponse } from '../types/types'
import axios from 'axios'
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

export async function execute(interaction: any): Promise<void> {
  const question: string = interaction.options.getString('question')
  console.log(`Question: ${question}`)
  await interaction.deferReply()
  const response = await axios
    .post<APIResponse>(
      process.env.API_ENDPOINT as string,
      { question },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error(error)
      return {
        result: { output: 'Error fetching response, please try again' },
        links: [],
      }
    })

  setTimeout(() => {}, 1000)
  // if (answer.result.output.length > 2000) {
  //   return await interaction.editReply(answer.result.output.slice(0, 2000))
  // }
  // const resultData: string =
  //   response.result.output +
  //   '\n\n' +
  //   '**Citation:**' +
  //   '\n' +
  //   response.links.map((link) => `• ${link}`).join('\n')
  const resultData: string = response.result.output
  return await interaction.editReply(resultData)
}
