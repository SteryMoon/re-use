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

export default function TabBar({ usuario }) {
    const caminho = usePathname();

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-100 bg-white md:top-0 md:bottom-auto md:border-t-0 md:border-b">
            <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2 md:max-w-none md:justify-end md:gap-2 md:px-12 md:py-6">
                <Link href="/vitrine" className="mr-auto hidden md:block">
                    <img src="/ReUse.svg" alt="ReUse!" className="h-10 w-auto" />
                </Link>

                {abas.map((aba) => {
                    const ativa = caminho === aba.href || caminho.startsWith(aba.href + "/");

                    return (
                        <Link
                            key={aba.href}
                            href={aba.href}
                            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-1 text-[10px] md:flex-none md:flex-row md:gap-2 md:rounded-full md:px-5 md:py-3 md:text-base ${ativa
                                ? "text-azul md:bg-azul-suave"
                                : "text-cinza md:hover:bg-cinza-bg"
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
                                className="md:h-6 md:w-6"
                            >
                                <path d={aba.icone} />
                            </svg>
                            {aba.label}
                        </Link>
                    );
                })}

                {usuario && (
                    <div className="ml-6 hidden items-center gap-4 md:flex">
                        <Link
                            href="/novo"
                            className="rounded-full bg-azul px-9 py-4 text-lg font-semibold text-white"
                        >
                            + Anunciar
                        </Link>
                        <img
                            src={usuario.avatar}
                            alt={usuario.nome}
                            className="h-14 w-14 rounded-full object-cover"
                        />
                    </div>
                )}
            </div>
        </nav>
    );
}