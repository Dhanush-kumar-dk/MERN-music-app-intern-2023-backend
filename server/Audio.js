// npm install assemblyai

import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
  apiKey: "03264e0c99ee4d2d9d54b67e7bfe536d"
})

const audioUrl =
  'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3'

const config = {
  audio_url: audioUrl
}

const run = async () => {
  const transcript = await client.transcripts.create(config)
  console.log(transcript.text)
}

run()