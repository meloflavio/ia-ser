import fs from 'fs/promises';
import multer from 'multer';
import removeSilence from './silence.js';


// Configuração do Multer para salvar o arquivo temporariamente
export const upload = multer({ dest: './../tmp' });

// Função para processar o arquivo
export async function processFile(tempPath) {
    
    await removeSilence(tempPath);
    return tempPath;
}
