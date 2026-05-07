import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bohdana — Portfolio",
  description:
    "Product design manager based in Toronto. Portfolio, work, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-dvh overflow-hidden antialiased">
      <body className="h-dvh overflow-hidden font-sans">{children}</body>
    </html>
  );
}
