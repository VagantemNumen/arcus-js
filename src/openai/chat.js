import { Configuration, OpenAIApi } from 'openai'
import * as dotenv from 'dotenv'
dotenv.config()

const config = new Configuration({
  apiKey: process.env['OPENAI_API_KEY'],
})

const openai = new OpenAIApi(config)

export const getChat = async (prompt) => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  })

  return completion.data.choices[0].message.content
}
