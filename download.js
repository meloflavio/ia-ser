import ytdl from 'ytdl-core'
import fs from 'fs'
import { error } from 'console';

export const download = (videoId) => new Promise((resolve, reject) => {
  const COOKIE ='x-youtube-identity-token=QUFFLUhqbW9ZZXNrMy1BUDFaNmgxZUQtNGM1V3IzLWVTUXw'
  let videoURL = "https://www.youtube.com/"
  // se contains shorts
  if(videoId.includes("shorts")) {
    videoURL += "shorts/" + videoId
  } else {
    videoURL += "watch?v=" + videoId
  }
  console.log(videoURL);
  console.log("Realizando o download...");

  ytdl(videoURL, {
    quality: "lowestaudio",
    filter: "audioonly",
    requestOptions: {
      headers: {
        cookie: COOKIE,
      },
    },
  }
  ).on("info", (info) => {
    const seconds = info.formats[0].approxDurationMs / 1000

    if(seconds > 3600) {
      throw new Error("A duração desse vídeo é maior que 60 segundos")
    }

  }).on("end", () => {
    console.log("Download do vídeo finalizado.")
    resolve()
  }).on("error", (error) => {
    console.log("Não foi possível fazer o download do vídeo. Detalhes do erro:", error);
    reject(error)
  }).pipe(fs.createWriteStream("./tmp/audio.mp4"))
})
