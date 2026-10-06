import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";
import CardItem from "@/components/CardItem";

export default async function Buscar({ searchParams }) {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const params = await searchParams;
    const termo = params?.q || "";

    const itens = termo
        ? await prisma.item.findMany({
              where: {
                  status: "disponivel",
                  titulo: { contains: termo, mode: "insensitive" },
              },
              include: { categoria: true },
              orderBy: { criadoEm: "desc" },
          })
        : [];

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-8 pb-24 md:max-w-none md:px-12 md:pt-36 md:pb-16">
                <h1 className="text-2xl font-bold md:text-4xl">
                    {termo ? `Resultados para "${termo}"` : "Buscar itens"}
                </h1>

                {!termo ? (
                    <p className="mt-4 text-sm text-cinza">Digite o que você procura no chat do assistente.</p>
                ) : itens.length === 0 ? (
                    <p className="mt-4 text-sm text-cinza">
                        Nenhum item encontrado. Tente outra palavra ou explore a vitrine.
                    </p>
                ) : (
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-6">
                        {itens.map((item) => (
                            <CardItem key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </main>

            <TabBar usuario={usuario} />
        </>
    );
}