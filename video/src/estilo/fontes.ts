import "@fontsource/anton/400.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import { continueRender, delayRender } from "remotion";

// Segura a renderização até as fontes estarem carregadas, para nenhum quadro sair com fonte errada.
const espera = delayRender("carregando fontes");
const amostra = "AÁÃÇÉÍÓÚaáãçéíóú0123456789R$€·";
Promise.all(
  [
    '400 40px "Anton"',
    '600 40px "Barlow Condensed"',
    '700 40px "Barlow Condensed"',
    '700 40px "Montserrat"',
    '800 40px "Montserrat"',
  ].map((f) => document.fonts.load(f, amostra)),
)
  .then(() => continueRender(espera))
  .catch(() => continueRender(espera));
