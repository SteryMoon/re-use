import Link from "next/link";
import Blobs from "@/components/Blobs";

export default function BoasVindas() {
  return (
    <div className="md:flex md:min-h-screen md:items-center md:justify-center md:bg-cinza-bg">
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-8 text-center md:min-h-0 md:w-[420px] md:justify-start md:rounded-3xl md:bg-white md:px-8 md:pt-32 md:pb-12 md:shadow-xl">
        <Blobs />

        <img src="/logo.svg" alt="ReUse!" className="mb-8 h-90 w-auto" />

        <p className="mb-12 text-cinza">
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
    </div>
  );
}