import * as dotenv from 'dotenv'
import { REST, Routes } from 'discord.js'

dotenv.config()

const token = process.env['DISCORD_BOT_TOKEN']
const clientId = process.env['DISCORD_CLIENT_ID']
const guildId = process.env['DISCORD_GUILD_ID']

import { pingCommnand } from './src/commands/ping.js'
import { gptCommand } from './src/commands/gpt.js'
import { dalleCommand } from './src/commands/dalle.js'

const commands = [
  pingCommnand.data.toJSON(),
  gptCommand.data.toJSON(),
  dalleCommand.data.toJSON(),
]

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token)

// and deploy your commands!
;(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    )

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    )
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error)
  }
})()
