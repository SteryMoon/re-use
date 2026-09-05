"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AcoesItem({ item, souDono, jaFavoritado, meusItens }) {
    const router = useRouter();
    const [salvo, setSalvo] = useState(jaFavoritado);
    const [escolhendo, setEscolhendo] = useState(false);
    const [aviso, setAviso] = useState("");

    async function favoritar() {
        await fetch("/api/favoritos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemId: item.id }),
        });
        setSalvo(!salvo);
        router.refresh();
    }

    async function propor(itemOferecidoId) {
        await fetch("/api/propostas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemOferecidoId, itemDesejadoId: item.id }),
        });
        setEscolhendo(false);
        router.push("/propostas");
    }

    async function conversar() {
        const res = await fetch("/api/conversas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ outroId: item.donoId }),
        });
        const dados = await res.json();
        router.push(`/chat/${dados.id}`);
    }

    if (souDono) {
        return <p className="mt-6 text-center text-sm text-cinza">Este item é seu.</p>;
    }

    return (
        <div className="mt-6 space-y-3">
            <div className="flex gap-3">
                <button
                    onClick={favoritar}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border ${salvo ? "border-azul text-azul" : "border-gray-200 text-cinza"
                        }`}
                >
                    {salvo ? "♥" : "♡"}
                </button>

                <button
                    onClick={() => {
                        if (!meusItens.length) return setAviso("Anuncie um item antes de propor uma troca.");
                        setEscolhendo(!escolhendo);
                    }}
                    className="flex-1 rounded-full bg-azul py-3 font-semibold text-white"
                >
                    Propor troca
                </button>
            </div>

            <button
                onClick={conversar}
                className="w-full rounded-full border border-gray-200 py-3 text-sm font-semibold text-cinza"
            >
                Conversar
            </button>

            {aviso && <p className="text-sm text-red-500">{aviso}</p>}

            {escolhendo && (
                <div className="rounded-2xl border border-gray-100 p-4">
                    <p className="mb-3 text-sm font-medium">O que você oferece?</p>
                    <div className="space-y-2">
                        {meusItens.map((meu) => (
                            <button
                                key={meu.id}
                                onClick={() => propor(meu.id)}
                                className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-cinza-bg"
                            >
                                <img src={meu.imagem} alt="" className="h-12 w-12 rounded-lg object-cover" />
                                <span className="text-sm">{meu.titulo}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}