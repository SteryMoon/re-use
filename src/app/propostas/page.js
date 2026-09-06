import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import TabBar from "@/components/TabBar";
import AcaoProposta from "@/components/AcaoProposta";

const cores = {
    pendente: "bg-amber-100 text-amber-700",
    aceita: "bg-green-100 text-green-700",
    recusada: "bg-red-100 text-red-700",
};

export default async function Propostas() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const propostas = await prisma.proposta.findMany({
        where: { OR: [{ donoId: usuario.id }, { solicitanteId: usuario.id }] },
        include: {
            itemOferecido: true,
            itemDesejado: true,
            solicitante: true,
        },
        orderBy: { criadoEm: "desc" },
    });

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-10 pb-24 md:max-w-5xl md:px-12 md:pt-36 md:pb-16">
                <h1 className="mb-6 text-2xl font-bold md:mb-8 md:text-4xl">Trocas</h1>

                {propostas.length === 0 ? (
                    <div className="flex justify-center py-16 md:py-32">
                        <p className="text-center text-sm text-cinza md:text-lg">
                            Nenhuma proposta por enquanto.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0 xl:grid-cols-3">
                        {propostas.map((p) => {
                            const souDono = p.donoId === usuario.id;

                            return (
                                <div key={p.id} className="rounded-2xl border border-gray-100 p-4 md:rounded-3xl md:p-6">
                                    <div className="mb-3 flex items-center justify-between md:mb-5">
                                        <span className="text-xs text-cinza md:text-sm">
                                            {souDono ? `${p.solicitante.nome} propôs` : "Você propôs"}
                                        </span>
                                        <span className={`rounded-full px-2 py-1 text-[10px] font-semibold md:px-3 md:py-1.5 md:text-xs ${cores[p.status]}`}>
                                            {p.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3 md:gap-5">
                                        <img src={p.itemOferecido.imagem} alt="" className="h-16 w-16 rounded-xl object-cover md:h-28 md:w-28 md:rounded-2xl" />
                                        <span className="text-cinza md:text-2xl">⇄</span>
                                        <img src={p.itemDesejado.imagem} alt="" className="h-16 w-16 rounded-xl object-cover md:h-28 md:w-28 md:rounded-2xl" />
                                    </div>

                                    <p className="mt-2 text-xs text-cinza md:mt-4 md:text-sm">
                                        {p.itemOferecido.titulo} por {p.itemDesejado.titulo}
                                    </p>

                                    {souDono && p.status === "pendente" && <AcaoProposta id={p.id} />}
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            <TabBar usuario={usuario} />
        </>
    );
}