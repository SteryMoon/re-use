import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const categoriaId = searchParams.get("categoria");
    const busca = searchParams.get("q");

    const itens = await prisma.item.findMany({
        where: {
            status: "disponivel",
            ...(categoriaId && { categoriaId: Number(categoriaId) }),
            ...(busca && { titulo: { contains: busca } }),
        },
        include: { categoria: true, dono: { select: { nome: true, avatar: true } } },
        orderBy: { criadoEm: "desc" },
    });

    return NextResponse.json(itens);
}

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { titulo, descricao, imagem, condicao, categoriaId } = await request.json();

    if (!titulo || !descricao || !imagem || !categoriaId) {
        return NextResponse.json({ erro: "Preencha todos os campos." }, { status: 400 });
    }

    const item = await prisma.item.create({
        data: {
            titulo,
            descricao,
            imagem,
            condicao: condicao || "usado",
            donoId: usuario.id,
            categoriaId: Number(categoriaId),
        },
    });

    return NextResponse.json(item);
}

export async function DELETE(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { id } = await request.json();

    const item = await prisma.item.findUnique({ where: { id: Number(id) } });
    if (!item || item.donoId !== usuario.id) {
        return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
    }

    await prisma.favorito.deleteMany({ where: { itemId: Number(id) } });
    await prisma.item.delete({ where: { id: Number(id) } });

    return NextResponse.json({ ok: true });
}