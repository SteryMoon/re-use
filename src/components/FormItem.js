"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Campo from "@/components/Campo";

export default function FormItem({ categorias }) {
    const router = useRouter();
    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        imagem: "",
        condicao: "seminovo",
        categoriaId: categorias[0]?.id || "",
    });
    const [erro, setErro] = useState("");
    const [enviando, setEnviando] = useState(false);

    function mudar(campo) {
        return (e) => setForm({ ...form, [campo]: e.target.value });
    }

    async function publicar() {
        setEnviando(true);
        setErro("");

        const res = await fetch("/api/itens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const dados = await res.json().catch(() => ({}));
        setEnviando(false);

        if (!res.ok) return setErro(dados.erro || `Erro ${res.status}`);
        router.push("/vitrine");
        router.refresh();
    }

    return (
        <>
            <Campo label="Título" value={form.titulo} onChange={mudar("titulo")} />

            <label className="mb-4 block">
                <span className="text-sm text-cinza">Descrição</span>
                <textarea
                    value={form.descricao}
                    onChange={mudar("descricao")}
                    rows={3}
                    className="mt-1 w-full resize-none rounded-xl bg-cinza-bg px-4 py-3 outline-none focus:ring-2 focus:ring-azul"
                />
            </label>

            <Campo
                label="URL da imagem"
                value={form.imagem}
                onChange={mudar("imagem")}
                placeholder="https://..."
            />

            {form.imagem && (
                <img
                    src={form.imagem}
                    alt="Prévia"
                    className="mb-4 h-40 w-full rounded-2xl object-cover"
                />
            )}

            <label className="mb-4 block">
                <span className="text-sm text-cinza">Estado</span>
                <select
                    value={form.condicao}
                    onChange={mudar("condicao")}
                    className="mt-1 w-full rounded-xl bg-cinza-bg px-4 py-3 outline-none focus:ring-2 focus:ring-azul"
                >
                    <option value="novo">Novo</option>
                    <option value="seminovo">Seminovo</option>
                    <option value="usado">Usado</option>
                </select>
            </label>

            <label className="mb-6 block">
                <span className="text-sm text-cinza">Categoria</span>
                <select
                    value={form.categoriaId}
                    onChange={mudar("categoriaId")}
                    className="mt-1 w-full rounded-xl bg-cinza-bg px-4 py-3 outline-none focus:ring-2 focus:ring-azul"
                >
                    {categorias.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.icone} {c.nome}
                        </option>
                    ))}
                </select>
            </label>

            {erro && <p className="mb-4 text-sm text-red-500">{erro}</p>}

            <button
                onClick={publicar}
                disabled={enviando}
                className="w-full rounded-full bg-azul py-4 font-semibold text-white disabled:opacity-50"
            >
                {enviando ? "Publicando..." : "Publicar"}
            </button>
        </>
    );
    function mudar(campo) {
        return (e) => {
            console.log("mudou", campo, e.target.value);
            setForm({ ...form, [campo]: e.target.value });
        };
    }
}