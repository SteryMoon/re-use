import "./globals.css";

export const metadata = {
  title: "ReUse!",
  description: "Troque o que você não usa por algo que você quer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-cinza-bg">
        <div className="mx-auto min-h-screen max-w-md bg-white shadow-xl md:my-6 md:min-h-[calc(100vh-3rem)] md:overflow-hidden md:rounded-3xl">
          {children}
        </div>
      </body>
    </html>
  );
}