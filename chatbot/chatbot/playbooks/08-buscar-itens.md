# Playbook — Buscar Itens

**Tipo:** tarefa

## Trigger

O usuário quer encontrar algo na plataforma. Exemplos: "procuro uma bicicleta", "tem livros?",
"quero ver eletrônicos", "você tem alguma mochila".

## Instructions

1. Identifique a palavra-chave do item ou categoria que a pessoa procura
2. Se a pessoa não disser o que procura, pergunte qual item ou categoria deseja encontrar
3. Se a busca estiver clara, monte o link https://re-use-six.vercel.app/buscar?q=TERMO,
   substituindo TERMO pela palavra-chave codificada para URL
4. Envie o link e diga em uma frase que ele mostra os itens disponíveis

## Integração

A página `src/app/buscar/page.js` lê o termo da query string e consulta o banco filtrando por
título, sem diferenciar maiúsculas e minúsculas. Os resultados são exibidos no mesmo componente
de card usado na vitrine, e apenas itens com status `disponivel` aparecem.

A codificação para URL no passo 3 é necessária para que acentos e espaços não quebrem o link —
"violão" vira `viol%C3%A3o`.

A rota `GET /api/bot/buscar` implementa a mesma busca em formato JSON, limitada a cinco
resultados, com título, categoria, condição, dono, cidade e link de cada item.
