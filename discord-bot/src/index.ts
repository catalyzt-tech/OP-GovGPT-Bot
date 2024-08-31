import 'dotenv/config'
import { Client, Events, GatewayIntentBits } from 'discord.js'
import * as ask from './commands/ask'

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
  ],
})

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.on(Events.MessageCreate, (message) => {
  // Ignore messages from the bot itself
  console.log(message)
  if (message.author.bot) return

  console.log(message.content)
  if (message.content === 'ping') {
    message.reply('pong')
  }
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction
  console.log(commandName)
  if (commandName === 'ask') {
    ask.execute(interaction)
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)
