import fs from 'fs/promises';
import multer from 'multer';
import { removeSilence } from './silence.js';


// Configuração do Multer para salvar o arquivo temporariamente
export const upload = multer({ dest: './tmp/' });

// Função para processar o arquivo
export async function processFile(req, res) {
    const tempPath = req.file.path;
    const targetPath = './tmp/audio.mp4';
    const outputPath = targetPath.replace(".mp4", ".wav")

    // Renomeia o arquivo para 'audio.wav'
    fs.rename(tempPath, targetPath, err => {
        if (err) return res.status(500).send(err);
    });
    await removeSilence();
    return outputPath;
}

