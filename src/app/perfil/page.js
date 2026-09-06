import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";
import CardItem from "@/components/CardItem";
import BotaoSair from "@/components/BotaoSair";

export default async function Perfil() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const [itens, totalTrocas, totalFavoritos] = await Promise.all([
        prisma.item.findMany({
            where: { donoId: usuario.id },
            include: { categoria: true },
            orderBy: { criadoEm: "desc" },
        }),
        prisma.proposta.count({
            where: { OR: [{ donoId: usuario.id }, { solicitanteId: usuario.id }], status: "aceita" },
        }),
        prisma.favorito.count({ where: { usuarioId: usuario.id } }),
    ]);

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-10 pb-24 md:max-w-none md:px-12 md:pt-36 md:pb-16">
                <div className="flex flex-col items-center">
                    <img
                        src={usuario.avatar}
                        alt={usuario.nome}
                        className="h-24 w-24 rounded-full object-cover md:h-40 md:w-40"
                    />
                    <h1 className="mt-3 text-xl font-bold md:mt-5 md:text-4xl">{usuario.nome}</h1>
                    <p className="text-sm text-cinza md:text-lg">{usuario.cidade || "Sem cidade"}</p>
                    {usuario.bio && <p className="mt-2 text-center text-sm md:text-base">{usuario.bio}</p>}
                </div>

                <div className="my-6 grid grid-cols-3 gap-3 rounded-2xl bg-cinza-bg py-4 text-center md:mx-auto md:my-10 md:max-w-2xl md:rounded-3xl md:py-8">
                    <div>
                        <p className="text-lg font-bold md:text-3xl">{itens.length}</p>
                        <p className="text-[11px] text-cinza md:text-sm">Anúncios</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold md:text-3xl">{totalTrocas}</p>
                        <p className="text-[11px] text-cinza md:text-sm">Trocas</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold md:text-3xl">{totalFavoritos}</p>
                        <p className="text-[11px] text-cinza md:text-sm">Salvos</p>
                    </div>
                </div>

                <h2 className="mb-3 font-semibold md:mb-5 md:text-xl">Meus itens</h2>
                {itens.length === 0 ? (
                    <p className="text-sm text-cinza">Você ainda não anunciou nada.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {itens.map((item) => (
                            <CardItem key={item.id} item={item} />
                        ))}
                    </div>
                )}

                <BotaoSair />
            </main>

            <TabBar usuario={usuario} />
        </>
    );
}