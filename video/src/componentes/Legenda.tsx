import { useCurrentFrame, useVideoConfig } from "remotion";
import { COR, FONTE, rampa } from "../estilo/tema";

type Palavra = { texto: string; inicio: number; fim: number };
type Bloco = { palavras: Palavra[]; inicio: number; fim: number };

const MAX_CARACTERES = 28;
const tamanho = (ps: Palavra[]) => ps.reduce((s, p) => s + p.texto.length + 1, 0);

/** Agrupa as palavras em blocos curtos: quebra em fim de frase e reparte frases longas por igual. */
const montarBlocos = (palavras: Palavra[]): Bloco[] => {
  const frases: Palavra[][] = [[]];
  for (const p of palavras) {
    frases[frases.length - 1].push(p);
    if (/[.!?]$/.test(p.texto)) frases.push([]);
  }

  const grupos: Palavra[][] = [];
  for (const frase of frases.filter((f) => f.length > 0)) {
    const alvo = tamanho(frase) / Math.ceil(tamanho(frase) / MAX_CARACTERES) + 4;
    let atual: Palavra[] = [];
    for (const p of frase) {
      if (atual.length > 0 && tamanho(atual) + p.texto.length > alvo) {
        grupos.push(atual);
        atual = [];
      }
      atual.push(p);
    }
    grupos.push(atual);
  }

  // Cada bloco fica na tela até o próximo começar; em pausa longa, some um pouco depois da fala.
  return grupos.map((g, i) => {
    const fimDaFala = g[g.length - 1].fim;
    const proximo = grupos[i + 1]?.[0].inicio ?? Infinity;
    return {
      palavras: g,
      inicio: g[0].inicio,
      fim: proximo - fimDaFala < 0.7 ? proximo : fimDaFala + 0.45,
    };
  });
};

export const Legenda = ({ palavras }: { palavras: Palavra[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const bloco = montarBlocos(palavras).find((b) => t >= b.inicio && t < b.fim);
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
          fontSize: 58,
          lineHeight: 1.22,
          textAlign: "center",
          letterSpacing: -0.5,
          textShadow: "0 4px 24px rgba(0,0,0,0.9)",
        }}
      >
        {bloco.palavras.map((p, i) => {
          const proxima = bloco.palavras[i + 1]?.inicio ?? Infinity;
          const falada = t >= p.inicio;
          const atual = falada && t < proxima;
          return (
            <span
              key={i}
              style={{
                color: atual ? COR.ouro : COR.branco,
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
