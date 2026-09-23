export function botAutorizado(request) {
    const segredo = request.headers.get("x-bot-secret");
    return segredo === process.env.BOT_SECRET;
}