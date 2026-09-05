const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
    await prisma.categoria.createMany({
        data: [
            { nome: "Roupas", icone: "👕" },
            { nome: "Livros", icone: "📚" },
            { nome: "Eletrônicos", icone: "🎧" },
            { nome: "Casa", icone: "🏠" },
            { nome: "Esportes", icone: "⚽" },
            { nome: "Beleza", icone: "💄" },
        ],
    });

    const senha = await bcrypt.hash("123456", 10);

    const ana = await prisma.usuario.create({
        data: {
            nome: "Ana Souza",
            email: "ana@reuse.com",
            senha,
            cidade: "São Paulo",
            bio: "Troco mais do que compro.",
            avatar: "https://i.pravatar.cc/150?img=5",
        },
    });

    const bruno = await prisma.usuario.create({
        data: {
            nome: "Bruno Lima",
            email: "bruno@reuse.com",
            senha,
            cidade: "Santo André",
            avatar: "https://i.pravatar.cc/150?img=12",
        },
    });

    await prisma.item.createMany({
        data: [
            {
                titulo: "Jaqueta jeans oversized",
                descricao: "Tamanho M, usada 3 vezes.",
                imagem: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600",
                condicao: "seminovo",
                donoId: ana.id,
                categoriaId: 1,
            },
            {
                titulo: "Fone bluetooth",
                descricao: "Bateria boa, acompanha o case.",
                imagem: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
                condicao: "usado",
                donoId: bruno.id,
                categoriaId: 3,
            },
            {
                titulo: "Coleção de livros de fantasia",
                descricao: "Cinco volumes, capa dura.",
                imagem: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
                condicao: "seminovo",
                donoId: bruno.id,
                categoriaId: 2,
            },
        ],
    });

    await prisma.story.create({
        data: {
            imagem: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
            texto: "Novos itens hoje!",
            autorId: ana.id,
            expiraEm: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
    });

    console.log("Seed concluído.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());