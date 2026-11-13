# Canais Dark

Projeto pessoal do dono do repositório. Idioma de trabalho: português do Brasil.

## Objetivo final

Uma **máquina de criação de vídeos**: roteiro, narração, montagem do vídeo, cortes, publicação e, se possível, acompanhamento dos números do canal, com o máximo de automação e o mínimo de trabalho manual do dono. Meta de negócio: um canal sem rosto no YouTube, monetizado por anúncios.

Construímos ferramentas próprias aqui no repositório e adotamos ferramentas de terceiros quando reduzirem trabalho.

## Limite que não se negocia: não virar "lixo de IA"

A automação serve à produção, nunca substitui a autoria. O YouTube desmonetiza e encerra canais de conteúdo "inautêntico": em série, de molde, sem curadoria, duplicado ou robotizado. Por isso, em todo vídeo:

- roteiro original, com pesquisa e fonte para cada número e data;
- revisão dos fatos e do texto pelo dono antes de gravar;
- narração na voz do próprio dono (sem voz sintética);
- estilo visual próprio e consistente, feito para o canal, sem moldes comprados;
- o visual tem que ter cara de futebol (escudos, cores do clube), não de apresentação de negócios nem de ferramenta de IA;
- **o futebol vem antes do número:** todo valor em dinheiro aparece ligado a um fato de campo (quem era o jogador, quantos jogos fez, o que o time ganhou ou perdeu com aquilo), para o torcedor poder julgar se o negócio foi bom ou ruim. Dívida e gráfico sozinhos são rasos (retorno do dono em 12/11/2026);
- nada de copiar o formato de um vídeo que "estourou";
- antes de automatizar uma etapa, perguntar: isso tira o toque humano que protege o canal? Se sim, automatiza-se o trabalho braçal e mantém-se a decisão com o dono.

## Como o dono e o Claude dividem o trabalho

O Claude pesquisa e traz opções com recomendação; o dono decide e grava. Não devolver ao dono uma pergunta aberta ("qual tema você quer?"): levar de duas a quatro opções, com prós, contras e uma recomendação. Decisões em aberto ficam em `docs/decisoes-pendentes.md`.

## Decisões já tomadas (não reabrir)

- Nicho: "o negócio do futebol" (o lado do dinheiro, contado como história).
- Um canal só para começar; trocar de nicho só com base em números.
- Vídeo longo é o produto principal; cortes verticais (Shorts, Reels, TikTok) trazem público.
- Orçamento máximo: R$ 200 por mês.

Detalhes e pesquisa: `docs/contexto-inicial.md`.

## Regras de conteúdo

- Todo número e toda data têm fonte no roteiro.
- Acusação contra pessoa real só com base documentada, sempre atribuída, com o desfecho e a resposta do citado. Investigado não é condenado.
- Evitar líderes políticos em atividade.
- Não usar lance de jogo nem imagem de transmissão de TV.
- Escudos de clubes e símbolos de entidades podem aparecer para identificar de quem se fala (decisão do dono em 12/11/2026: o público de futebol se reconhece no escudo). São marcas registradas: uso só editorial, sem alterar o desenho e sem sugerir vínculo ou apoio. Registrar a origem de cada arquivo em `video/public/escudos/ORIGEM.md`.
- Trilha de fundo sempre baixa, atrás da voz. Só música própria (`ferramentas/trilha_suspense.py`) ou com licença explícita.
- Não dar recomendação de investimento.

## Onde está cada coisa

- `docs/plano-do-canal.md`: como é um vídeo do canal (estrutura, quadros recorrentes, embalagem) e a semana de produção.
- `docs/referencias.md`: canais que o dono usa como referência e o que observar em cada um.
- `ROADMAP.md`: a sequência de passos do projeto e o estado de cada um. **Atualizar sempre que um passo for concluído ou mudar.**
- `docs/`: contexto, pesquisa e decisões. `docs/metodo-conteudo.md` é o método para tema, título, estrutura de roteiro e miniatura: **consultar antes de escrever qualquer roteiro ou título.**
- `roteiros/NNN-tema/`: roteiro e fontes de cada vídeo.
- `video/`: projeto Remotion (animações). Tema visual em `video/src/estilo/tema.ts` (a cor `clube` muda a cada episódio); escudo e moeda em `video/src/componentes/Simbolos.tsx`; cada corte tem um arquivo de dados (falas, tempos, números) separado do arquivo de animação.
- `demos/`: vídeos de demonstração renderizados.
- `ferramentas/`: scripts do pipeline de áudio. `tratar_audio.sh` (limpa e nivela a gravação), `transcrever.py` (Whisper, tempo por palavra; precisa de `pip install faster-whisper`), `aplicar_cortes.py` (remove erros de fala e ajusta os tempos).
- `gravacoes/brutas/`: narrações originais do dono. As tratadas são geradas de novo pelos scripts e não vão para o git.

## Da gravação ao vídeo

1. `ferramentas/tratar_audio.sh gravacoes/brutas/X.m4a gravacoes/tratadas/X.wav`
2. `python3 ferramentas/transcrever.py gravacoes/tratadas/X.wav palavras.json`
3. Se houver erro de fala: `ferramentas/aplicar_cortes.py` com os trechos a remover.
4. Áudio final em `video/public/`; palavras em `video/src/cortes/<corte>.palavras.json`, com o texto revisado à mão (nomes próprios, pontuação).
5. As cenas e a legenda usam `marca("palavra")` para entrar no momento em que a palavra é dita.

## Como renderizar

```bash
cd video && npm install
```

```bash
npx remotion render src/index.ts CorteMenos6 ../demos/saida.mp4
```

Nas sessões em nuvem do Claude Code, acrescentar `--browser-executable=/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell`.
