export default function Bolha({ mensagem, minha }) {
    return (
        <div className={`flex ${minha ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${minha
                        ? "rounded-br-sm bg-azul text-white"
                        : "rounded-bl-sm bg-cinza-bg text-preto"
                    }`}
            >
                {mensagem.conteudo}
            </div>
        </div>
    );
}