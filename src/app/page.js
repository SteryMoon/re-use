import Link from "next/link";

export default function BoasVindas() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-azul text-3xl font-bold text-white">
        R
      </div>

      <h1 className="text-3xl font-bold">ReUse!</h1>
      <p className="mt-3 mb-12 text-cinza">
        Troque o que você não usa mais por algo que você quer. Sem dinheiro, só
        conexão.
      </p>

      <Link
        href="/cadastro"
        className="w-full rounded-full bg-azul py-4 font-semibold text-white"
      >
        Vamos começar
      </Link>
      <Link href="/login" className="mt-4 text-sm text-cinza">
        Já tenho uma conta →
      </Link>
    </main>
  );
}