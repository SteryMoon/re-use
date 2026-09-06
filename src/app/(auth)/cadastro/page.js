"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Blobs from "@/components/Blobs";
import Campo from "@/components/Campo";

export default function Cadastro() {
    const router = useRouter();
    const [form, setForm] = useState({ nome: "", email: "", senha: "" });
    const [erro, setErro] = useState("");

    async function cadastrar() {
        try {
            const res = await fetch("/api/auth/cadastro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const dados = await res.json().catch(() => ({}));

            if (!res.ok) return setErro(dados.erro || `Erro ${res.status}`);
            router.push("/vitrine");
        } catch {
            setErro("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <div className="md:flex md:min-h-screen md:items-center md:justify-center md:bg-cinza-bg">
            <main className="relative min-h-screen overflow-hidden px-6 pt-40 pb-10 md:min-h-0 md:w-[420px] md:rounded-3xl md:bg-white md:px-8 md:pt-32 md:pb-12 md:shadow-xl">
                <Blobs />

                <h1 className="text-4xl leading-tight font-bold">
                    Criar conta
                </h1>
                <p className="mt-1 mb-8 text-cinza">Comece a trocar hoje mesmo</p>

                <Campo
                    label="Nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
                <Campo
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <Campo
                    label="Senha"
                    type="password"
                    value={form.senha}
                    onChange={(e) => setForm({ ...form, senha: e.target.value })}
                />

                {erro && <p className="mb-4 text-sm text-red-500">{erro}</p>}

                <button
                    onClick={cadastrar}
                    className="w-full rounded-full bg-azul py-4 font-semibold text-white"
                >
                    Concluir
                </button>

                <p className="mt-6 text-center text-sm text-cinza">
                    Já tem conta?{" "}
                    <Link href="/login" className="font-semibold text-azul">
                        Entrar
                    </Link>
                </p>
            </main>
        </div>
            );
}