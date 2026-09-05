import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import Bolha from "@/components/Bolha";
import FormMensagem from "@/components/FormMensagem";

export default async function Conversa({ params }) {
    const { id } = await params;
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const conversa = await prisma.conversa.findUnique({
        where: { id: Number(id) },
        include: {
            usuarioA: true,
            usuarioB: true,
            mensagens: { orderBy: { criadoEm: "asc" } },
        },
    });

    if (!conversa) notFound();
    if (conversa.usuarioAId !== usuario.id && conversa.usuarioBId !== usuario.id) {
        redirect("/chat");
    }

    const outro = conversa.usuarioAId === usuario.id ? conversa.usuarioB : conversa.usuarioA;

    return (
        <div className="mx-auto flex h-screen max-w-md flex-col">
            <header className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
                <Link href="/chat" className="text-cinza">←</Link>
                <img src={outro.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
                <p className="font-semibold">{outro.nome}</p>
            </header>

            <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4">
                {conversa.mensagens.map((m) => (
                    <Bolha key={m.id} mensagem={m} minha={m.autorId === usuario.id} />
                ))}
            </div>

            <FormMensagem conversaId={conversa.id} />
        </div>
    );
}