# Roadmap

**Objetivo final:** um canal monetizado por anúncios, produzido por uma máquina de vídeos o mais automatizada possível, sem cair no padrão de conteúdo inautêntico que o YouTube pune (ver `CLAUDE.md`).

**Como usar:** seguimos as fases na ordem. Cada passo diz quem faz (**Dono** ou **Claude**). Marcar `[x]` ao concluir. Atualizado em 12/11/2026.

---

## Fase 0 — Base do projeto

- [x] **Dono:** criar o repositório no GitHub.
- [x] **Claude:** registrar contexto, visão, regras e este roadmap no repositório.

## Fase 1 — Teste do formato (estamos aqui)

- [x] **Claude:** corte de demonstração de 30 segundos em animação gráfica (`demos/001-cruzeiro-corte-menos6-v1.mp4`), sem áudio, com tempos estimados.
- [x] **Dono:** gravar a narração desse corte e enviar o arquivo.
- [x] **Claude:** tratamento de áudio (ruído, volume, silêncios) e transcrição com tempo por palavra (`ferramentas/`).
- [x] **Claude:** sincronizar animação e legenda com a voz real e entregar o corte v2, com áudio (`demos/001-cruzeiro-corte-menos6-v2.mp4`).
- [x] **Dono:** assistir ao v2 e pedir ajustes (paleta com cara de IA, faltavam escudos, cifrão e trilha de fundo).
- [x] **Claude:** corte v3 com paleta nova na cor do clube, escudos, moeda com cifrão, trilha de suspense e batidas (`demos/001-cruzeiro-corte-menos6-v3.mp4`).
- [x] **Dono:** assistir ao v3. Primeiro retorno: a trilha de fundo não se ouvia.
- [x] **Claude:** corte v4 com a trilha mais alta e mais presente nos médios (`demos/001-cruzeiro-corte-menos6-v4.mp4`).
- [x] **Claude:** registrar o método aproveitado do pacote comprado (`docs/metodo-conteudo.md`).
- [x] **Dono:** retorno do v3: falta contexto de futebol; está raso, só número e gráfico.
- [x] **Claude:** pesquisar o volante e propor o texto v2 do corte, com currículo e desempenho em campo (`roteiros/001-cruzeiro/corte-menos6-texto-v2.md`).
- [ ] **Dono:** conferir os pontos em aberto do texto v2 (principalmente o número de jogos), ajustar ao seu jeito de falar e gravar com o microfone.
- [ ] **Claude:** animar o corte v5 com a ficha do jogador, o campinho e a conta por jogo.
- [ ] **Dono:** dizer se ouve a trilha no v4.
- [ ] **Dono:** regravar a narração com o microfone, em ambiente abafado (a gravação atual tem ruído de fundo).
- [ ] **Dono:** indicar 2 ou 3 canais de futebol que gosta, como referência de trilha e de visual.
- [x] **Claude:** avaliar o pacote comprado inteiro (`docs/avaliacao-pacote-creator-ai.md`).

## Fase 2 — Roteiro do piloto pronto para gravar

- [ ] **Claude:** pesquisar os pontos da lista "A conferir antes de gravar" do roteiro, em especial: desfecho da investigação de 2019 e resposta dos dirigentes; critério da dívida de 2019 x 2025; datas, placar e títulos.
- [ ] **Claude:** passar o roteiro inteiro pela regra do contexto de futebol (quem, o que fez em campo, valeu a pena) e corrigir o valor em reais da dívida do Al Wahda (a fonte usa a cotação de 2020).
- [ ] **Claude:** rever a estrutura do roteiro com `docs/metodo-conteudo.md` (três ganchos, pedido de inscrição no meio, segundo gancho perto de 60%).
- [ ] **Dono:** revisar os fatos e reescrever o texto no seu jeito de falar.
- [ ] **Dono:** definir o tema do segundo vídeo (entra no fecho do piloto).
- [ ] **Claude:** fechar o roteiro v2 com as fontes conferidas.

## Fase 3 — Pipeline do vídeo longo

- [ ] **Claude:** biblioteca de cenas reutilizáveis (número grande, gráfico de barras, linha do tempo, documento, tabela, comparação em escala).
- [ ] **Claude:** formato horizontal (1920x1080) com a mesma identidade.
- [ ] **Claude:** roteiro marcado → lista de cenas → vídeo, com os tempos vindos da transcrição.
- [ ] **Claude:** trilha e efeitos sonoros com licença segura (biblioteca de áudio do YouTube).
- [ ] **Claude:** geração dos 3 a 5 cortes verticais a partir do vídeo longo.
- [ ] **Dono:** gravar a narração completa do piloto (9 a 10 minutos).
- [ ] **Claude + Dono:** montar, revisar e aprovar o piloto.

## Fase 4 — Criação do canal

- [ ] **Dono + Claude:** nome do canal e identidade visual (cores, fontes, logotipo, banner). Conferir se o nome está livre no YouTube, Instagram e TikTok.
- [ ] **Dono:** criar o canal e os perfis; verificar a conta por telefone (libera miniatura personalizada e vídeos acima de 15 minutos).
- [ ] **Claude:** modelo de miniatura, descrição padrão com fontes, e texto do "sobre".
- [ ] **Claude:** pesquisar as regras de uso de imagens de futebol e confirmar os requisitos de monetização de 2027 na Central de Ajuda do YouTube.

## Fase 5 — Publicação do piloto

- [ ] **Claude:** título, miniatura, descrição, capítulos e legenda (arquivo .srt).
- [ ] **Dono:** subir o vídeo longo pelo YouTube Studio, declarando conteúdo alterado se for o caso.
- [ ] **Dono:** agendar os cortes (YouTube Studio, Meta Business Suite, TikTok no desktop).
- [ ] **Claude:** lista de conferência de publicação, para repetir igual em todo vídeo.

## Fase 6 — Rotina semanal

- [ ] **Dono + Claude:** lista dos próximos 8 temas, com ordem.
- [ ] **Claude:** fluxo de um comando por etapa (pesquisa → roteiro → cenas → render → cortes → pacote de publicação).
- [ ] **Dono:** manter um vídeo longo por semana por 12 semanas antes de qualquer conclusão.

## Fase 7 — Medição e decisão

- [ ] **Claude:** painel com os números que importam (retenção, taxa de clique da miniatura, horas de exibição, inscritos por vídeo), a partir da exportação do YouTube Studio ou da API de Analytics.
- [ ] **Dono + Claude:** definir o critério para continuar, ajustar ou trocar de nicho, e a frequência da revisão.
- [ ] **Claude:** revisão mensal: o que funcionou, o que muda nos próximos roteiros.

## Fase 8 — Mais automação

- [ ] **Claude:** pesquisar e testar publicação por API (YouTube, depois Instagram e TikTok), incluindo cota e auditoria do projeto.
- [ ] **Claude:** agendamento automático dos cortes.
- [ ] **Claude:** coleta automática dos números do canal.
- [ ] Regra: cada automação nova passa pelo teste do `CLAUDE.md` (não pode tirar a autoria do dono).

## Fase 9 — Monetização

- [ ] Meta: 1.000 inscritos e 4.000 horas de exibição em 12 meses (views de Shorts não contam para as horas).
- [ ] **Dono:** pedir entrada no Programa de Parcerias e configurar o AdSense.
- [ ] **Dono + Claude:** avaliar um segundo canal só depois de o primeiro ter um modelo que funcione.

---

## Em aberto, sem fase definida

- Análise das teses do curso do Peter Jordan (o dono envia o resumo, sem pressa).
- Compra de microfone simples, se a gravação no celular não ficar boa no teste da Fase 1.
