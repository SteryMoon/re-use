import "./globals.css";

export const metadata = {
  title: "ReUse!",
  description: "Troque o que você não usa por algo que você quer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}