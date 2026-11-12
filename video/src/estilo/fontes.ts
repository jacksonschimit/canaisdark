import "@fontsource/anton/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/700.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/800.css";
import { continueRender, delayRender } from "remotion";

// Segura a renderização até as fontes estarem carregadas, para nenhum quadro sair com fonte errada.
const espera = delayRender("carregando fontes");
const amostra = "AÁÃÇÉÍÓÚaáãçéíóú0123456789R$€·";
Promise.all(
  [
    '400 40px "Anton"',
    '500 40px "IBM Plex Mono"',
    '700 40px "IBM Plex Mono"',
    '600 40px "Inter"',
    '800 40px "Inter"',
  ].map((f) => document.fonts.load(f, amostra)),
)
  .then(() => continueRender(espera))
  .catch(() => continueRender(espera));
