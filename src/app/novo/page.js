import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import FormItem from "@/components/FormItem";
import TabBar from "@/components/TabBar";

export default async function NovoItem() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const categorias = await prisma.categoria.findMany({ orderBy: { nome: "asc" } });

    return (
        <>
            <main className="mx-auto max-w-md px-5 pt-10 pb-24 md:max-w-2xl md:px-12 md:pt-36 md:pb-16">
                <h1 className="mb-6 text-2xl font-bold md:mb-8 md:text-4xl">Novo anúncio</h1>
                <FormItem categorias={categorias} />
            </main>

            <TabBar usuario={usuario} />
        </>
    );
}