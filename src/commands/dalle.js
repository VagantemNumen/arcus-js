import { SlashCommandBuilder } from 'discord.js'
import { getImage } from '../openai/dalle.js'

export const dalleCommand = {
  data: new SlashCommandBuilder()
    .setName('dalle')
    .setDescription('Generate an image with DALL-E')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('Prompt for the AI')
        .setRequired(true),
    ),
  execute: async (interaction) => {
    await interaction.deferReply()
    const prompt = interaction.options.getString('prompt')
    let reply = await getImage(prompt)
    await interaction.editReply(reply)
  },
}
