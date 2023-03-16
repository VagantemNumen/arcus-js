import * as dotenv from 'dotenv'
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js'

import { pingCommnand } from './commands/ping.js'
import { gptCommand } from './commands/gpt.js'
import { dalleCommand } from './commands/dalle.js'
import { voiceAICommand } from './commands/voiceai.js'

dotenv.config()
const token = process.env['DISCORD_BOT_TOKEN']

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.commands = new Collection()
client.commands.set(pingCommnand.data.name, pingCommnand)
client.commands.set(gptCommand.data.name, gptCommand)
client.commands.set(dalleCommand.data.name, dalleCommand)
client.commands.set(voiceAICommand.data.name, voiceAICommand)

client.once(Events.ClientReady, (c) => {
  console.log(`Bot is ready! Logged in as ${c.user.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    return
  }

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  }
})

client.login(token)

// https://discord.com/oauth2/authorize?client_id=174514747482439680&scope=applications.commands%20bot&permissions=397321283584
