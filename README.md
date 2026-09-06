# ReUse!

**Aplicação no ar:** https://re-use-six.vercel.app

Plataforma web de trocas de itens entre pessoas, sem uso de dinheiro. Versão web do projeto ReUse!, desenvolvida como parte da disciplina Startup One da FIAP.

O objetivo não foi replicar todo o aplicativo mobile, mas levar para a web as áreas mais relevantes da jornada do usuário: cadastro e acesso, descoberta de itens, publicação de anúncios, negociação de trocas e comunicação entre as partes.

## Stack

- **Next.js 16** com App Router
- **React 19**
- **Tailwind CSS 4**
- **Prisma ORM 6**
- **PostgreSQL** hospedado no Neon
- **bcryptjs** para hash de senha
- **Vercel** para hospedagem, com deploy automático a cada push

## Telas

| Rota | Tela | Objetivo |
|---|---|---|
| `/` | Boas-vindas | Apresenta a proposta e direciona para cadastro ou login |
| `/cadastro` | Criar conta | Registro de novo usuário, com sessão criada automaticamente |
| `/login` | Login | Acesso de usuários já cadastrados |
| `/vitrine` | Vitrine | Stories, categorias e grade de itens disponíveis. Aceita `?categoria=ID` para filtrar |
| `/categorias` | Todas as categorias | Grade com as doze categorias e a contagem de itens em cada |
| `/novo` | Novo anúncio | Formulário de publicação de item |
| `/item/[id]` | Detalhe do item | Favoritar, propor troca e iniciar conversa |
| `/stories/[id]` | Story | Visualização em tela cheia de publicações temporárias |
| `/favoritos` | Salvos | Itens marcados como favoritos |
| `/propostas` | Trocas | Propostas enviadas e recebidas, com aceite e recusa |
| `/chat` | Mensagens | Lista de conversas com prévia da última mensagem |
| `/chat/[id]` | Conversa | Troca de mensagens entre dois usuários |
| `/perfil` | Perfil | Dados públicos, indicadores de atividade e anúncios do usuário |

## Rotas de API

| Rota | Métodos | Responsabilidade |
|---|---|---|
| `/api/auth/cadastro` | POST | Valida campos, verifica duplicidade, aplica hash e cria sessão |
| `/api/auth/login` | POST | Confere credenciais e abre sessão |
| `/api/auth/logout` | POST | Encerra a sessão |
| `/api/itens` | GET, POST, DELETE | Lista com filtro e busca, publica e remove anúncios |
| `/api/stories` | GET, POST | Lista stories válidos e publica novos |
| `/api/favoritos` | POST | Alterna o favorito |
| `/api/propostas` | POST, PATCH | Registra proposta e permite aceitar ou recusar |
| `/api/conversas` | POST | Localiza ou cria a conversa entre duas pessoas |
| `/api/mensagens` | POST | Envia mensagem validando a participação na conversa |

## Banco de dados

Oito tabelas modeladas no Prisma:

- **Usuario** — dados de acesso e perfil público. Raiz da maioria dos relacionamentos
- **Categoria** — classifica os itens e permite filtro na vitrine
- **Item** — o anúncio disponibilizado para troca
- **Story** — publicações temporárias com expiração em 24 horas
- **Proposta** — oferta de um item em troca de outro, com status de negociação
- **Conversa** — sala de conversa entre duas pessoas, com par único
- **Mensagem** — cada fala dentro de uma conversa
- **Favorito** — tabela associativa entre Usuario e Item

## Como executar localmente

```bash
git clone https://github.com/SteryMoon/re-use
cd re-use
npm install
```

Crie um arquivo `.env` na raiz com as duas variáveis de conexão:

```
DATABASE_URL="postgresql://usuario:senha@host-pooler.../neondb?sslmode=require"
DIRECT_URL="postgresql://usuario:senha@host.../neondb?sslmode=require"
```

A `DATABASE_URL` usa o endpoint com pooling, aproveitado pela aplicação. A `DIRECT_URL` aponta para o endpoint direto e é usada apenas pelas migrations.

Depois:

```bash
npx prisma migrate dev
npx prisma db seed
npm run dev
```

O site sobe em `http://localhost:3000`.

## Dados de demonstração

O seed popula 12 categorias, 8 usuários, 30 itens e 8 stories.

Para entrar com uma conta pronta:

- E-mail: `ana@reuse.com`
- Senha: `123456`

Qualquer um dos outros usuários (`bruno@`, `carla@`, `diego@`, `elisa@`, `felipe@`, `gabi@`, `hugo@`) usa a mesma senha.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Sobe o servidor de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run studio` | Abre o Prisma Studio em `localhost:5555` |
| `npm run migrate` | Cria e aplica uma migration |
| `npm run seed` | Popula o banco com dados de demonstração |

## Estrutura

```
prisma/
  schema.prisma      modelos e configuração do datasource
  seed.js            dados de demonstração
  migrations/        histórico versionado do banco
src/
  app/               rotas de interface e de API (App Router)
  components/        componentes reutilizáveis
  lib/
    prisma.js        cliente Prisma como singleton
    session.js       criação e leitura da sessão via cookie
public/              logos e imagens estáticas
```

## Observações técnicas

**Server Components por padrão.** Telas que apenas leem dados consultam o Prisma diretamente, sem passar por rota de API. Componentes de cliente aparecem só onde há formulários e estado.

**Sessão via cookie httpOnly.** A função que identifica o usuário logado usa `select` para trazer apenas campos públicos, garantindo que o hash da senha nunca saia do banco.

**Layout responsivo.** A interface parte de um design mobile e se adapta ao desktop: a barra de navegação migra do rodapé para o topo e as grades passam de duas para até seis colunas.

**Deploy contínuo.** Cada envio para a branch `main` dispara um novo build na Vercel e republica o site automaticamente.
