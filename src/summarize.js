import { pipeline } from '@xenova/transformers';

export async function summarize(text) {
  try {
    console.log("Realizando o resumo...");

    const generator = await pipeline("summarization", "Xenova/distilbart-cnn-12-6")

    const output = await generator(text)

    console.log("Resumo cocluído com sucesso!");
    return output[0].summary_text
  } catch (error) {
    console.log(`Não foi possível realizar o resumo ${error}`);
    throw new Error(String(error));
  }
}
