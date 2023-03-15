import { SlashCommandBuilder } from 'discord.js'
import { getChat } from '../openai/chat.js'

export const gptCommand = {
  data: new SlashCommandBuilder()
    .setName('gpt')
    .setDescription('Get a reply from ChatGPT')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('Prompt for the AI')
        .setRequired(true),
    ),
  execute: async (interaction) => {
    await interaction.deferReply()

    const prompt = interaction.options.getString('prompt')
    const reply = await getChat(prompt)
    await interaction.editReply(reply)
  },
}
