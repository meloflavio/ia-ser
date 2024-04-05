
import { download } from './src/download.js'
import { transcribe } from './src/transcribe.js'
import { summarize } from './src/summarize.js'
import { convert } from './src/convert.js'
import { upload, processFile } from './src/upload.js'; 
import express from 'express'; 
import cors from 'cors'; 
import fs from 'fs'; 
import dotenv from 'dotenv'; 


var port = process.env.PORT || 8080;

dotenv.config();
const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/summary/:id', async (req, res) => {
  try {
    await download(req.params.id)
    const audioConverted = await convert();
    const result = await transcribe(audioConverted)

    return res.json({ result })
  } catch (error) {
    console.log(error);
    return res.json({ error })
  }
})

app.post('/summary', async (req, res) => {
  try {
    const result = await summarize(req.body.text)
    return res.json({ result })
  } catch (error) {
    console.log(error);
    return res.json({ error })
  }
})

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const processedFilePath = req.file && req.file.path ? await processFile(req.file.path) : '';
    if(!processedFilePath){
      return res.status(500).json({ error: "Erro ao processar o arquivo" });
    }
    // Configura os cabeçalhos da resposta para indicar um download de arquivo
    res.setHeader('Content-Disposition', 'attachment; filename=processedAudio.wav');
    res.setHeader('Content-Type', 'audio/wav');
    
    const readStream = fs.createReadStream(processedFilePath);
    readStream.pipe(res);
    
    readStream.on('error', (error) => {
      console.error(error);
      res.status(500).json({ error: "Erro ao ler o arquivo processado" });
    });
    
    // readStream.on('end', () => {
    //   fs.unlink(processedFilePath, (err) => {
    //     if (err) console.error("Erro ao deletar o arquivo processado:", err);
    //   });
    // });
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
});


app.listen(port, () => console.log('Server is running on port '+port))
