# Assistente Virtual do ReUse!

Documentação do chatbot da plataforma ReUse!, desenvolvido para a Atividade 02 de
Startup One (FIAP — Web Design, turma 2TWDOA).

**Plataforma:** https://re-use-six.vercel.app
**Assistente:** embutido no site, botão no canto inferior direito de qualquer tela.

---

## O que o assistente faz

O assistente atua em duas frentes.

**Orientação ao usuário** — seis fluxos conversacionais que respondem às dúvidas mais
frequentes de quem usa a plataforma, com passo a passo e link para a tela correspondente.

**Execução de tarefas** — cinco rotas de API dedicadas que executam ações reais sobre o
banco de dados, acionadas a partir da interface para a qual o assistente encaminha o usuário.

---

## Estrutura desta pasta

```
chatbot/
├── README.md                    este arquivo
├── configuracao/
│   ├── identidade.md            papel, escopo e persona do agente
│   ├── comunicacao.md           tom, tamanho das respostas e saudação
│   ├── guardrails.md            regras que o agente nunca pode quebrar
│   └── webchat.md               configuração do widget embutido no site
├── playbooks/
│   ├── 01-publicar-item.md
│   ├── 02-como-funciona-a-troca.md
│   ├── 03-stories.md
│   ├── 04-favoritos.md
│   ├── 05-seguranca.md
│   ├── 06-conta-login-perfil.md
│   ├── 07-pausar-reativar-anuncios.md
│   └── 08-buscar-itens.md
└── prints/                      capturas de tela da configuração e do funcionamento
```

---

## Tarefas automatizadas

| Tarefa | Rota | Método |
|---|---|---|
| Pausar ou reativar todos os anúncios | `/api/bot/anuncios/status` | POST |
| Consultar propostas de troca pendentes | `/api/bot/propostas` | GET |
| Aceitar ou recusar uma proposta | `/api/bot/propostas/responder` | POST |
| Publicar um novo item para troca | `/api/bot/itens` | POST |
| Buscar itens disponíveis | `/api/bot/buscar` | GET |

### Arquivos no repositório

| Arquivo | Função |
|---|---|
| `src/app/api/bot/anuncios/status/route.js` | Pausar e reativar anúncios |
| `src/app/api/bot/propostas/route.js` | Listar propostas pendentes |
| `src/app/api/bot/propostas/responder/route.js` | Aceitar ou recusar proposta |
| `src/app/api/bot/itens/route.js` | Publicar item |
| `src/app/api/bot/buscar/route.js` | Buscar itens |
| `src/lib/bot.js` | Validação do segredo compartilhado |
| `src/components/Chatbot.js` | Incorporação do widget no site |
| `src/components/BotaoPausar.js` | Botão de pausar e reativar no perfil |
| `src/app/buscar/page.js` | Página de resultados de busca |

### Segurança

As rotas `/api/bot/*` ficam separadas das rotas comuns da aplicação e são protegidas de
duas formas:

- **Segredo compartilhado.** O helper `src/lib/bot.js` valida o cabeçalho `x-bot-secret`
  contra a variável de ambiente `BOT_SECRET`, cadastrada localmente e na Vercel.
- **Sessão do usuário.** Na versão em uso, a identificação vem de `usuarioLogado()`, de modo
  que o identificador do dono nunca trafega no corpo da requisição. Isso impede que alguém
  altere os anúncios de outra pessoa passando um id arbitrário.

Toda consulta filtra pelo dono do registro. A rota de resposta a propostas verifica se a
proposta pertence a quem está respondendo, e devolve o mesmo código de erro para proposta
inexistente e para proposta alheia, para não revelar informação.

---

## Orientações implementadas

| Playbook | Orientação oferecida |
|---|---|
| Publicar Item | Passo a passo para cadastrar um item para troca |
| Como Funciona a Troca | As quatro etapas: proposta, resposta, conversa e combinação |
| Stories do ReUse | O que são e por que expiram em 24 horas |
| Favoritos e Itens Salvos | Como salvar itens e onde encontrá-los depois |
| Segurança nas Trocas | Boas práticas para o encontro presencial |
| Conta, Login e Perfil | Criação de conta, acesso e edição do perfil |

Cada playbook está documentado em `playbooks/`, com o gatilho que o aciona e as instruções
que o agente segue.

---

## Como reproduzir a configuração

1. Criar uma conta gratuita no Botpress e um agente novo, do zero.
2. Em **Instructions**, preencher Identity, Communication e Safety com o conteúdo de
   `configuracao/`.
3. Em **Playbooks**, criar os oito playbooks com o Trigger e as Instructions de cada arquivo
   da pasta `playbooks/`.
4. Em **Knowledge**, remover a busca na web. Ela compete com os playbooks e não tem
   utilidade no contexto da plataforma.
5. Em **Escalation**, desativar o encaminhamento para atendimento humano. A plataforma não
   possui equipe de atendimento.
6. Em **Channels → Webchat**, aplicar a configuração de `configuracao/webchat.md` e copiar
   o código de incorporação.
7. Colar os dois scripts em `src/components/Chatbot.js` e verificar que o componente está
   sendo renderizado em `src/app/layout.js`.
8. Publicar o agente.

---

## Observação sobre a plataforma escolhida

O desenvolvimento começou pelo IBM watsonx Assistant, conforme proposto na atividade. A
criação da instância foi bloqueada por uma exigência de verificação de identidade na conta
do IBM Cloud, que impedia o acesso ao console mesmo no plano gratuito. A construção migrou
então para o Botpress, plataforma equivalente em modelo conceitual: fluxos conversacionais
estruturados, variáveis de sessão, chamadas HTTP a APIs externas e widget incorporável.

O planejamento foi preservado integralmente. O conteúdo dos fluxos, o desenho das tarefas e
a arquitetura de integração permaneceram os mesmos; mudou apenas a ferramenta que os hospeda.
