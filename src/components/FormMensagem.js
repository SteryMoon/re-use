"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormMensagem({ conversaId }) {
    const router = useRouter();
    const [texto, setTexto] = useState("");

    async function enviar() {
        if (!texto.trim()) return;

        await fetch("/api/mensagens", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ conversaId, conteudo: texto }),
        });

        setTexto("");
        router.refresh();
    }

    return (
        <div className="flex gap-2 border-t border-gray-100 px-5 py-3">
            <input
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && enviar()}
                placeholder="Mensagem"
                className="flex-1 rounded-full bg-cinza-bg px-4 py-3 text-sm outline-none"
            />
            <button
                onClick={enviar}
                className="rounded-full bg-azul px-5 text-sm font-semibold text-white"
            >
                Enviar
            </button>
        </div>
    );
}