"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Blobs from "@/components/Blobs";
import Campo from "@/components/Campo";

export default function Login() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", senha: "" });
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar() {
        setCarregando(true);
        setErro("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const dados = await res.json().catch(() => ({}));
            setCarregando(false);

            if (!res.ok) return setErro(dados.erro || `Erro ${res.status}`);
            router.push("/vitrine");
        } catch {
            setCarregando(false);
            setErro("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <main className="relative min-h-screen overflow-hidden px-6 pt-40 pb-10">
            <Blobs />

            <h1 className="text-4xl font-bold">Login</h1>
            <p className="mt-1 mb-8 text-cinza">Que bom te ver de novo 💙</p>

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
                onClick={entrar}
                disabled={carregando}
                className="w-full rounded-full bg-azul py-4 font-semibold text-white disabled:opacity-50"
            >
                {carregando ? "Entrando..." : "Entrar"}
            </button>

            <p className="mt-6 text-center text-sm text-cinza">
                Não tem conta?{" "}
                <Link href="/cadastro" className="font-semibold text-azul">
                    Cadastre-se
                </Link>
            </p>
        </main>
    );
}