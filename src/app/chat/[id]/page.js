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
        <div className="mx-auto flex h-screen max-w-md flex-col md:mt-28 md:h-[calc(100vh-9rem)] md:max-w-4xl md:rounded-3xl md:border md:border-gray-100">
            <header className="flex items-center gap-3 border-b border-gray-100 px-5 py-4 md:gap-5 md:px-8 md:py-6">
                <Link
                    href="/chat"
                    className="flex h-9 w-9 items-center justify-center rounded-full text-cinza hover:bg-cinza-bg md:h-12 md:w-12 md:text-2xl"
                >
                    ←
                </Link>
                <img src={outro.avatar} alt="" className="h-9 w-9 rounded-full object-cover md:h-14 md:w-14" />
                <p className="font-semibold md:text-2xl">{outro.nome}</p>
            </header>

            <div className="flex-1 space-y-2 overflow-y-auto px-5 py-4 md:space-y-3 md:px-8 md:py-6">
                {conversa.mensagens.map((m) => (
                    <Bolha key={m.id} mensagem={m} minha={m.autorId === usuario.id} />
                ))}
            </div>

            <FormMensagem conversaId={conversa.id} />
        </div>
    );
}