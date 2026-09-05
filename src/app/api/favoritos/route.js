import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { itemId } = await request.json();
    const chave = { usuarioId_itemId: { usuarioId: usuario.id, itemId: Number(itemId) } };

    const existente = await prisma.favorito.findUnique({ where: chave });

    if (existente) {
        await prisma.favorito.delete({ where: chave });
        return NextResponse.json({ salvo: false });
    }

    await prisma.favorito.create({
        data: { usuarioId: usuario.id, itemId: Number(itemId) },
    });
    return NextResponse.json({ salvo: true });
}