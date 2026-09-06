import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";

export default async function TodasCategorias() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const categorias = await prisma.categoria.findMany({
        orderBy: { nome: "asc" },
        include: { _count: { select: { itens: true } } },
    });

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-10 pb-24 md:max-w-5xl md:px-12 md:pt-36 md:pb-16">
                <h1 className="mb-6 text-2xl font-bold md:mb-8 md:text-4xl">Categorias</h1>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 md:gap-6">
                    {categorias.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/vitrine?categoria=${cat.id}`}
                            className="flex flex-col items-center gap-2 rounded-2xl bg-cinza-bg py-6 hover:bg-azul-suave md:gap-3 md:rounded-3xl md:py-10"
                        >
                            <span className="text-3xl md:text-5xl">{cat.icone}</span>
                            <span className="font-medium md:text-lg">{cat.nome}</span>
                            <span className="text-xs text-cinza md:text-sm">
                                {cat._count.itens} {cat._count.itens === 1 ? "item" : "itens"}
                            </span>
                        </Link>
                    ))}
                </div>
            </main>

            <TabBar usuario={usuario} />
        </>
    );
}