"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BotaoPausar({ temAtivos }) {
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const acao = temAtivos ? "pausar" : "reativar";

    async function executar() {
        setCarregando(true);
        try {
            const resposta = await fetch("/api/bot/anuncios/status", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ acao }),
            });
            const dados = await resposta.json();
            if (dados.ok) router.refresh();
        } finally {
            setCarregando(false);
        }
    }

    return (
        <button
            onClick={executar}
            disabled={carregando}
            className="mt-4 w-full rounded-2xl bg-cinza-bg py-3 text-sm font-medium disabled:opacity-50"
        >
            {carregando ? "Aguarde..." : temAtivos ? "Pausar todos os anúncios" : "Reativar todos os anúncios"}
        </button>
    );
}