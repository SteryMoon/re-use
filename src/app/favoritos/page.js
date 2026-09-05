import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";
import CardItem from "@/components/CardItem";

export default async function Favoritos() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const favoritos = await prisma.favorito.findMany({
        where: { usuarioId: usuario.id },
        include: { item: { include: { categoria: true } } },
    });

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-10 pb-24">
                <h1 className="mb-6 text-2xl font-bold">Salvos</h1>

                {favoritos.length === 0 ? (
                    <p className="text-sm text-cinza">
                        Você ainda não salvou nenhum item. Toque no coração de um anúncio.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {favoritos.map((fav) => (
                            <CardItem key={fav.id} item={fav.item} />
                        ))}
                    </div>
                )}
            </main>

            <TabBar />
        </>
    );
}