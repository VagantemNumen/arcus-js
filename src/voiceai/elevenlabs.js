import elevenLabsAPI from 'elevenlabs-api'
import * as dotenv from 'dotenv'
dotenv.config()

const apiKey = process.env['ELEVEN_LABS_API_KEY']

export const getAIVoice = async (prompt, voice_id, name) => {
  try {
    await elevenLabsAPI(apiKey, prompt, voice_id, name)
    return true
  } catch (error) {
    console.error(`An error occurred while converting text to speech: ${error}`)
    return false
  }
}
