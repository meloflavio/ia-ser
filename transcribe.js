import { pipeline } from "@xenova/transformers"

export async function transcribe(audio) {
  try {
    console.log("Realizando a trancrição...")
    const transcribe = await pipeline("automatic-speech-recognition",
    "Xenova/whisper-small")

    const trancription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe"
    })

    console.log("trancrição finalizada com sucesso!");
    return trancription?.text.replace("[Música]", "")
  } catch (error) {
    throw new Error(error)
  }
}
