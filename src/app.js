import * as dotenv from 'dotenv'
import Eris from 'eris'

dotenv.config()
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const bot = new Eris(BOT_TOKEN, {
  intents: ['guildMessages'],
})

bot.on('ready', () => console.log('Bot is ready!'))

bot.on('error', (err) => console.error(err))

bot.on('messageCreate', (msg) => {
  console.log(msg)
  if (msg.content == '!ping') {
    bot.createMessage(msg.channel.id, 'Pong!')
  }
})

bot.connect()
