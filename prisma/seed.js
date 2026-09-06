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
            { nome: "Brinquedos", icone: "🧸" },
            { nome: "Instrumentos", icone: "🎸" },
            { nome: "Games", icone: "🎮" },
            { nome: "Ferramentas", icone: "🔧" },
            { nome: "Papelaria", icone: "✏️" },
            { nome: "Pets", icone: "🐾" },
        ],
    });

    const senha = await bcrypt.hash("123456", 10);

    const pessoas = [
        { nome: "Ana Souza", email: "ana@reuse.com", cidade: "São Paulo", bio: "Troco mais do que compro.", img: 5 },
        { nome: "Bruno Lima", email: "bruno@reuse.com", cidade: "Santo André", bio: "Desapegando aos poucos.", img: 12 },
        { nome: "Carla Mendes", email: "carla@reuse.com", cidade: "Osasco", bio: "Amo livros e plantas.", img: 32 },
        { nome: "Diego Rocha", email: "diego@reuse.com", cidade: "Guarulhos", bio: "Games e eletrônicos.", img: 15 },
        { nome: "Elisa Prado", email: "elisa@reuse.com", cidade: "Campinas", bio: "Moda circular sempre.", img: 47 },
        { nome: "Felipe Nunes", email: "felipe@reuse.com", cidade: "São Bernardo", bio: "Música e vinis.", img: 68 },
        { nome: "Gabi Torres", email: "gabi@reuse.com", cidade: "Diadema", bio: "Mãe, troco brinquedos.", img: 23 },
        { nome: "Hugo Martins", email: "hugo@reuse.com", cidade: "Barueri", bio: "Faço marcenaria.", img: 51 },
    ];

    const usuarios = [];
    for (const p of pessoas) {
        const u = await prisma.usuario.create({
            data: {
                nome: p.nome,
                email: p.email,
                senha,
                cidade: p.cidade,
                bio: p.bio,
                avatar: `https://i.pravatar.cc/300?img=${p.img}`,
            },
        });
        usuarios.push(u);
    }

    const foto = (id) => `https://images.unsplash.com/photo-${id}?w=800&q=80`;

    const itens = [
        ["Jaqueta jeans oversized", "Tamanho M, usada 3 vezes.", "1543076447-215ad9ba6923", "seminovo", 1],
        ["Vestido floral verão", "Tamanho P, nunca usado.", "1595777457583-95e059d581b8", "novo", 1],
        ["Tênis branco casual", "Número 38, pouco uso.", "1549298916-b41d501d3772", "seminovo", 1],
        ["Casaco de lã cinza", "Tamanho G, bem quentinho.", "1591047139829-d91aecb6caea", "usado", 1],
        ["Coleção de fantasia", "Cinco volumes, capa dura.", "1512820790803-83ca734da794", "seminovo", 2],
        ["Livros de negócios", "Sete títulos, ótimo estado.", "1544716278-ca5e3f4abd8c", "usado", 2],
        ["Box de romances", "Trilogia completa.", "1495446815901-a7297e633e8d", "novo", 2],
        ["Fone bluetooth", "Bateria boa, com case.", "1505740420928-5e560c06d30e", "usado", 3],
        ["Teclado mecânico", "Switch azul, retroiluminado.", "1587829741301-dc798b83add3", "seminovo", 3],
        ["Câmera instantânea", "Funcionando, sem filme.", "1526170375885-4d8ecf77b99f", "usado", 3],
        ["Caixa de som portátil", "À prova d'água.", "1608043152269-423dbba4e7e1", "seminovo", 3],
        ["Luminária de mesa", "Base de madeira.", "1507473885765-e6ed057f782c", "seminovo", 4],
        ["Jogo de xícaras", "Seis peças de porcelana.", "1514228742587-6b1558fcca3d", "novo", 4],
        ["Vaso de cerâmica", "Feito à mão, 30cm.", "1485955900006-10f4d324d411", "novo", 4],
        ["Bicicleta urbana", "Aro 26, revisada.", "1485965120184-e220f721d03e", "usado", 5],
        ["Kit halteres", "Par de 5kg cada.", "1571019613454-1cb2f99b2d8b", "seminovo", 5],
        ["Tapete de yoga", "Antiderrapante, roxo.", "1601925260368-ae2f83cf8b7f", "seminovo", 5],
        ["Kit de pincéis", "Doze peças, higienizados.", "1522335789203-aabd1fc54bc9", "seminovo", 6],
        ["Perfume importado", "Lacrado, 100ml.", "1541643600914-78b084683601", "novo", 6],
        ["Quebra-cabeça 1000pç", "Completo, na caixa.", "1606503153255-59d8b8b82176", "seminovo", 7],
        ["Blocos de montar", "Grande caixa sortida.", "1587654780291-39c9404d746b", "usado", 7],
        ["Violão acústico", "Cordas novas, com capa.", "1510915361894-db8b60106cb1", "seminovo", 8],
        ["Teclado musical", "61 teclas, com fonte.", "1520523839897-bd0b52f945a0", "usado", 8],
        ["Console portátil", "Com dois jogos.", "1493711662062-fa541adb3fc8", "seminovo", 9],
        ["Controle sem fio", "Testado, funcionando.", "1592840496694-26d035b52b48", "usado", 9],
        ["Furadeira elétrica", "Com maleta e brocas.", "1572981779307-38b8cabb2407", "usado", 10],
        ["Caderno pontilhado", "A5, nunca usado.", "1531346878377-a5be20888e57", "novo", 11],
        ["Estojo de canetas", "Coloridas, ponta fina.", "1583485088034-697b5bc54ccd", "novo", 11],
        ["Caminha para pet", "Lavada, tamanho médio.", "1596492784531-6e6eb5ea9993", "usado", 12],
        ["Comedouro duplo", "Inox, com base.", "1548767797-d8c844163c4c", "seminovo", 12],
    ];

    for (let i = 0; i < itens.length; i++) {
        const [titulo, descricao, fotoId, condicao, categoriaId] = itens[i];
        await prisma.item.create({
            data: {
                titulo,
                descricao,
                imagem: foto(fotoId),
                condicao,
                categoriaId,
                donoId: usuarios[i % usuarios.length].id,
            },
        });
    }

    const stories = [
        ["1441986300917-64674bd600d8", "Novidades no meu armário!"],
        ["1483985988355-763728e1935b", "Desapego de inverno"],
        ["1472851294608-062f824d29cc", "Chegaram livros novos"],
        ["1523275335684-37898b6baf30", "Eletrônicos revisados"],
        ["1556909212-d5b604d0c90d", "Decoração da casa"],
        ["1571902943202-507ec2618e8f", "Bora treinar?"],
        ["1596462502278-27bfdc403348", "Kit de beleza completo"],
        ["1558060370-d644479cb6f7", "Brinquedos em ótimo estado"],
    ];

    for (let i = 0; i < stories.length; i++) {
        const [fotoId, texto] = stories[i];
        await prisma.story.create({
            data: {
                imagem: foto(fotoId),
                texto,
                autorId: usuarios[i % usuarios.length].id,
                expiraEm: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
        });
    }

    console.log("Seed concluído: 12 categorias, 8 usuários, 31 itens, 8 stories.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());