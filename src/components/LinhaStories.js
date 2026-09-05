import Link from "next/link";

export default function LinhaStories({ stories }) {
    if (!stories.length) return null;

    return (
        <section className="mb-6">
            <h2 className="mb-3 font-semibold">Stories</h2>
            <div className="flex gap-4 overflow-x-auto pb-1">
                {stories.map((story) => (
                    <Link
                        key={story.id}
                        href={`/stories/${story.id}`}
                        className="flex w-16 shrink-0 flex-col items-center gap-1"
                    >
                        <div className="rounded-full bg-gradient-to-tr from-azul to-pink-400 p-[2px]">
                            <img
                                src={story.autor.avatar}
                                alt={story.autor.nome}
                                className="h-14 w-14 rounded-full border-2 border-white object-cover"
                            />
                        </div>
                        <span className="truncate text-[11px] text-cinza">
                            {story.autor.nome.split(" ")[0]}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}