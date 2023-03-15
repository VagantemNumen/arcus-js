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
    let reply = await getChat(prompt)
    reply = `**Arcus: ** ${reply.trim()}`
    await interaction.editReply(
      `**${interaction.user.username}:** ${prompt}\n${reply}`,
    )
  },
}
