import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function GET() {
    const stories = await prisma.story.findMany({
        where: { expiraEm: { gt: new Date() } },
        include: { autor: { select: { id: true, nome: true, avatar: true } } },
        orderBy: { criadoEm: "desc" },
    });

    return NextResponse.json(stories);
}

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { imagem, texto } = await request.json();
    if (!imagem) return NextResponse.json({ erro: "Envie uma imagem." }, { status: 400 });

    const story = await prisma.story.create({
        data: {
            imagem,
            texto: texto || null,
            autorId: usuario.id,
            expiraEm: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    });

    return NextResponse.json(story);
}