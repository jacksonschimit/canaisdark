import type { CSSProperties, ReactNode } from "react";
import { Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Legenda } from "../componentes/Legenda";
import { Moldura } from "../componentes/Moldura";
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
  fontFamily: FONTE.mono,
  fontWeight: 700,
  fontSize: 30,
  letterSpacing: 4,
  color: COR.apagado,
};

/** Área útil de cada cena: entre o cabeçalho e a legenda. */
const Palco = ({
  dur,
  children,
}: {
  dur: number;
  children: ReactNode;
}) => {
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
  const valor = rampa(t, 0.25, m("reais"), 0, NUM.dividaTotalMi);
  const encolhe = rampa(t, m("E") - 0.1, m("E") + 0.4);
  const punido = rampa(t, m("punido") - 0.1, m("punido") + 0.3);
  const cinco = batida(t, fps, m("cinco"));

  return (
    <Palco dur={dur}>
      <div
        style={{
          position: "absolute",
          top: 60 - encolhe * 30,
          left: 0,
          transformOrigin: "left top",
          transform: `scale(${1 - encolhe * 0.36})`,
        }}
      >
        <div style={rotulo}>DÍVIDA TOTAL · BALANÇO DE 2019</div>
        <div
          style={{
            fontFamily: FONTE.titulo,
            color: COR.vermelho,
            fontSize: 330,
            lineHeight: 1.05,
            marginTop: 10,
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: 150, marginRight: 24 }}>R$</span>
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
            height: 4,
            background: COR.papel,
            width: `${punido * 100}%`,
            opacity: 0.35,
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
            fontFamily: FONTE.titulo,
            color: COR.amarelo,
            fontSize: 250,
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            transformOrigin: "left center",
            transform: `scale(${cinco})`,
          }}
        >
          <span style={{ fontSize: 120, marginRight: 20 }}>R$</span>5
          <span style={{ fontSize: 120, marginLeft: 24 }}>MILHÕES</span>
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
      alignItems: "baseline",
      borderTop: `2px dashed rgba(20,26,23,0.25)`,
      padding: "26px 0",
      opacity: visivel,
    }}
  >
    <span
      style={{
        fontFamily: FONTE.mono,
        fontWeight: 700,
        fontSize: 26,
        letterSpacing: 3,
        color: "rgba(20,26,23,0.55)",
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
  const cartao = rampa(t, m("Cruzeiro") - 0.2, m("Cruzeiro") + 0.3);
  const seta = rampa(t, m("emprestado"), m("volante") + 0.3);
  const carimbo = batida(t, fps, m("pagou") - 0.1);
  const linhaValor = rampa(t, m("dívida"), m("dívida") + 0.3);
  const euros = rampa(t, m("850"), m("euros") + 0.2, 0, NUM.dividaAlWahdaEur);
  const reais = rampa(t, m("pouco"), m("pouco") + 0.4);

  const clube: CSSProperties = {
    fontFamily: FONTE.titulo,
    fontSize: 78,
    lineHeight: 1,
  };
  const pais: CSSProperties = {
    fontFamily: FONTE.mono,
    fontWeight: 500,
    fontSize: 26,
    marginTop: 10,
    color: "rgba(20,26,23,0.6)",
  };

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
        <div
          style={{ fontFamily: FONTE.titulo, fontSize: 230, lineHeight: 1 }}
        >
          2016
        </div>
        <div style={{ ...rotulo, marginBottom: 34 }}>O EMPRÉSTIMO</div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 300,
          left: 0,
          right: 0,
          background: COR.papel,
          color: COR.tinta,
          padding: "44px 50px 30px",
          opacity: cartao,
          transform: `translateY(${(1 - cartao) * 50}px) rotate(-1deg)`,
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        <div
          style={{
            fontFamily: FONTE.mono,
            fontWeight: 700,
            fontSize: 26,
            letterSpacing: 4,
            color: "rgba(20,26,23,0.55)",
            marginBottom: 34,
          }}
        >
          EMPRÉSTIMO DE JOGADOR
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <div>
            <div style={clube}>AL WAHDA</div>
            <div style={pais}>Emirados Árabes</div>
          </div>
          <svg width="190" height="60" viewBox="0 0 190 60">
            <line
              x1="6"
              y1="30"
              x2={6 + seta * 160}
              y2="30"
              stroke={COR.tinta}
              strokeWidth="7"
            />
            <polygon
              points="160,8 186,30 160,52"
              fill={COR.tinta}
              opacity={seta > 0.95 ? 1 : 0}
            />
          </svg>
          <div style={{ textAlign: "right" }}>
            <div style={clube}>CRUZEIRO</div>
            <div style={pais}>Brasil</div>
          </div>
        </div>

        <Linha nome="O QUÊ">
          <span style={{ fontFamily: FONTE.texto, fontWeight: 800, fontSize: 40 }}>
            1 volante, por empréstimo
          </span>
        </Linha>
        <Linha nome="DÍVIDA" visivel={linhaValor}>
          <span
            style={{
              fontFamily: FONTE.titulo,
              fontSize: 96,
              color: "#C22A1B",
              lineHeight: 1,
            }}
          >
            € {milhar(euros)}
          </span>
        </Linha>
        <Linha nome="EM REAIS" visivel={reais}>
          <span style={{ fontFamily: FONTE.texto, fontWeight: 800, fontSize: 40 }}>
            pouco mais de R$ 5 milhões
          </span>
        </Linha>

        <div
          style={{
            position: "absolute",
            top: -70,
            right: -24,
            border: `12px solid ${COR.vermelho}`,
            color: COR.vermelho,
            fontFamily: FONTE.titulo,
            fontSize: 104,
            lineHeight: 1,
            padding: "14px 32px 6px",
            letterSpacing: 4,
            whiteSpace: "nowrap",
            background: COR.papel,
            opacity: Math.min(1, carimbo * 1.5),
            transform: `rotate(-11deg) scale(${2.2 - carimbo * 1.2})`,
          }}
        >
          NÃO PAGO
        </div>
      </div>
    </Palco>
  );
};

// ──────────────────────── Cena 3: a punição ─────────────────────────
const Etiqueta = ({ children, cor }: { children: ReactNode; cor: string }) => (
  <div
    style={{
      fontFamily: FONTE.titulo,
      fontSize: 84,
      lineHeight: 1,
      padding: "22px 34px 14px",
      border: `6px solid ${cor}`,
      color: cor,
    }}
  >
    {children}
  </div>
);

const Punicao = ({ dur }: { dur: number }) => {
  const { t, fps } = useT();
  const m = (texto: string, n = 1) => marca(texto, n) - CENAS.punicao;
  const seta = rampa(t, m("então"), m("FIFA") + 0.1);
  const fifa = batida(t, fps, m("FIFA"));
  const tabela = rampa(t, m("O", 2) - 0.1, m("O", 2) + 0.4);
  const inicioTabela = m("O", 2);
  const queda = rampa(t, m("seis") - 0.15, m("seis") + 0.5);
  const menos6 = batida(t, fps, m("seis") + 0.3);

  const ZERO_Y = 500;
  const PASSO = 62; // pixels por ponto
  const pontosAgora = Math.round(queda * NUM.pontos);

  return (
    <Palco dur={dur}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 30,
        }}
      >
        <Etiqueta cor={COR.papel}>AL WAHDA</Etiqueta>
        <svg width="250" height="60" viewBox="0 0 250 60">
          <line
            x1="10"
            y1="30"
            x2={10 + seta * 210}
            y2="30"
            stroke={COR.papel}
            strokeWidth="7"
          />
          <polygon
            points="216,8 244,30 216,52"
            fill={COR.papel}
            opacity={seta > 0.95 ? 1 : 0}
          />
        </svg>
        <div style={{ transform: `scale(${fifa})` }}>
          <Etiqueta cor={COR.amarelo}>FIFA</Etiqueta>
        </div>
      </div>

      <div style={{ opacity: tabela }}>
        <div style={{ ...rotulo, position: "absolute", top: 300, left: 0 }}>
          SÉRIE B 2020 · PONTOS NA LARGADA
        </div>

        {/* linha do zero, com os outros 19 clubes em cima dela */}
        <div
          style={{
            position: "absolute",
            top: ZERO_Y,
            left: 0,
            right: 0,
            height: 4,
            background: COR.papel,
            opacity: 0.5,
          }}
        />
        {Array.from({ length: 19 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: ZERO_Y - 13,
              left: 130 + i * 43,
              width: 30,
              height: 30,
              borderRadius: 15,
              background: COR.apagado,
              opacity: rampa(t, inicioTabela + i * 0.03, inicioTabela + 0.3 + i * 0.03),
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            top: ZERO_Y - 90,
            right: 0,
            fontFamily: FONTE.mono,
            fontWeight: 700,
            fontSize: 30,
            color: COR.apagado,
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
              left: 100,
              width: 50,
              borderTop: `3px solid ${COR.linha}`,
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 70,
                top: -19,
                fontFamily: FONTE.mono,
                fontWeight: 500,
                fontSize: 26,
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
            left: 54,
            width: 8,
            height: queda * -NUM.pontos * PASSO,
            background: COR.vermelho,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: ZERO_Y - 28 + queda * -NUM.pontos * PASSO,
            left: 28,
            width: 60,
            height: 60,
            borderRadius: 30,
            background: COR.vermelho,
            boxShadow: `0 0 50px ${COR.vermelho}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: ZERO_Y - 96,
            left: 0,
            fontFamily: FONTE.mono,
            fontWeight: 700,
            fontSize: 30,
            color: COR.vermelho,
          }}
        >
          CRUZEIRO · {pontosAgora}
        </div>

        <div
          style={{
            position: "absolute",
            top: ZERO_Y + 40,
            right: 20,
            textAlign: "right",
            transformOrigin: "right center",
            transform: `scale(${menos6})`,
          }}
        >
          <div
            style={{
              fontFamily: FONTE.titulo,
              fontSize: 420,
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
  const LADO = 600;
  // Áreas proporcionais: 5 / 803 da área => lado multiplicado pela raiz.
  const ladoMenor = LADO * Math.sqrt(NUM.dividaAlWahdaMi / NUM.dividaTotalMi);
  const grande = rampa(t, 0.05, 0.6);
  const pequeno = batida(t, fps, 0.8);
  const m = (texto: string, n = 1) => marca(texto, n) - CENAS.escala;
  const frase1 = rampa(t, m("Não"), m("Não") + 0.4);
  const frase2 = batida(t, fps, m("Era"));

  return (
    <Palco dur={dur + 1}>
      <div style={rotulo}>AS DUAS DÍVIDAS, EM ESCALA</div>

      <div
        style={{
          position: "absolute",
          top: 70,
          left: 0,
          width: LADO,
          height: LADO * grande,
          background: COR.vermelho,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 34,
            top: 24,
            opacity: rampa(t, 0.5, 0.8),
            color: COR.tinta,
          }}
        >
          <div style={{ fontFamily: FONTE.titulo, fontSize: 130, lineHeight: 1.1 }}>
            R$ 803 MI
          </div>
          <div style={{ fontFamily: FONTE.mono, fontWeight: 700, fontSize: 28 }}>
            dívida total do clube
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: 70 + LADO - ladoMenor,
          left: LADO + 60,
          width: ladoMenor,
          height: ladoMenor,
          background: COR.amarelo,
          transform: `scale(${pequeno})`,
          boxShadow: `0 0 40px ${COR.amarelo}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 70 + LADO - ladoMenor - 190,
          left: LADO + 60,
          width: 280,
          opacity: rampa(t, 1.0, 1.3),
          color: COR.amarelo,
        }}
      >
        <div style={{ fontFamily: FONTE.titulo, fontSize: 96, lineHeight: 1.1 }}>
          R$ 5 MI
        </div>
        <div style={{ fontFamily: FONTE.mono, fontWeight: 700, fontSize: 26 }}>
          a que custou
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
            color: COR.amarelo,
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
  const { fps } = useVideoConfig();
  const cenas = [
    { inicio: CENAS.gancho, fim: CENAS.emprestimo, Cena: Gancho },
    { inicio: CENAS.emprestimo, fim: CENAS.punicao, Cena: Emprestimo },
    { inicio: CENAS.punicao, fim: CENAS.escala, Cena: Punicao },
    { inicio: CENAS.escala, fim: DURACAO_S, Cena: Escala },
  ];

  return (
    <Moldura
      caso="CASO 001 · CRUZEIRO"
      fontes="Fontes: balanço de 2019 do clube · decisão da FIFA (2020)"
    >
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
    </Moldura>
  );
};
