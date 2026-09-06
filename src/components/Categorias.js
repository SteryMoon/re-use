export default function Categorias({ categorias }) {
    return (
        <section className="mb-6 md:mb-10">
            <h2 className="mb-3 font-semibold md:mb-5 md:text-xl">Categorias</h2>
            <div className="flex gap-3 overflow-x-auto pb-1 md:gap-5">
                {categorias.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex w-20 shrink-0 flex-col items-center gap-1 rounded-2xl bg-cinza-bg py-3 md:w-36 md:gap-3 md:rounded-3xl md:py-7"
                    >
                        <span className="text-xl md:text-4xl">{cat.icone}</span>
                        <span className="text-[11px] text-cinza md:text-base">{cat.nome}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}