# Avaliação do pacote Creator AI — parte 1: skill do YouTube

**Data:** 12/11/2026. **Analisado:** o arquivo `skill-youtube.zip` (18 arquivos, 228 KB), lido por inteiro. As aulas e as skills de Instagram, TikTok, Seguidores e Vídeos Animados **não foram vistas**.

O arquivo comprado não está neste repositório, de propósito: é produto pago e não deve ser redistribuído.

## O que é

Uma pasta de instruções para o Claude (ou ChatGPT) com seis "robôs". Cada robô é um texto de instruções (`ROBO.md`); cinco deles vêm com um programa pequeno em Python.

| Robô | O que faz | Tem programa? |
|---|---|---|
| Caçador de Virais | Lista vídeos do nicho e ordena por views ÷ inscritos do canal | Sim (`ranquear.py`) |
| Gerador de Ideias | Separa comentários em pedidos, dúvidas, dores e discordâncias | Sim (`garimpo.py`) |
| Título Campeão | Sugere temas e confere títulos (tamanho, isca, promessa) | Sim (`titulo.py`) |
| Roteirista | Estrutura de retenção e cronômetro do roteiro | Sim (`tempo.py`) |
| Raio-X de Thumb | Regras de miniatura, nota e prompt para gerador de imagem | Não |
| Humanizador | Troca palavras "de IA" e dá uma nota de 0 a 100 | Sim (`humanize.py`, `detect.py`) |

## É só prompt?

Em grande parte, sim: são instruções bem escritas mais contas simples (divisão, contagem de palavras, busca de expressões). Não há nada que o Claude não faça sem a skill. O valor está na organização do método, não em tecnologia.

O próprio arquivo de créditos diz que o conteúdo foi adaptado de três projetos gratuitos e abertos no GitHub (licença MIT): `instagram-agent-skill`, `claude-youtube` e `yt-packaging`.

## O que ela não faz

- Não cria vídeo, não edita, não narra, não publica.
- Não responde comentários nem interage com ninguém: os robôs só leem. (A aula pode ter dado outra impressão.)
- Não gera a imagem da miniatura no Claude: entrega um prompt para colar em outra ferramenta.

## Segurança do arquivo

- Os seis programas usam só a biblioteca padrão do Python. Nenhum acessa a internet, lê senha, apaga arquivo ou executa comando.
- Só leem o arquivo de entrada e gravam o relatório de saída.
- Não há caracteres invisíveis nem instruções escondidas nos textos.
- As instruções têm travas boas: nunca pedir senha, não inventar números, nada postado sem aprovação.

Conclusão: o arquivo em si é seguro de usar.

## O Apify e o conector

- **O que é:** plataforma tcheca de raspagem de dados, conhecida e legítima, no mercado desde 2015. Tem conector oficial para o Claude.
- **Para que a skill usa:** buscar dados públicos do YouTube (lista de vídeos, views, inscritos, comentários). Sem ele, a skill funciona igual, com os dados colados à mão.
- **"Acesso total":** é acesso total à conta **do Apify**, não ao YouTube, ao Google nem ao Claude. O Claude passa a poder rodar qualquer raspador na conta Apify.
- **Riscos reais:**
  1. Custo: cada busca gasta crédito. Sem cartão cadastrado, o teto é o crédito grátis do mês.
  2. Termos do YouTube: raspagem contraria os termos de uso. Quem raspa são os servidores do Apify, sem ligação com a conta do Google; o risco para o canal é baixo, mas existe em tese.
  3. Texto de terceiros entrando na conversa: comentários raspados são texto não confiável.
- **Risco para a conta do Claude:** baixo. Conector e execução de código são recursos normais do produto.

**Cuidados se for usar:** criar a conta Apify sem cartão; nunca informar senha do Google ou do YouTube a nenhuma ferramenta; manter o volume pequeno, como a própria skill pede.

Observação: este parecer sobre o Apify vem de conhecimento geral, não de pesquisa feita hoje. Preços e planos devem ser conferidos no site.

## O que serve a este projeto

| Ideia | Serve? | Como aproveitar |
|---|---|---|
| Ordenar vídeos do nicho por views ÷ inscritos | Sim | Usar na escolha dos próximos temas (Fase 6) |
| Garimpar comentários de vídeos de futebol e finanças | Sim | Fonte de temas com demanda comprovada |
| Estrutura de retenção (gancho, promessa, re-gancho perto de 60%, pedido no meio) | Sim | Revisar o roteiro do Cruzeiro com ela (Fase 2) |
| Cronômetro de roteiro | Sim | Simples; já temos os tempos reais pela transcrição |
| Regras de miniatura e de título | Sim | Usar na Fase 5 |
| Humanizador | Pouco | O texto final é reescrito e falado pelo dono. A nota é uma heurística; não tem relação com a política do YouTube |
| "Copie a fórmula do viral" | Com cuidado | Fórmula de título, sim. Se todos os compradores usam as mesmas 16 fórmulas, os títulos ficam parecidos |

Nada na skill muda a arquitetura do projeto. Ela cobre pesquisa e texto (antes da gravação); o que construímos aqui cobre a produção do vídeo (depois da gravação). As duas partes se completam.

---

# Complemento: o pacote inteiro (Instagram, TikTok, Vídeos Animados, Zernio)

**Data:** 12/11/2026. **Analisado:** os zips `skill-instagram`, `skill-tiktok` e `videos-animados`, o PDF das 13 funções e o registro das páginas do curso feito pela extensão do Claude no Chrome. **Não analisado:** o que é falado nos vídeos das aulas (a plataforma não tem transcrição) e o código de terceiros que a skill de vídeos baixa da internet durante a instalação.

O curso tem 38 aulas curtas, cerca de 1h30 no total, quase todas de instalação e demonstração.

## Skills de Instagram e de TikTok

- Mesmo formato da skill do YouTube: textos de instrução mais programas de contas simples. Instagram tem 13 robôs; TikTok tem 5.
- Os programas usam só a biblioteca padrão do Python. Nenhum acessa a internet, posta, envia mensagem ou mexe em arquivos fora do que recebe.
- O "humanizador" é o mesmo arquivo nas três skills.
- As instruções são conservadoras: nada é postado sem aprovação; proíbem automatizar comentários e direct de prospecção; avisam que engajamento automatizado viola os termos do Instagram.
- O título "a skill que controla o seu Instagram" exagera: ela escreve e analisa. Quem posta é o usuário.

**Para a conta da Impulso TV:** a skill em si é segura de usar. Ela ajuda a escrever reels, legendas, carrosséis, respostas e planejamento, e a analisar concorrentes. Não é ela que traz o risco; o risco está no Zernio (abaixo).

## Zernio ("ManyChat de Graça" / Máquina de Seguidores)

Não faz parte de nenhum zip. É um serviço externo ao qual as aulas mandam conectar o Instagram e cuja chave de API é entregue ao Claude, que passa a publicar e a configurar a resposta automática no direct.

- **O que a pesquisa encontrou:** é uma API de agendamento e publicação em redes sociais, com automação de comentário para direct. O próprio site diz usar a API oficial da Meta e ser parceiro da Meta. **Não encontrei confirmação independente** nem avaliações de usuários; quase tudo que aparece é material do próprio Zernio ou de concorrentes.
- **Resposta automática por palavra-chave** é recurso permitido pelo Instagram quando feito pela API oficial.
- **"Trava de seguidor"** (só entrega se a pessoa seguir o perfil): não verifiquei se isso respeita as regras da Meta. Conferir antes de usar.
- **Risco:** a chave de API do Zernio dá poder de postar e mandar mensagens pela conta. Colada no chat, ela fica no histórico da conversa.

**Cuidados:** confirmar o Zernio no diretório de parceiros da Meta; testar primeiro em uma conta secundária, nunca direto na Impulso TV; comparar com o agendador nativo (Meta Business Suite), que é gratuito e não exige terceiro.

## Skill de Vídeos Animados

É a única que faz vídeo, e é do mesmo tipo de pipeline que construímos aqui: animação feita por código, renderizada por um navegador, montada com FFmpeg.

**O que ela faz no computador**
- Instala Node.js, FFmpeg, um ambiente Python e um navegador de renderização em `~/.reel-mascote/`.
- No modo "estilos de cinema", baixa do GitHub uma biblioteca de terceiros (`lemo-opuscar`) e a atualiza a cada uso. Esse código não está no zip e pode mudar sem aviso.
- Guarda as chaves em `~/.reel-mascote/.env`, em texto simples.
- Só envia cada chave ao serviço dela (ElevenLabs, Google, OpenRouter, ViLao). Não encontrei envio de chave ou de arquivo para outro lugar.

**Custos que o anúncio não menciona**
- Plano pago do ElevenLabs (voz clonada).
- Crédito pago no Google AI Studio (imagens do avatar).
- Assinatura do Claude ou do ChatGPT.

**Conflito com as regras deste projeto**
| O que a skill faz | Regra do projeto |
|---|---|
| Narra com voz clonada no ElevenLabs | Narração na voz real do dono, sem voz sintética |
| "Baixa qualquer reel pelo link e faz um vídeo igual" | Não copiar o formato de um vídeo que estourou |
| 66 estilos prontos, iguais para todos os compradores | Estilo visual próprio do canal |
| Todo vídeo fecha com "Comenta PALAVRA" | Fecho próprio de cada roteiro |

Baixar o reel de outra pessoa para refazer também esbarra em direito autoral e nos termos do Instagram.

**Conclusão:** não usar no canal de futebol. É exatamente o padrão de produção em molde que a política de conteúdo inautêntico pune. Como referência técnica, confirma que o caminho do projeto (animação por código) é o mesmo que o mercado vende.

## Veredito geral

| Item | Seguro? | Usar no canal de futebol? | Usar na Impulso TV? |
|---|---|---|---|
| Skill do YouTube | Sim | Sim, a parte de pesquisa, título e retenção | Não se aplica |
| Skill do Instagram | Sim | Pouco (legenda dos cortes) | Sim, para escrever e planejar |
| Skill do TikTok | Sim | Pouco (legenda dos cortes) | Se a conta usar TikTok |
| Apify | Sim, sem cartão cadastrado | Opcional | Opcional |
| Zernio | Não confirmado | Não por enquanto | Só depois de teste em conta secundária |
| Vídeos Animados | Instala muita coisa e baixa código externo | Não | Decisão do dono; não é o padrão deste projeto |

**Fontes da pesquisa sobre o Zernio:** [zernio.com/social-media-api](https://zernio.com/social-media-api) · [zernio.com/comment-to-dm](https://zernio.com/comment-to-dm) · [comparação da CreatorFlow](https://creatorflow.so/vs/zernio)
