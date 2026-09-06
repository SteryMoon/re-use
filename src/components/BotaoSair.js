"use client";

import { useRouter } from "next/navigation";

export default function BotaoSair() {
    const router = useRouter();

    async function sair() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
        router.refresh();
    }

    return (
        <button
            onClick={sair}
            className="mt-8 w-full rounded-full border border-gray-200 py-3 text-sm font-semibold text-cinza md:mx-auto md:block md:w-64"
        >
            Sair da conta
        </button>
    );
}