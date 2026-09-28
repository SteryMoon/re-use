import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { botAutorizado } from "@/lib/bot";

export async function GET(request) {
    if (!botAutorizado(request)) {
        return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const donoId = searchParams.get("donoId");

    if (!donoId) {
        return NextResponse.json({ erro: "Informe o donoId." }, { status: 400 });
    }

    const propostas = await prisma.proposta.findMany({
        where: { donoId: Number(donoId), status: "pendente" },
        include: {
            solicitante: { select: { nome: true } },
            itemDesejado: { select: { titulo: true } },
            itemOferecido: { select: { titulo: true } },
        },
        orderBy: { criadoEm: "desc" },
    });

    const lista = propostas.map((p) => ({
        id: p.id,
        solicitante: p.solicitante.nome,
        querSeu: p.itemDesejado.titulo,
        oferece: p.itemOferecido.titulo,
    }));

    return NextResponse.json({ quantidade: lista.length, propostas: lista });
}