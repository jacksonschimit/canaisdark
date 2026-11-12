# Avaliação da skill "Máquina do YouTube" (pacote Máquina de Viralização)

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
