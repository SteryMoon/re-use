# Playbook — Pausar e Reativar Anúncios

**Tipo:** tarefa

## Trigger

Quando o usuário pedir para pausar, suspender, esconder, desativar, reativar ou voltar a mostrar
seus anúncios.

## Instructions

1. Identifique se o usuário quer pausar ou voltar a mostrar os anúncios
2. Explique que ele pode fazer isso no próprio perfil, acessando
   https://re-use-six.vercel.app/perfil, onde há um botão para pausar ou reativar todos os
   anúncios de uma vez
3. Diga que a ação vale para todos os anúncios — não é possível pausar apenas um

## Integração

A ação é executada pelo componente `src/components/BotaoPausar.js`, presente na tela de perfil,
que chama a rota `POST /api/bot/anuncios/status`.

O botão detecta o estado atual dos anúncios do usuário e oferece a ação oposta: se há anúncios
disponíveis, oferece pausar; se todos já estão pausados, oferece reativar.

A rota altera o campo `status` dos itens entre `disponivel` e `pausado`, filtrando sempre pelo
dono obtido da sessão. O filtro pelo estado de origem garante que a contagem retornada reflita
apenas os itens realmente alterados.

Itens pausados desaparecem da vitrine pública mas continuam visíveis na tela de perfil do
próprio dono.
