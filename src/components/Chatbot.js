"use client";

import Script from "next/script";
import { useState, useEffect } from "react";

export default function Chatbot() {
    const [pronto, setPronto] = useState(false);

    useEffect(() => {
        if (!pronto) return;

        const timer = setInterval(() => {
            if (!window.botpress?.on) return;
            clearInterval(timer);

            window.botpress.on("*", async (evento) => {
                if (evento?.type !== "message") return;
                const texto = evento?.payload?.text || "";
                const encontrado = texto.match(/\[\[ACAO:(\w+)\]\]/);
                if (!encontrado) return;

                const acao = encontrado[1];

                try {
                    const resposta = await fetch("/api/bot/anuncios/status", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ acao }),
                    });
                    const dados = await resposta.json();

                    if (dados.ok) {
                        window.botpress.sendMessage(
                            `Pronto! ${dados.quantidade} anúncio(s) ${acao === "pausar" ? "pausado(s)" : "reativado(s)"}.`
                        );
                    } else {
                        window.botpress.sendMessage("Não consegui concluir. Tente pelo seu perfil.");
                    }
                } catch {
                    window.botpress.sendMessage("Não consegui concluir. Tente pelo seu perfil.");
                }
            });
        }, 300);

        return () => clearInterval(timer);
    }, [pronto]);

    return (
        <>
            <Script
                src="https://cdn.botpress.cloud/webchat/v5.0/inject.js"
                strategy="afterInteractive"
                onReady={() => setPronto(true)}
            />
            {pronto && (
                <Script
                    src="https://files.bpcontent.cloud/2026/09/22/23/20260922230652-65DFKIKW.js"
                    strategy="afterInteractive"
                />
            )}
        </>
    );
}