import type { CSSProperties, ReactNode } from "react";
import {
  Audio,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Legenda } from "../componentes/Legenda";
import { Moldura } from "../componentes/Moldura";
import { Escudo, Moeda } from "../componentes/Simbolos";
import { batida, COR, FONTE, milhar, rampa } from "../estilo/tema";
import {
  ATRASO_AUDIO_S,
  AUDIO,
  CENAS,
  DURACAO_S,
  marca,
  NUM,
  PALAVRAS,
} from "./menos6.dados";

const useT = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { t: frame / fps, fps };
};

const rotulo: CSSProperties = {
  fontFamily: FONTE.rotulo,
  fontWeight: 700,
  fontSize: 40,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: COR.apagado,
};

/** Área útil de cada cena: entre a barra de progresso e a legenda. */
const Palco = ({ dur, children }: { dur: number; children: ReactNode }) => {
  const { t } = useT();
  const entra = rampa(t, 0, 0.25);
  const sai = rampa(t, dur - 0.25, dur, 1, 0);
  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        top: 215,
        width: 940,
        height: 1080,
        opacity: Math.min(entra, sai),
        transform: `translateX(${(1 - entra) * 60 - (1 - sai) * 60}px)`,
      }}
    >
      {children}
    </div>
  );
};

// ───────────────────────── Cena 1: o gancho ─────────────────────────
const Gancho = ({ dur }: { dur: number }) => {
  const { t, fps } = useT();
  const m = (texto: string, n = 1) => marca(texto, n) - CENAS.gancho;
  const escudo = batida(t, fps, m("clube") - 0.1);
  const moeda = rampa(t, m("devia"), m("devia") + 0.5);
  const valor = rampa(t, m("devia"), m("reais"), 0, NUM.dividaTotalMi);
  const encolhe = rampa(t, m("E") - 0.1, m("E") + 0.4);
  const punido = rampa(t, m("punido") - 0.1, m("punido") + 0.3);
  const cinco = batida(t, fps, m("cinco"));

  return (
    <Palco dur={dur}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          transformOrigin: "left top",
          transform: `scale(${1 - encolhe * 0.38})`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <Escudo arquivo="cruzeiro.svg" tamanho={150} escala={escudo} />
          <div style={rotulo}>
            Dívida total
            <br />
            Balanço de 2019
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 26,
            marginTop: 30,
            fontFamily: FONTE.titulo,
            color: COR.vermelho,
            fontSize: 330,
            lineHeight: 1.05,
          }}
        >
          <Moeda tamanho={190} giro={moeda} />
          {milhar(valor)}
        </div>
        <div
          style={{
            fontFamily: FONTE.titulo,
            color: COR.vermelho,
            fontSize: 150,
            lineHeight: 1,
            letterSpacing: 6,
          }}
        >
          MILHÕES
        </div>
      </div>

      <div style={{ position: "absolute", top: 520, left: 0, right: 0 }}>
        <div
          style={{
            height: 5,
            background: COR.branco,
            width: `${punido * 100}%`,
            opacity: 0.3,
          }}
        />
        <div
          style={{
            fontFamily: FONTE.titulo,
            fontSize: 104,
            lineHeight: 1.1,
            marginTop: 40,
            opacity: punido,
            transform: `translateY(${(1 - punido) * 30}px)`,
          }}
        >
          PUNIDO POR NÃO PAGAR
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            marginTop: 10,
            fontFamily: FONTE.titulo,
            color: COR.ouro,
            fontSize: 250,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            transformOrigin: "left center",
            transform: `scale(${cinco})`,
          }}
        >
          <Moeda tamanho={150} />5
          <span style={{ fontSize: 120 }}>MILHÕES</span>
        </div>
      </div>
    </Palco>
  );
};

// ─────────────────────── Cena 2: o empréstimo ───────────────────────
const Linha = ({
  nome,
  children,
  visivel = 1,
}: {
  nome: string;
  children: ReactNode;
  visivel?: number;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: `3px solid rgba(10,16,36,0.12)`,
      padding: "22px 0",
      opacity: visivel,
    }}
  >
    <span
      style={{
        fontFamily: FONTE.rotulo,
        fontWeight: 700,
        fontSize: 34,
        letterSpacing: 3,
        color: "rgba(10,16,36,0.5)",
      }}
    >
      {nome}
    </span>
    <span>{children}</span>
  </div>
);

const Emprestimo = ({ dur }: { dur: number }) => {
  const { t, fps } = useT();
  const m = (texto: string, n = 1) => marca(texto, n) - CENAS.emprestimo;
  const ano = batida(t, fps, m("2016"));
  const cartao = rampa(t, m("Cruzeiro") - 0.3, m("Cruzeiro"));
  const cruzeiro = batida(t, fps, m("Cruzeiro"));
  const alWahda = batida(t, fps, m("Al Wahda"));
  const seta = rampa(t, m("emprestado"), m("volante") + 0.3);
  const carimbo = batida(t, fps, m("pagou") - 0.1);
  const linhaValor = rampa(t, m("dívida"), m("dívida") + 0.3);
  const euros = rampa(t, m("850"), m("euros") + 0.2, 0, NUM.dividaAlWahdaEur);
  const reais = rampa(t, m("pouco"), m("pouco") + 0.4);

  const clube: CSSProperties = {
    fontFamily: FONTE.titulo,
    fontSize: 60,
    lineHeight: 1,
    marginTop: 16,
  };
  const pais: CSSProperties = {
    fontFamily: FONTE.rotulo,
    fontWeight: 600,
    fontSize: 32,
    marginTop: 4,
    color: "rgba(10,16,36,0.55)",
  };
  const lado: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 300,
  };
  const vaga = (cheio: number): CSSProperties => ({
    width: 190,
    height: 190,
    borderRadius: 95,
    border: cheio > 0.05 ? "none" : "5px dashed rgba(10,16,36,0.2)",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: cheio > 0.05 ? "rgba(10,16,36,0.06)" : "transparent",
  });

  return (
    <Palco dur={dur}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 30,
          transformOrigin: "left bottom",
          transform: `scale(${ano})`,
        }}
      >
        <div style={{ fontFamily: FONTE.titulo, fontSize: 210, lineHeight: 1 }}>
          2016
        </div>
        <div style={{ ...rotulo, marginBottom: 30 }}>O empréstimo</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          right: 0,
          background: COR.branco,
          color: COR.tinta,
          borderRadius: 28,
          padding: "44px 50px 26px",
          opacity: cartao,
          transform: `translateY(${(1 - cartao) * 50}px)`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 34,
          }}
        >
          <div style={lado}>
            <div style={vaga(alWahda)}>
              <Escudo arquivo="alwahda.svg" tamanho={190} escala={alWahda} />
            </div>
            <div style={clube}>AL WAHDA</div>
            <div style={pais}>Emirados Árabes</div>
          </div>
          <svg width="200" height="190" viewBox="0 0 200 190">
            <line
              x1="6"
              y1="95"
              x2={6 + seta * 164}
              y2="95"
              stroke={COR.clube}
              strokeWidth="10"
              strokeLinecap="round"
            />
            <polygon
              points="166,68 196,95 166,122"
              fill={COR.clube}
              opacity={seta > 0.95 ? 1 : 0}
            />
          </svg>
          <div style={lado}>
            <div style={vaga(cruzeiro)}>
              <Escudo arquivo="cruzeiro.svg" tamanho={190} escala={cruzeiro} />
            </div>
            <div style={clube}>CRUZEIRO</div>
            <div style={pais}>Brasil</div>
          </div>
        </div>

        <Linha nome="EMPRÉSTIMO">
          <span style={{ fontFamily: FONTE.texto, fontWeight: 800, fontSize: 38 }}>
            1 volante
          </span>
        </Linha>
        <Linha nome="DÍVIDA" visivel={linhaValor}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              fontFamily: FONTE.titulo,
              fontSize: 96,
              color: "#D9202C",
              lineHeight: 1,
            }}
          >
            <Moeda tamanho={84} simbolo="€" />
            {milhar(euros)}
          </span>
        </Linha>
        <Linha nome="EM REAIS" visivel={reais}>
          <span style={{ fontFamily: FONTE.texto, fontWeight: 800, fontSize: 38 }}>
            pouco mais de R$ 5 milhões
          </span>
        </Linha>

        <div
          style={{
            position: "absolute",
            top: -86,
            left: 470,
            border: `12px solid ${COR.vermelho}`,
            borderRadius: 14,
            color: COR.vermelho,
            fontFamily: FONTE.titulo,
            fontSize: 92,
            lineHeight: 1,
            padding: "14px 30px 6px",
            letterSpacing: 4,
            whiteSpace: "nowrap",
            background: COR.branco,
            opacity: Math.min(1, carimbo * 1.5),
            transform: `rotate(-9deg) scale(${2.2 - carimbo * 1.2})`,
          }}
        >
          NÃO PAGO
        </div>
      </div>
    </Palco>
  );
};

// ──────────────────────── Cena 3: a punição ─────────────────────────
const Punicao = ({ dur }: { dur: number }) => {
  const { t, fps } = useT();
  const m = (texto: string, n = 1) => marca(texto, n) - CENAS.punicao;
  const alWahda = batida(t, fps, m("Al Wahda", 2));
  const seta = rampa(t, m("então"), m("FIFA") + 0.1);
  const fifa = batida(t, fps, m("FIFA"));
  const inicioTabela = m("O", 2);
  const tabela = rampa(t, inicioTabela - 0.1, inicioTabela + 0.4);
  const queda = rampa(t, m("seis") - 0.15, m("seis") + 0.5);
  const menos6 = batida(t, fps, m("seis") + 0.3);

  const ZERO_Y = 560;
  const PASSO = 62; // pixels por ponto
  const pontosAgora = Math.round(queda * NUM.pontos);

  return (
    <Palco dur={dur}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Escudo arquivo="alwahda.svg" tamanho={230} escala={alWahda} />
        <svg width="260" height="70" viewBox="0 0 260 70">
          <line
            x1="10"
            y1="35"
            x2={10 + seta * 210}
            y2="35"
            stroke={COR.branco}
            strokeWidth="10"
            strokeLinecap="round"
          />
          <polygon
            points="216,8 250,35 216,62"
            fill={COR.branco}
            opacity={seta > 0.95 ? 1 : 0}
          />
        </svg>
        <Escudo arquivo="fifa.svg" tamanho={190} escala={fifa} largo />
      </div>

      <div style={{ opacity: tabela }}>
        <div style={{ ...rotulo, position: "absolute", top: 330, left: 0 }}>
          Série B 2020 · pontos na largada
        </div>

        {/* linha do zero, com os outros 19 clubes em cima dela */}
        <div
          style={{
            position: "absolute",
            top: ZERO_Y,
            left: 0,
            right: 0,
            height: 5,
            background: COR.branco,
            opacity: 0.5,
          }}
        />
        {Array.from({ length: 19 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: ZERO_Y - 13,
              left: 150 + i * 42,
              width: 30,
              height: 30,
              borderRadius: 15,
              background: COR.apagado,
              opacity: rampa(
                t,
                inicioTabela + i * 0.03,
                inicioTabela + 0.3 + i * 0.03,
              ),
            }}
          />
        ))}
        <div
          style={{
            ...rotulo,
            position: "absolute",
            top: ZERO_Y - 80,
            right: 0,
            fontSize: 36,
          }}
        >
          19 clubes · todos com 0
        </div>

        {/* régua de pontos negativos */}
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            style={{
              position: "absolute",
              top: ZERO_Y + n * PASSO,
              left: 120,
              width: 50,
              borderTop: "3px solid rgba(255,255,255,0.18)",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 66,
                top: -24,
                fontFamily: FONTE.rotulo,
                fontWeight: 600,
                fontSize: 34,
                color: COR.apagado,
              }}
            >
              -{n}
            </span>
          </div>
        ))}

        {/* o Cruzeiro: começa no zero e despenca */}
        <div
          style={{
            position: "absolute",
            top: ZERO_Y + 2,
            left: 46,
            width: 10,
            height: queda * -NUM.pontos * PASSO,
            background: COR.vermelho,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: ZERO_Y - 50 + queda * -NUM.pontos * PASSO,
            left: 0,
            borderRadius: 51,
            boxShadow: `0 0 0 6px ${COR.vermelho}, 0 0 50px ${COR.vermelho}`,
          }}
        >
          <Escudo arquivo="cruzeiro.svg" tamanho={102} />
        </div>
        <div
          style={{
            ...rotulo,
            position: "absolute",
            top: ZERO_Y - 140,
            left: 0,
            fontSize: 36,
            color: COR.vermelho,
          }}
        >
          Cruzeiro · {pontosAgora}
        </div>

        <div
          style={{
            position: "absolute",
            top: ZERO_Y + 24,
            right: 20,
            textAlign: "right",
            transformOrigin: "right center",
            transform: `scale(${menos6})`,
          }}
        >
          <div
            style={{
              fontFamily: FONTE.titulo,
              fontSize: 330,
              lineHeight: 1,
              color: COR.vermelho,
            }}
          >
            -6
          </div>
          <div
            style={{
              fontFamily: FONTE.titulo,
              fontSize: 84,
              lineHeight: 1,
              letterSpacing: 4,
            }}
          >
            PONTOS
          </div>
        </div>
      </div>
    </Palco>
  );
};

// ──────────────────────── Cena 4: em escala ─────────────────────────
const Escala = ({ dur }: { dur: number }) => {
  const { t, fps } = useT();
  const m = (texto: string, n = 1) => marca(texto, n) - CENAS.escala;
  const LADO = 600;
  // Áreas proporcionais: 5 / 803 da área => lado multiplicado pela raiz.
  const ladoMenor = LADO * Math.sqrt(NUM.dividaAlWahdaMi / NUM.dividaTotalMi);
  const grande = rampa(t, 0.05, 0.6);
  const pequeno = batida(t, fps, 0.8);
  const frase1 = rampa(t, m("Não"), m("Não") + 0.4);
  const frase2 = batida(t, fps, m("Era"));

  return (
    <Palco dur={dur + 1}>
      <div style={rotulo}>As duas dívidas, em escala</div>

      <div
        style={{
          position: "absolute",
          top: 76,
          left: 0,
          width: LADO,
          height: LADO * grande,
          borderRadius: 20,
          background: COR.vermelho,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 24,
            opacity: rampa(t, 0.5, 0.8),
            color: COR.branco,
          }}
        >
          <div style={{ fontFamily: FONTE.titulo, fontSize: 130, lineHeight: 1.1 }}>
            R$ 803 MI
          </div>
          <div style={{ ...rotulo, color: COR.branco, fontSize: 38 }}>
            Dívida total do clube
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 76 + LADO - ladoMenor,
          left: LADO + 60,
          width: ladoMenor,
          height: ladoMenor,
          borderRadius: 6,
          background: COR.ouro,
          transform: `scale(${pequeno})`,
          boxShadow: `0 0 40px ${COR.ouro}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 76 + LADO - ladoMenor - 210,
          left: LADO + 60,
          width: 280,
          opacity: rampa(t, 1.0, 1.3),
          color: COR.ouro,
        }}
      >
        <div style={{ fontFamily: FONTE.titulo, fontSize: 96, lineHeight: 1.1 }}>
          R$ 5 MI
        </div>
        <div style={{ ...rotulo, color: COR.ouro, fontSize: 36, lineHeight: 1.1 }}>
          A que custou
          <br />6 pontos
        </div>
      </div>

      <div style={{ position: "absolute", top: 740, left: 0, right: 0 }}>
        <div
          style={{
            fontFamily: FONTE.titulo,
            fontSize: 82,
            lineHeight: 1.1,
            opacity: frase1,
          }}
        >
          NÃO ERA FALTA DE VONTADE.
        </div>
        <div
          style={{
            fontFamily: FONTE.titulo,
            fontSize: 122,
            lineHeight: 1.15,
            color: COR.ouro,
            whiteSpace: "nowrap",
            transformOrigin: "left center",
            transform: `scale(${frase2})`,
          }}
        >
          ERA FALTA DE CAIXA.
        </div>
      </div>
    </Palco>
  );
};

// ───────────────────────────── O corte ──────────────────────────────
export const CorteMenos6 = () => {
  const { fps, durationInFrames } = useVideoConfig();
  const cenas = [
    { inicio: CENAS.gancho, fim: CENAS.emprestimo, Cena: Gancho },
    { inicio: CENAS.emprestimo, fim: CENAS.punicao, Cena: Emprestimo },
    { inicio: CENAS.punicao, fim: CENAS.escala, Cena: Punicao },
    { inicio: CENAS.escala, fim: DURACAO_S, Cena: Escala },
  ];
  // Batidas graves nos momentos de maior peso: [segundo, volume]
  const impactos: [number, number][] = [
    [marca("cinco"), 0.6],
    [marca("pagou") - 0.1, 1],
    [marca("seis") + 0.3, 1],
    [marca("Era"), 0.7],
  ];

  return (
    <Moldura fontes="Fontes: balanço de 2019 do clube · decisão da FIFA (2020)">
      {cenas.map(({ inicio, fim, Cena }) => (
        <Sequence
          key={inicio}
          from={Math.round(inicio * fps)}
          durationInFrames={Math.round((fim - inicio) * fps)}
        >
          <Cena dur={fim - inicio} />
        </Sequence>
      ))}
      <Legenda palavras={PALAVRAS} />

      <Sequence from={Math.round(ATRASO_AUDIO_S * fps)}>
        <Audio src={staticFile(AUDIO)} />
      </Sequence>
      {/* trilha de fundo, bem baixa, sumindo no fim */}
      <Audio
        src={staticFile("som/trilha-suspense.wav")}
        volume={(f) =>
          interpolate(f, [durationInFrames - 1.5 * fps, durationInFrames], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        }
      />
      {impactos.map(([s, volume]) => (
        <Sequence key={s} from={Math.round(s * fps)}>
          <Audio src={staticFile("som/impacto.wav")} volume={volume} />
        </Sequence>
      ))}
    </Moldura>
  );
};
