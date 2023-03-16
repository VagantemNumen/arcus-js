import crypto from 'node:crypto'
import { existsSync } from 'node:fs'
import { SlashCommandBuilder } from 'discord.js'
import {
  joinVoiceChannel,
  createAudioPlayer,
  NoSubscriberBehavior,
  createAudioResource,
  VoiceConnectionStatus,
  AudioPlayerStatus,
  entersState,
} from '@discordjs/voice'
import { getAIVoice } from '../voiceai/elevenlabs.js'

import { voices } from '../voiceai/voices.js'

export const voiceAICommand = {
  data: new SlashCommandBuilder()
    .setName('voiceai')
    .setDescription('Makes an AI recite the provided text')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('Text for the AI to recite')
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName('voice')
        .setDescription('Voice variation')
        .addChoices(
          { name: 'American', value: 'FaM07U45XKS2siN3Ip8t-0' },
          { name: 'British', value: 'ehKCItPSM3amDIcp303W' },
          { name: 'Australian', value: 'KG1L1mLVuWqToxsbdwce' },
        ),
    ),
  execute: async (interaction) => {
    const prompt = interaction.options.getString('prompt')
    const voice_id =
      interaction.options.getString('voice') ?? 'FaM07U45XKS2siN3Ip8t'
    await interaction.reply(
      `Bot will join you shortly and say typed prompt in voice selected. \n\`\`\`\nPrompt: ${prompt} \nIn Voice: ${
        voices[voices.findIndex((voice) => voice.id == voice_id)].labels.accent
      }\n\`\`\``,
    )

    await handleVoice(prompt, voice_id, interaction)
  },
}

const getName = (prompt, voice_id) =>
  `${crypto.createHash('md5').update(prompt).digest('hex')}-${voice_id}.mp3`

const handleVoice = async (prompt, voice_id, interaction) => {
  const name = getName(prompt, voice_id)

  if (!existsSync(name)) {
    const ok = await getAIVoice(prompt, voice_id, name)
    if (!ok) return
  }

  await playVoice(name, interaction)
}

const playVoice = async (name, interaction) => {
  const connection = await createConnection(interaction)
  const player = createPlayer()
  const resource = createAudioResource(name)

  player.play(resource)

  try {
    await entersState(player, AudioPlayerStatus.Playing, 5e3)

    connection.subscribe(player)

    player.on('error', (error) => {
      console.error(error)
    })
  } catch (error) {
    player.stop()
    connection.destroy()
    return
  }
}

const createConnection = async (interaction) => {
  const voiceChannelId = interaction.guild.members.cache.get(
    interaction.member.user.id,
  ).voice.channelId
  const voiceChannel = await interaction.client.channels.cache.get(
    voiceChannelId,
  )
  const connection = joinVoiceChannel({
    channelId: voiceChannelId,
    guildId: voiceChannel.guild.id,
    adapterCreator: voiceChannel.guild.voiceAdapterCreator,
  })

  try {
    await entersState(connection, VoiceConnectionStatus.Ready, 30e3)
    return connection
  } catch (error) {
    connection.destroy()
    throw error
  }
}

const createPlayer = () => {
  return createAudioPlayer({
    behaviors: {
      noSubscriber: NoSubscriberBehavior.Pause,
    },
  })
}
