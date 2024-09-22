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
    .then((response) => response.data as APIResponse)
    .catch((error) => {
      console.error(error)
      return {
        result: 'Error fetching response, please try again',
        links: [],
      }
    })
  // const resultData: string =
  //   response.result.output +
  //   '\n\n' +
  //   '**Citation:**' +
  //   '\n' +
  //   response.links.map((link) => `• ${link}`).join('\n')
  //Handle the case where the response is an object with a raw property or can't be found
  const resultData = response.result
    ? response.result
    : `I’m sorry, but I’m having trouble finding any helpful information on this topic. Please try rephrasing your question or asking something else.`
  return interaction.editReply(resultData)
}
