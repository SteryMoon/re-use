import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { conversaId, conteudo } = await request.json();
    if (!conteudo?.trim()) {
        return NextResponse.json({ erro: "Mensagem vazia." }, { status: 400 });
    }

    const conversa = await prisma.conversa.findUnique({ where: { id: Number(conversaId) } });
    if (!conversa || (conversa.usuarioAId !== usuario.id && conversa.usuarioBId !== usuario.id)) {
        return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
    }

    const mensagem = await prisma.mensagem.create({
        data: { conversaId: Number(conversaId), autorId: usuario.id, conteudo },
    });

    return NextResponse.json(mensagem);
}