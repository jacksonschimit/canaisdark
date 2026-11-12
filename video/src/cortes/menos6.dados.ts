// Corte 1 do roteiro 001 (Cruzeiro): "-6 por causa de 5 milhões".
// Os tempos abaixo são ESTIMADOS (ritmo de fala de ~2,6 palavras por segundo).
// Quando houver gravação real, estes tempos passam a vir da transcrição (Whisper).

export const DURACAO_S = 30;

export type Fala = { inicio: number; fim: number; texto: string };

export const FALAS: Fala[] = [
  { inicio: 0.3, fim: 3.0, texto: "Esse clube devia 800 milhões de reais." },
  { inicio: 3.3, fim: 5.8, texto: "E foi punido por não pagar cinco." },
  {
    inicio: 6.4,
    fim: 11.0,
    texto:
      "Em 2016, o Cruzeiro pegou emprestado um volante do Al Wahda, dos Emirados Árabes.",
  },
  { inicio: 11.3, fim: 12.5, texto: "E não pagou." },
  {
    inicio: 12.9,
    fim: 17.6,
    texto: "A dívida: 850 mil euros, pouco mais de 5 milhões de reais.",
  },
  { inicio: 18.0, fim: 19.8, texto: "O Al Wahda foi à FIFA." },
  {
    inicio: 20.0,
    fim: 24.6,
    texto:
      "E a FIFA puniu: o Cruzeiro começou a Série B de 2020 com seis pontos negativos.",
  },
  { inicio: 25.2, fim: 27.0, texto: "Não era falta de vontade." },
  { inicio: 27.3, fim: 29.0, texto: "Era falta de caixa." },
];

// Início de cada cena, em segundos.
export const CENAS = { gancho: 0, emprestimo: 6.2, punicao: 18, escala: 25.1 };

// Números usados na tela, com a fonte no roteiro (roteiros/001-cruzeiro/roteiro.md).
export const NUM = {
  dividaTotalMi: 803, // [F3] balanço de 2019
  dividaAlWahdaEur: 850_000, // [F4]
  dividaAlWahdaMi: 5, // [F4] "pouco mais de R$ 5 milhões" na época
  pontos: -6, // [F4]
};
