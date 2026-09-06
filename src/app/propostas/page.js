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
            <main className="mx-auto max-w-md px-5 pt-10 pb-24">
                <h1 className="mb-6 text-2xl font-bold">Trocas</h1>

                {propostas.length === 0 ? (
                    <p className="text-sm text-cinza">Nenhuma proposta por enquanto.</p>
                ) : (
                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">                        {propostas.map((p) => {
                        const souDono = p.donoId === usuario.id;

                        return (
                            <div key={p.id} className="rounded-2xl border border-gray-100 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-xs text-cinza">
                                        {souDono ? `${p.solicitante.nome} propôs` : "Você propôs"}
                                    </span>
                                    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${cores[p.status]}`}>
                                        {p.status}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <img src={p.itemOferecido.imagem} alt="" className="h-16 w-16 rounded-xl object-cover" />
                                    <span className="text-cinza">⇄</span>
                                    <img src={p.itemDesejado.imagem} alt="" className="h-16 w-16 rounded-xl object-cover" />
                                </div>

                                <p className="mt-2 text-xs text-cinza">
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