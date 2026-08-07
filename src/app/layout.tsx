import type { Metadata } from "next";
import Script from "next/script";
import { PortfolioModeProvider } from "@/lib/portfolioMode";
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
    <html
      lang="en"
      className="min-h-dvh antialiased lg:h-dvh lg:overflow-hidden"
      data-portfolio-mode="professional"
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved mode before first paint to avoid a mode flash. */}
        <Script id="portfolio-mode-init" strategy="beforeInteractive">
          {`try{var m=localStorage.getItem("portfolio-mode");if(m==="creative"||m==="professional")document.documentElement.dataset.portfolioMode=m}catch(e){}`}
        </Script>
      </head>
      <body className="min-h-dvh font-sans lg:h-dvh lg:overflow-hidden">
        <PortfolioModeProvider>{children}</PortfolioModeProvider>
      </body>
    </html>
  );
}
