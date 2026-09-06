import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";

export default async function ListaChat() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const conversas = await prisma.conversa.findMany({
        where: { OR: [{ usuarioAId: usuario.id }, { usuarioBId: usuario.id }] },
        include: {
            usuarioA: true,
            usuarioB: true,
            mensagens: { orderBy: { criadoEm: "desc" }, take: 1 },
        },
        orderBy: { criadoEm: "desc" },
    });

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-10 pb-24">
                <h1 className="mb-6 text-2xl font-bold">Mensagens</h1>

                {conversas.length === 0 ? (
                    <p className="text-sm text-cinza">
                        Nenhuma conversa ainda. Abra um item e toque em Conversar.
                    </p>
                ) : (
                    <div className="space-y-1">
                        {conversas.map((c) => {
                            const outro = c.usuarioAId === usuario.id ? c.usuarioB : c.usuarioA;
                            const ultima = c.mensagens[0];

                            return (
                                <Link
                                    key={c.id}
                                    href={`/chat/${c.id}`}
                                    className="flex items-center gap-3 rounded-2xl p-3 hover:bg-cinza-bg"
                                >
                                    <img src={outro.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-medium">{outro.nome}</p>
                                        <p className="truncate text-xs text-cinza">
                                            {ultima ? ultima.conteudo : "Diga oi!"}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </main>

            <TabBar usuario={usuario} />
        </>
    );
}