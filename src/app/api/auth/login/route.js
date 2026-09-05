import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { criarSessao } from "@/lib/session";

export async function POST(request) {
    const { email, senha } = await request.json();

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return NextResponse.json({ erro: "E-mail ou senha inválidos." }, { status: 401 });
    }

    await criarSessao(usuario.id);
    return NextResponse.json({ id: usuario.id, nome: usuario.nome });
}