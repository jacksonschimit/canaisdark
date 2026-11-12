// Corte 1 do roteiro 001 (Cruzeiro): "-6 por causa de 5 milhões".
// Os tempos vêm da gravação real: menos6.palavras.json é gerado por
// ferramentas/transcrever.py (+ aplicar_cortes.py) e tem o texto revisado à mão.
import palavrasDaGravacao from "./menos6.palavras.json";

export type Palavra = { texto: string; inicio: number; fim: number };

export const AUDIO = "001-corte-menos6.wav"; // em video/public/
export const ATRASO_AUDIO_S = 0.25; // respiro antes da primeira palavra
const RESPIRO_FINAL_S = 1.1;

/** Palavras já no tempo do vídeo (tempo da gravação + atraso). */
export const PALAVRAS: Palavra[] = (palavrasDaGravacao as Palavra[]).map((p) => ({
  texto: p.texto,
  inicio: p.inicio + ATRASO_AUDIO_S,
  fim: p.fim + ATRASO_AUDIO_S,
}));

export const DURACAO_S =
  Math.ceil((PALAVRAS[PALAVRAS.length - 1].fim + RESPIRO_FINAL_S) * 10) / 10;

const limpa = (s: string) => s.replace(/[.,:;!?]/g, "");

/** Segundo em que uma palavra é dita. `ocorrencia` escolhe entre repetições (1 = primeira). */
export const marca = (texto: string, ocorrencia = 1): number => {
  const achadas = PALAVRAS.filter((p) => limpa(p.texto) === texto);
  const p = achadas[ocorrencia - 1];
  if (!p) throw new Error(`Palavra não encontrada na gravação: "${texto}" (${ocorrencia})`);
  return p.inicio;
};

// Início de cada cena, um instante antes da frase que a abre.
export const CENAS = {
  gancho: 0,
  emprestimo: marca("Em") - 0.15,
  punicao: marca("O", 1) - 0.15,
  escala: marca("Não") - 0.2,
};

// Números usados na tela, com a fonte no roteiro (roteiros/001-cruzeiro/roteiro.md).
export const NUM = {
  dividaTotalMi: 803, // [F3] balanço de 2019
  dividaAlWahdaEur: 850_000, // [F4]
  dividaAlWahdaMi: 5, // [F4] "pouco mais de R$ 5 milhões" na época
  pontos: -6, // [F4]
};
