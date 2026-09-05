export default function Categorias({ categorias }) {
    return (
        <section className="mb-6">
            <h2 className="mb-3 font-semibold">Categorias</h2>
            <div className="flex gap-3 overflow-x-auto pb-1">
                {categorias.map((cat) => (
                    <div
                        key={cat.id}
                        className="flex w-20 shrink-0 flex-col items-center gap-1 rounded-2xl bg-cinza-bg py-3"
                    >
                        <span className="text-xl">{cat.icone}</span>
                        <span className="text-[11px] text-cinza">{cat.nome}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}