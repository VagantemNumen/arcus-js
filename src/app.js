import * as dotenv from 'dotenv'
import { Client, Events, GatewayIntentBits } from 'discord.js'

dotenv.config()
const token = process.env['DISCORD_BOT_TOKEN']

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, (c) => {
  console.log(`Bot is ready! Logged in as ${c.user.tag}`)
})

client.login(token)
