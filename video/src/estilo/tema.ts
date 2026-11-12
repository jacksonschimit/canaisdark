import { Easing, interpolate, spring } from "remotion";

// Identidade visual provisória ("dossiê financeiro"). Trocar aqui muda o canal inteiro.
export const COR = {
  fundo: "#0C1310",
  papel: "#F3ECDD",
  tinta: "#141A17",
  apagado: "#8C978F",
  vermelho: "#FF4F3D",
  amarelo: "#FFD84A",
  linha: "rgba(243,236,221,0.07)",
};

export const FONTE = {
  titulo: '"Anton", sans-serif',
  mono: '"IBM Plex Mono", monospace',
  texto: '"Inter", sans-serif',
};

/** Vai de `de` a `para` entre os segundos a e b, com desaceleração. */
export const rampa = (t: number, a: number, b: number, de = 0, para = 1) =>
  interpolate(t, [a, b], [de, para], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

/** Entrada com "batida" (mola) a partir do segundo `em`. */
export const batida = (t: number, fps: number, em: number) =>
  spring({
    frame: (t - em) * fps,
    fps,
    config: { damping: 11, stiffness: 190, mass: 0.6 },
  });

export const milhar = (n: number) => Math.round(n).toLocaleString("pt-BR");
