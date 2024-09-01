import TelegramBot from 'node-telegram-bot-api'
import 'dotenv/config'

const token = process.env.TELEGRAM_BOT_TOKEN as string
const bot = new TelegramBot(token, { polling: true })

type TelegramMessage = {
  message_id: number
  from: {
    id: number
    is_bot: boolean
    first_name: string
    last_name: string
    username: string
    language_code: string
  }
  chat: {
    id: number
    first_name: string
    last_name: string
    username: string
    type: string
  }
  date: number
  text: string
}

bot.on('message', (msg: any) => {
  const chatId = msg.chat.id
  console.log(msg)
  bot.sendMessage(chatId, 'Received your message')
})
