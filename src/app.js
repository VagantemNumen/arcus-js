import * as dotenv from 'dotenv'
import Eris from 'eris'

dotenv.config()
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN

const bot = new Eris(BOT_TOKEN)

bot.on('ready', () => console.log('Bot is ready!'))

bot.on('messageCreate', (msg) => {
  if (msg.content == '!ping') {
    bot.createMessage(msg.channel.id, 'Pong!')
  }
})

bot.connect()
