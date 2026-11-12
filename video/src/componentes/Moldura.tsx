import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COR, FONTE } from "../estilo/tema";

/** Fundo, cabeçalho do "dossiê" e rodapé de fontes. Igual em todos os vídeos do canal. */
export const Moldura = ({
  caso,
  fontes,
  children,
}: {
  caso: string;
  fontes: string;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const desloc = (frame * 0.35) % 90;
  const progresso = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: COR.fundo, color: COR.papel }}>
      {/* papel quadriculado de livro-caixa, em movimento lento */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${COR.linha} 2px, transparent 2px), linear-gradient(90deg, ${COR.linha} 2px, transparent 2px)`,
          backgroundSize: "90px 90px",
          backgroundPosition: `0px ${-desloc}px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 120,
          left: 70,
          right: 70,
          display: "flex",
          justifyContent: "space-between",
          fontFamily: FONTE.mono,
          fontWeight: 700,
          fontSize: 26,
          letterSpacing: 3,
          color: COR.apagado,
        }}
      >
        <span>{caso}</span>
        <span style={{ color: COR.vermelho }}>● DOSSIÊ</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 170,
          left: 70,
          width: 940,
          height: 3,
          background: COR.linha,
        }}
      >
        <div
          style={{
            width: `${progresso * 100}%`,
            height: "100%",
            background: COR.apagado,
          }}
        />
      </div>

      {children}

      <div
        style={{
          position: "absolute",
          top: 1318,
          left: 70,
          right: 70,
          textAlign: "center",
          fontFamily: FONTE.mono,
          fontWeight: 500,
          fontSize: 22,
          letterSpacing: 1,
          color: COR.apagado,
          opacity: 0.8,
        }}
      >
        {fontes}
      </div>
    </AbsoluteFill>
  );
};
