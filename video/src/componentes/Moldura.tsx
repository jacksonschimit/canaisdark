import type { ReactNode } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COR, FONTE } from "../estilo/tema";

/** Fundo, barra de progresso e rodapé de fontes. Igual em todos os vídeos do canal. */
export const Moldura = ({
  fontes,
  children,
}: {
  fontes: string;
  children: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progresso = frame / durationInFrames;

  return (
    <AbsoluteFill style={{ backgroundColor: COR.fundo, color: COR.branco }}>
      {/* clarão na cor do clube, que se move devagar */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 90% 55% at ${35 + Math.sin(frame / 140) * 12}% 22%, ${COR.clubeEscuro} 0%, transparent 100%)`,
        }}
      />
      {/* faixas diagonais largas, como o corte da grama */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.028) 0 130px, transparent 130px 260px)",
          backgroundPosition: `${frame * 0.4}px 0px`,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 150,
          left: 70,
          width: 940,
          height: 6,
          borderRadius: 3,
          background: "rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            width: `${progresso * 100}%`,
            height: "100%",
            borderRadius: 3,
            background: COR.ouro,
          }}
        />
      </div>

      {children}

      <div
        style={{
          position: "absolute",
          top: 1312,
          left: 70,
          right: 70,
          textAlign: "center",
          fontFamily: FONTE.rotulo,
          fontWeight: 600,
          fontSize: 28,
          letterSpacing: 1.5,
          color: COR.apagado,
          opacity: 0.75,
        }}
      >
        {fontes}
      </div>
    </AbsoluteFill>
  );
};
