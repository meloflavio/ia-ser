import fs from 'fs'
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"


export const removeSilence = async () => new Promise((resolve, reject) => {
  console.log("Removendo o silêncio do áudio...")
  const filePath = './tmp/audio.mp4';
  const outputPath = filePath.replace(".mp4", ".wav")

  ffmpeg.setFfmpegPath(ffmpegStatic)
  ffmpeg(filePath)
    .audioFilters('silenceremove=stop_periods=-1:stop_duration=0.1:stop_threshold=-40dB')
    .format('wav')
    .on('end', () => {
      console.log("Silêncio removido com sucesso!")
      resolve(outputPath) // Resolva com o caminho do arquivo de saída
    })
    .on('error', (error) => {
      console.log(`Erro ao remover o silêncio do áudio: ${error}`)
      reject(error)
    })
    .save(outputPath)
})
