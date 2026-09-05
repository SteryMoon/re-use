import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function VerStory({ params }) {
    const { id } = await params;

    const story = await prisma.story.findUnique({
        where: { id: Number(id) },
        include: { autor: true },
    });

    if (!story) notFound();

    return (
        <div className="relative mx-auto h-screen max-w-md bg-black">
            <img src={story.imagem} alt="" className="h-full w-full object-cover opacity-90" />

            <div className="absolute inset-x-0 top-0 p-4">
                <div className="mb-3 h-1 rounded-full bg-white/70" />
                <div className="flex items-center gap-3">
                    <img src={story.autor.avatar} alt="" className="h-9 w-9 rounded-full border-2 border-white object-cover" />
                    <span className="text-sm font-medium text-white">{story.autor.nome}</span>
                    <Link href="/vitrine" className="ml-auto text-xl text-white">×</Link>
                </div>
            </div>

            {story.texto && (
                <p className="absolute inset-x-0 bottom-20 px-6 text-center text-lg font-semibold text-white">
                    {story.texto}
                </p>
            )}
        </div>
    );
}