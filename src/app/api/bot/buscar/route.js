import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { botAutorizado } from "@/lib/bot";

export async function GET(request) {
    if (!botAutorizado(request)) {
        return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const termo = searchParams.get("termo");
    const categoria = searchParams.get("categoria");

    if (!termo && !categoria) {
        return NextResponse.json({ erro: "Informe um termo ou uma categoria." }, { status: 400 });
    }

    const itens = await prisma.item.findMany({
        where: {
            status: "disponivel",
            ...(termo && { titulo: { contains: termo, mode: "insensitive" } }),
            ...(categoria && { categoria: { nome: { equals: categoria, mode: "insensitive" } } }),
        },
        include: {
            categoria: { select: { nome: true } },
            dono: { select: { nome: true, cidade: true } },
        },
        orderBy: { criadoEm: "desc" },
        take: 5,
    });

    const lista = itens.map((i) => ({
        titulo: i.titulo,
        categoria: i.categoria.nome,
        condicao: i.condicao,
        dono: i.dono.nome,
        cidade: i.dono.cidade,
        link: `https://re-use-six.vercel.app/item/${i.id}`,
    }));

    return NextResponse.json({ quantidade: lista.length, itens: lista });
}