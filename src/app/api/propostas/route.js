import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";

export async function POST(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { itemOferecidoId, itemDesejadoId } = await request.json();

    const desejado = await prisma.item.findUnique({ where: { id: Number(itemDesejadoId) } });
    if (!desejado) return NextResponse.json({ erro: "Item não encontrado." }, { status: 404 });

    const proposta = await prisma.proposta.create({
        data: {
            itemOferecidoId: Number(itemOferecidoId),
            itemDesejadoId: Number(itemDesejadoId),
            solicitanteId: usuario.id,
            donoId: desejado.donoId,
        },
    });

    return NextResponse.json(proposta);
}

export async function PATCH(request) {
    const usuario = await usuarioLogado();
    if (!usuario) return NextResponse.json({ erro: "Não autenticado." }, { status: 401 });

    const { id, status } = await request.json();

    const proposta = await prisma.proposta.findUnique({ where: { id: Number(id) } });
    if (!proposta || proposta.donoId !== usuario.id) {
        return NextResponse.json({ erro: "Sem permissão." }, { status: 403 });
    }

    const atualizada = await prisma.proposta.update({
        where: { id: Number(id) },
        data: { status },
    });

    if (status === "aceita") {
        await prisma.item.updateMany({
            where: { id: { in: [proposta.itemOferecidoId, proposta.itemDesejadoId] } },
            data: { status: "trocado" },
        });
    }

    return NextResponse.json(atualizada);
}