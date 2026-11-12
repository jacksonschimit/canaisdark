import { useCurrentFrame, useVideoConfig } from "remotion";
import { COR, FONTE, rampa } from "../estilo/tema";

type Fala = { inicio: number; fim: number; texto: string };
type Palavra = { texto: string; inicio: number; fim: number };
type Bloco = { palavras: Palavra[]; inicio: number; fim: number };

const MAX_CARACTERES = 30;

/** Divide as falas em blocos curtos, com um tempo estimado por palavra. */
const montarBlocos = (falas: Fala[]): Bloco[] => {
  const blocos: Bloco[] = [];
  for (const fala of falas) {
    const textos = fala.texto.split(" ");
    const total = textos.reduce((s, p) => s + p.length + 1, 0);
    let cursor = fala.inicio;
    const palavras = textos.map((texto) => {
      const dur = ((texto.length + 1) / total) * (fala.fim - fala.inicio);
      const p = { texto, inicio: cursor, fim: cursor + dur };
      cursor += dur;
      return p;
    });

    // Reparte a fala em blocos de tamanho parecido, para não sobrar palavra sozinha.
    const nBlocos = Math.ceil(total / MAX_CARACTERES);
    const alvo = total / nBlocos + 4;
    let atual: Palavra[] = [];
    let tamanho = 0;
    const fechar = () => {
      if (atual.length === 0) return;
      blocos.push({
        palavras: atual,
        inicio: atual[0].inicio,
        fim: atual[atual.length - 1].fim,
      });
      atual = [];
      tamanho = 0;
    };
    for (const p of palavras) {
      if (tamanho + p.texto.length > alvo) fechar();
      atual.push(p);
      tamanho += p.texto.length + 1;
    }
    fechar();
    // O último bloco da fala fica um instante a mais na tela.
    blocos[blocos.length - 1].fim += 0.3;
  }
  return blocos;
};

export const Legenda = ({ falas }: { falas: Fala[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const bloco = montarBlocos(falas).find((b) => t >= b.inicio && t < b.fim);
  if (!bloco) return null;

  const entrada = rampa(t, bloco.inicio, bloco.inicio + 0.12);

  return (
    <div
      style={{
        position: "absolute",
        left: 90,
        right: 90,
        top: 1390,
        height: 170,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: entrada,
        transform: `translateY(${(1 - entrada) * 14}px)`,
      }}
    >
      <div
        style={{
          fontFamily: FONTE.texto,
          fontWeight: 800,
          fontSize: 60,
          lineHeight: 1.22,
          textAlign: "center",
          letterSpacing: -0.5,
          textShadow: "0 4px 24px rgba(0,0,0,0.9)",
        }}
      >
        {bloco.palavras.map((p, i) => {
          const falada = t >= p.inicio;
          const atual = t >= p.inicio && t < p.fim;
          return (
            <span
              key={i}
              style={{
                color: atual ? COR.amarelo : COR.papel,
                opacity: falada ? 1 : 0.38,
              }}
            >
              {p.texto}{" "}
            </span>
          );
        })}
      </div>
    </div>
  );
};
