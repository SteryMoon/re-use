import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { botAutorizado } from "@/lib/bot";

const IMAGEM_PADRAO = "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80";

export async function POST(request) {
    if (!botAutorizado(request)) {
        return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { donoId, titulo, descricao, categoria, condicao, imagem } = await request.json();

    if (!donoId || !titulo || !descricao || !categoria) {
        return NextResponse.json({ erro: "Informe donoId, titulo, descricao e categoria." }, { status: 400 });
    }

    const categoriaEncontrada = await prisma.categoria.findFirst({
        where: { nome: { equals: categoria, mode: "insensitive" } },
    });

    if (!categoriaEncontrada) {
        const todas = await prisma.categoria.findMany({ select: { nome: true } });
        return NextResponse.json(
            { erro: "Categoria não encontrada.", categoriasDisponiveis: todas.map((c) => c.nome) },
            { status: 400 }
        );
    }

    const item = await prisma.item.create({
        data: {
            titulo,
            descricao,
            imagem: imagem || IMAGEM_PADRAO,
            condicao: condicao || "usado",
            donoId: Number(donoId),
            categoriaId: categoriaEncontrada.id,
        },
    });

    return NextResponse.json({ ok: true, id: item.id, titulo: item.titulo, categoria: categoriaEncontrada.nome });
}