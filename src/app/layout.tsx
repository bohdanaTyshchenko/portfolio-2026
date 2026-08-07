import type { Metadata } from "next";
import Script from "next/script";
import { PortfolioModeProvider } from "@/lib/portfolioMode";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bohdana — Portfolio",
  description:
    "Product design manager based in Toronto. Portfolio, work, and contact.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
