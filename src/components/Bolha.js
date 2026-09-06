export default function Bolha({ mensagem, minha }) {
    return (
        <div className={`flex ${minha ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm md:max-w-[65%] md:px-5 md:py-3 md:text-base ${minha
                        ? "rounded-br-sm bg-azul text-white"
                        : "rounded-bl-sm bg-cinza-bg text-preto"
                    }`}
            >
                {mensagem.conteudo}
            </div>
        </div>
    );
}