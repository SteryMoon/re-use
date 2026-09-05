import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";
import LinhaStories from "@/components/LinhaStories";
import Categorias from "@/components/Categorias";
import CardItem from "@/components/CardItem";

export default async function Vitrine() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const [stories, categorias, itens] = await Promise.all([
        prisma.story.findMany({
            where: { expiraEm: { gt: new Date() } },
            include: { autor: true },
            orderBy: { criadoEm: "desc" },
        }),
        prisma.categoria.findMany({ orderBy: { nome: "asc" } }),
        prisma.item.findMany({
            where: { status: "disponivel" },
            include: { categoria: true },
            orderBy: { criadoEm: "desc" },
        }),
    ]);

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-8 pb-24">
                <header className="mb-6 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-cinza">Olá,</p>
                        <h1 className="text-2xl font-bold">{usuario.nome.split(" ")[0]}!</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/novo"
                            className="flex h-11 w-11 items-center justify-center rounded-full bg-azul text-xl text-white"
                        >
                            +
                        </Link>
                        <img
                            src={usuario.avatar}
                            alt={usuario.nome}
                            className="h-11 w-11 rounded-full object-cover"
                        />
                    </div>
                </header>

                <LinhaStories stories={stories} />
                <Categorias categorias={categorias} />

                <section>
                    <h2 className="mb-3 font-semibold">Disponíveis para troca</h2>
                    {itens.length === 0 ? (
                        <p className="text-sm text-cinza">
                            Nenhum item ainda. Rode o seed para popular o banco.
                        </p>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            {itens.map((item) => (
                                <CardItem key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <TabBar />
        </>
    );
}