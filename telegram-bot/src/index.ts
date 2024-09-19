import TelegramBot, { Message } from 'node-telegram-bot-api'
import 'dotenv/config'
import axios from 'axios'
import { APIResponse } from './types/type'

const token = process.env.TELEGRAM_BOT_TOKEN as string
const bot = new TelegramBot(token, { polling: true })

bot.on('message', async (msg: Message) => {
  const chatId = msg.chat.id
  const question = msg.text
  console.log('Question' + question)
  try {
    const response = await axios.post<APIResponse>(
      process.env.API_ENDPOINT as string,
      { question },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const answer: string = response.data.result.output.raw
    bot.sendMessage(chatId, answer)
  } catch (error) {
    console.error('Error fetching answer:', error)
    bot.sendMessage(
      chatId,
      'Sorry, there was an error processing your request.'
    )
  }
})
