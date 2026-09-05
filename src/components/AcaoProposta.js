"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AcaoProposta({ id }) {
    const router = useRouter();
    const [ocupado, setOcupado] = useState(false);

    async function responder(status) {
        setOcupado(true);
        await fetch("/api/propostas", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status }),
        });
        setOcupado(false);
        router.refresh();
    }

    return (
        <div className="mt-3 flex gap-2">
            <button
                onClick={() => responder("aceita")}
                disabled={ocupado}
                className="flex-1 rounded-full bg-azul py-2 text-sm font-semibold text-white disabled:opacity-50"
            >
                Aceitar
            </button>
            <button
                onClick={() => responder("recusada")}
                disabled={ocupado}
                className="flex-1 rounded-full border border-gray-200 py-2 text-sm font-semibold text-cinza disabled:opacity-50"
            >
                Recusar
            </button>
        </div>
    );
}