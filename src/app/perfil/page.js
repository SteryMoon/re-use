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
            <main className="mx-auto max-w-md px-5 pt-10 pb-24">
                <div className="flex flex-col items-center">
                    <img
                        src={usuario.avatar}
                        alt={usuario.nome}
                        className="h-24 w-24 rounded-full object-cover"
                    />
                    <h1 className="mt-3 text-xl font-bold">{usuario.nome}</h1>
                    <p className="text-sm text-cinza">{usuario.cidade || "Sem cidade"}</p>
                    {usuario.bio && <p className="mt-2 text-center text-sm">{usuario.bio}</p>}
                </div>

                <div className="my-6 grid grid-cols-3 gap-3 rounded-2xl bg-cinza-bg py-4 text-center">
                    <div>
                        <p className="text-lg font-bold">{itens.length}</p>
                        <p className="text-[11px] text-cinza">Anúncios</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{totalTrocas}</p>
                        <p className="text-[11px] text-cinza">Trocas</p>
                    </div>
                    <div>
                        <p className="text-lg font-bold">{totalFavoritos}</p>
                        <p className="text-[11px] text-cinza">Salvos</p>
                    </div>
                </div>

                <h2 className="mb-3 font-semibold">Meus itens</h2>
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