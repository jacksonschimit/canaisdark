import { Img, staticFile } from "remotion";
import { COR, FONTE } from "../estilo/tema";

/** Escudo de clube ou símbolo de entidade, sobre um disco branco (estilo figurinha). */
export const Escudo = ({
  arquivo,
  tamanho,
  escala = 1,
  largo = false,
}: {
  arquivo: string;
  tamanho: number;
  escala?: number;
  /** Para logotipos largos (ex.: FIFA): placa retangular em vez de disco. */
  largo?: boolean;
}) => (
  <div
    style={{
      width: largo ? tamanho * 1.9 : tamanho,
      height: tamanho,
      borderRadius: largo ? tamanho * 0.22 : tamanho / 2,
      background: COR.branco,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 14px 40px rgba(0,0,0,0.45)",
      transform: `scale(${escala})`,
      flexShrink: 0,
    }}
  >
    <Img
      src={staticFile(`escudos/${arquivo}`)}
      style={{
        width: largo ? "78%" : "76%",
        height: largo ? "62%" : "76%",
        objectFit: "contain",
      }}
    />
  </div>
);

/** Moeda dourada com o cifrão: marca visual de "aqui se fala de dinheiro". */
export const Moeda = ({
  tamanho,
  simbolo = "R$",
  giro = 1,
}: {
  tamanho: number;
  simbolo?: string;
  /** 0 a 1: a moeda entra girando. */
  giro?: number;
}) => (
  <div
    style={{
      width: tamanho,
      height: tamanho,
      borderRadius: tamanho / 2,
      background: `radial-gradient(circle at 35% 30%, #FFE08A, ${COR.ouro} 55%, #C98A00)`,
      border: `${tamanho * 0.05}px solid #FFE08A`,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: FONTE.titulo,
      fontSize: tamanho * 0.46,
      color: "#5A3B00",
      boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
      transform: `scaleX(${Math.cos((1 - giro) * Math.PI * 1.5)}) scale(${0.3 + 0.7 * giro})`,
      opacity: giro > 0.02 ? 1 : 0,
      flexShrink: 0,
    }}
  >
    {simbolo}
  </div>
);
