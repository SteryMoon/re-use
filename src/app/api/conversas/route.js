import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { outroId } = await request.json();

    const a = Math.min(usuario.id, Number(outroId));
    const b = Math.max(usuario.id, Number(outroId));

    const existente = await prisma.conversa.findUnique({
        where: { usuarioAId_usuarioBId: { usuarioAId: a, usuarioBId: b } },
    });

    if (existente) return NextResponse.json(existente);

    const nova = await prisma.conversa.create({
        data: { usuarioAId: a, usuarioBId: b },
    });

    return NextResponse.json(nova);
}