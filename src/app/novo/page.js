import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { usuarioLogado } from "@/lib/session";
import FormItem from "@/components/FormItem";

export default async function NovoItem() {
    const usuario = await usuarioLogado();
    if (!usuario) redirect("/login");

    const categorias = await prisma.categoria.findMany({ orderBy: { nome: "asc" } });

    return (
        <main className="mx-auto max-w-md px-5 pt-10 pb-10">
            <h1 className="mb-6 text-2xl font-bold">Novo anúncio</h1>
            <FormItem categorias={categorias} />
        </main>
    );
}