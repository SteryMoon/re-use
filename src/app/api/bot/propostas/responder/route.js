import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { botAutorizado } from "@/lib/bot";

export async function POST(request) {
    if (!botAutorizado(request)) {
        return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { donoId, propostaId, resposta } = await request.json();

    if (!donoId || !propostaId || !["aceita", "recusada"].includes(resposta)) {
        return NextResponse.json({ erro: "Dados inválidos." }, { status: 400 });
    }

    const proposta = await prisma.proposta.findUnique({
        where: { id: Number(propostaId) },
        include: {
            solicitante: { select: { nome: true } },
            itemDesejado: { select: { titulo: true } },
        },
    });

    if (!proposta || proposta.donoId !== Number(donoId)) {
        return NextResponse.json({ erro: "Proposta não encontrada." }, { status: 404 });
    }

    if (proposta.status !== "pendente") {
        return NextResponse.json({ erro: "Esta proposta já foi respondida." }, { status: 409 });
    }

    await prisma.proposta.update({
        where: { id: proposta.id },
        data: { status: resposta },
    });

    return NextResponse.json({
        ok: true,
        resposta,
        solicitante: proposta.solicitante.nome,
        item: proposta.itemDesejado.titulo,
    });
}