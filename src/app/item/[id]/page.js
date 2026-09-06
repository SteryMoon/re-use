import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import AcoesItem from "@/components/AcoesItem";

export default async function DetalheItem({ params }) {
    const { id } = await params;
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const item = await prisma.item.findUnique({
        where: { id: Number(id) },
        include: { dono: true, categoria: true },
    });

    if (!item) notFound();

    const favorito = await prisma.favorito.findUnique({
        where: { usuarioId_itemId: { usuarioId: usuario.id, itemId: item.id } },
    });

    const meusItens = await prisma.item.findMany({
        where: { donoId: usuario.id, status: "disponivel" },
    });

    return (
        <main className="mx-auto max-w-md pb-10 md:max-w-5xl md:px-8 md:pt-24">
            <div className="md:flex md:gap-10">
                <div className="relative md:w-1/2">
                    <img
                        src={item.imagem}
                        alt={item.titulo}
                        className="h-80 w-full object-cover md:h-[420px] md:rounded-3xl"
                    />
                    <Link
                        href="/vitrine"
                        className="absolute top-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white md:hidden"
                    >
                        ←
                    </Link>
                </div>

                <div className="px-5 pt-5 md:w-1/2 md:px-0 md:pt-0">
                    <span className="rounded-full bg-azul-suave px-3 py-1 text-xs text-azul">
                        {item.categoria.nome}
                    </span>

                    <h1 className="mt-3 text-2xl font-bold md:text-3xl">{item.titulo}</h1>
                    <p className="text-sm text-cinza">Estado: {item.condicao}</p>
                    <p className="mt-3 text-sm">{item.descricao}</p>

                    <div className="mt-6 flex items-center gap-3 rounded-2xl bg-cinza-bg p-4">
                        <img src={item.dono.avatar} alt="" className="h-12 w-12 rounded-full object-cover" />
                        <div>
                            <p className="font-medium">{item.dono.nome}</p>
                            <p className="text-xs text-cinza">{item.dono.cidade || "Brasil"}</p>
                        </div>
                    </div>

                    <AcoesItem
                        item={item}
                        souDono={item.donoId === usuario.id}
                        jaFavoritado={Boolean(favorito)}
                        meusItens={meusItens}
                    />
                </div>
            </div>
        </main>
    );
}