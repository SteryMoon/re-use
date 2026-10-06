# Configuração do widget

Configurado em: Botpress → Channels → Webchat → Customize

## Aparência

| Campo | Valor |
|---|---|
| Primary color | #005EFF |
| Theme | Light |
| Font | Inter |
| Display name | Assistente ReUse! |
| Bot description | Tire dúvidas sobre o ReUse! e gerencie seus anúncios por aqui. |
| Message placeholder | Pergunte alguma coisa... |

## Tela inicial

Ativada em Home page → Enable home page.

| Campo | Valor |
|---|---|
| Hero title | Oi! Como posso ajudar? |
| Hero subtitle | Tire dúvidas ou gerencie seus anúncios por aqui. |
| Starters | Formato Cards |

### Atalhos

| Ícone | Título | Subtítulo |
|---|---|---|
| caixa | Anunciar um item | Como cadastrar algo para troca |
| seta circular | Como funciona a troca | Do pedido até a entrega |
| engrenagem | Pausar meus anúncios | Suspender temporariamente |
| lupa | Procurar itens | Encontre algo para trocar |

A escolha dos quatro atalhos foi intencional: dois representam orientação e dois representam
tarefas, apresentando de imediato as duas frentes do assistente a quem abre o chat pela
primeira vez.

## Outras configurações

| Campo | Valor | Motivo |
|---|---|---|
| Knowledge → Web search | Desativado | Competia com os playbooks pela resposta e não tem utilidade no contexto da plataforma |
| Escalation → Hands off to human | Desativado | A plataforma não possui equipe de atendimento; com a opção ativa, o agente encerrava conversas que poderia resolver |
| Chat settings → Citations | Desativado | Serve para citar fontes da base de conhecimento, que não é usada |
| Chat interface | Toggle | Bolha flutuante no canto da tela |

## Incorporação no site

O widget é carregado pelo componente `src/components/Chatbot.js`, renderizado em
`src/app/layout.js` para aparecer em todas as páginas. O componente usa `next/script` e
encadeia os dois scripts: o segundo só é inserido depois que o primeiro termina de carregar,
pelo callback `onReady`. Sem esse encadeamento, o segundo script tenta chamar `botpress.init()`
antes de o objeto existir e o widget não aparece.
