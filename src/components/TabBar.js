"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const abas = [
    { href: "/vitrine", label: "Início", icone: "M3 10.5 12 3l9 7.5M5 9.5V20h14V9.5" },
    { href: "/favoritos", label: "Salvos", icone: "M12 20s-7-4.6-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5c0 4.9-7 9.5-7 9.5Z" },
    { href: "/propostas", label: "Trocas", icone: "M7 8h11l-3-3M17 16H6l3 3" },
    { href: "/chat", label: "Chat", icone: "M4 5h16v11H8l-4 3V5Z" },
    { href: "/perfil", label: "Perfil", icone: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21c0-4 3.6-6 8-6s8 2 8 6" },
];

export default function TabBar() {
    const caminho = usePathname();

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-100 bg-white">
            <div className="mx-auto flex max-w-md justify-around px-2 py-2">
                {abas.map((aba) => {
                    const ativa = caminho === aba.href || caminho.startsWith(aba.href + "/");

                    return (
                        <Link
                            key={aba.href}
                            href={aba.href}
                            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[10px] ${ativa ? "text-azul" : "text-cinza"
                                }`}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d={aba.icone} />
                            </svg>
                            {aba.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}