import { Easing, interpolate, spring } from "remotion";

// Identidade visual do canal. Trocar aqui muda todos os vídeos.
// `clube` é a cor do clube do episódio (aqui, o azul do Cruzeiro): muda a cada vídeo.
export const COR = {
  fundo: "#050816",
  clube: "#2F5FE0",
  clubeEscuro: "#0E1F5C",
  branco: "#FFFFFF",
  tinta: "#0A1024",
  apagado: "#9AA8CF",
  vermelho: "#FF3B47",
  ouro: "#FFC42E",
};

export const FONTE = {
  titulo: '"Anton", sans-serif',
  rotulo: '"Barlow Condensed", sans-serif',
  texto: '"Montserrat", sans-serif',
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
