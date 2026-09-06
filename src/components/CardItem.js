import Link from "next/link";

export default function CardItem({ item }) {
    return (
        <Link href={`/item/${item.id}`} className="block">
            <div className="aspect-square overflow-hidden rounded-2xl bg-cinza-bg">
                <img
                    src={item.imagem}
                    alt={item.titulo}
                    className="h-full w-full object-cover"
                />
            </div>
            <p className="mt-2 truncate text-sm font-medium md:mt-3 md:text-lg">{item.titulo}</p>
            <p className="text-xs text-cinza md:text-sm">{item.categoria.nome}</p>
        </Link>
    );
}