import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'
dotenv.config()

const config = new Configuration({
  apiKey: process.env['OPENAI_API_KEY'],
})

const openai = new OpenAIApi(config)

export const getImage = async (prompt) => {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '512x512',
    response_format: 'url',
  })
  return response.data.data[0].url
}
