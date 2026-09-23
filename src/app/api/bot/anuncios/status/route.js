import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { botAutorizado } from "@/lib/bot";

export async function POST(request) {
    if (!botAutorizado(request)) {
        return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { donoId, acao } = await request.json();

    if (!donoId || !["pausar", "reativar"].includes(acao)) {
        return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
    }

    const origem = acao === "pausar" ? "disponivel" : "pausado";
    const destino = acao === "pausar" ? "pausado" : "disponivel";

    const resultado = await prisma.item.updateMany({
        where: { donoId: Number(donoId), status: origem },
        data: { status: destino },
    });

    return NextResponse.json({ ok: true, quantidade: resultado.count, acao });
}