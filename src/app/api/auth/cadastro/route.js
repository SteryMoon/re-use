import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { criarSessao } from "@/lib/session";

export async function POST(request) {
    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
        return NextResponse.json({ erro: "Preencha todos os campos." }, { status: 400 });
    }

    const existente = await prisma.usuario.findUnique({ where: { email } });
    if (existente) {
        return NextResponse.json({ erro: "Este e-mail já está cadastrado." }, { status: 409 });
    }

    const usuario = await prisma.usuario.create({
        data: {
            nome,
            email,
            senha: await bcrypt.hash(senha, 10),
            avatar: `https://i.pravatar.cc/150?u=${email}`,
        },
    });

    await criarSessao(usuario.id);
    return NextResponse.json({ id: usuario.id, nome: usuario.nome });
}