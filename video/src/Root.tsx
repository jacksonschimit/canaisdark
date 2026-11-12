import { Composition } from "remotion";
import "./estilo/fontes";
import { CorteMenos6 } from "./cortes/CorteMenos6";
import { DURACAO_S } from "./cortes/menos6.dados";

export const FPS = 30;

export const Root = () => (
  <Composition
    id="CorteMenos6"
    component={CorteMenos6}
    durationInFrames={Math.round(DURACAO_S * FPS)}
    fps={FPS}
    width={1080}
    height={1920}
  />
);
