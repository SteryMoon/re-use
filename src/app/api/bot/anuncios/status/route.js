import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) {
        return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });
    }

    const { acao } = await request.json();
    if (!["pausar", "reativar"].includes(acao)) {
        return NextResponse.json({ erro: "Ação inválida." }, { status: 400 });
    }

    const origem = acao === "pausar" ? "disponivel" : "pausado";
    const destino = acao === "pausar" ? "pausado" : "disponivel";

    const resultado = await prisma.item.updateMany({
        where: { donoId: usuario.id, status: origem },
        data: { status: destino },
    });

    return NextResponse.json({ ok: true, quantidade: resultado.count, acao });
}