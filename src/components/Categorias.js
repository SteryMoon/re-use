import Link from "next/link";

export default function Categorias({ categorias, ativa }) {
    const visiveis = categorias.slice(0, 6);

    return (
        <section className="mb-6 md:mb-10">
            <h2 className="mb-3 font-semibold md:mb-5 md:text-xl">Categorias</h2>

            <div className="flex gap-3 overflow-x-auto pb-1 md:gap-5">
                {ativa && (
                    <Link
                        href="/vitrine"
                        className="flex w-20 shrink-0 flex-col items-center gap-1 rounded-2xl border-2 border-azul bg-white py-3 md:w-36 md:gap-3 md:rounded-3xl md:py-7"
                    >
                        <span className="text-xl md:text-4xl">✖️</span>
                        <span className="text-[11px] text-azul md:text-base">Limpar</span>
                    </Link>
                )}

                {visiveis.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/vitrine?categoria=${cat.id}`}
                        className={`flex w-20 shrink-0 flex-col items-center gap-1 rounded-2xl py-3 md:w-36 md:gap-3 md:rounded-3xl md:py-7 ${ativa === cat.id ? "bg-azul-suave" : "bg-cinza-bg"
                            }`}
                    >
                        <span className="text-xl md:text-4xl">{cat.icone}</span>
                        <span className={`text-[11px] md:text-base ${ativa === cat.id ? "text-azul" : "text-cinza"}`}>
                            {cat.nome}
                        </span>
                    </Link>
                ))}

                <Link
                    href="/categorias"
                    className="flex w-20 shrink-0 flex-col items-center gap-1 rounded-2xl bg-cinza-bg py-3 md:w-36 md:gap-3 md:rounded-3xl md:py-7"
                >
                    <span className="text-xl md:text-4xl">📦</span>
                    <span className="text-[11px] text-cinza md:text-base">Ver mais</span>
                </Link>
            </div>
        </section>
    );
}