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

bot.on('message', async (msg: any) => {
  const chatId = msg.chat.id
  // console.log(msg)
  const question = msg.text
  console.log('Question' + question)
  const answer = await fetch(process.env.API_ENDPOINT as string, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  }).then((res) => res.json())
  setTimeout(() => {}, 5000)
  console.log('Answer', answer)
  bot.sendMessage(chatId, answer.result.output)
})
