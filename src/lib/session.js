import { cookies } from "next/headers";
import { prisma } from "./prisma";

export async function criarSessao(usuarioId) {
    const cookieStore = await cookies();
    cookieStore.set("reuse_sessao", String(usuarioId), {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    });
}

export async function usuarioLogado() {
    const cookieStore = await cookies();
    const id = cookieStore.get("reuse_sessao")?.value;
    if (!id) return null;

    return prisma.usuario.findUnique({
        where: { id: Number(id) },
        select: { id: true, nome: true, email: true, avatar: true, bio: true, cidade: true },
    });
}

export async function encerrarSessao() {
    const cookieStore = await cookies();
    cookieStore.delete("reuse_sessao");
}