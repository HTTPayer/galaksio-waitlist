import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Galaksio - Deploy with confidence",
  description: "Build, deploy, and scale your applications with Galaksio. Import from GitHub and deploy instantly.",
  keywords: ["cloud computing", "deployment", "CI/CD", "GitHub", "infrastructure", "developer tools"],
  authors: [{ name: "Galaksio" }],
  openGraph: {
    title: "Galaksio - Deploy with confidence",
    description: "Build, deploy, and scale your applications with Galaksio. Import from GitHub and deploy instantly.",
    url: "https://galaksio.cloud",
    siteName: "Galaksio",
    images: [
      {
        url: "/galaksio-OG.png",
        width: 1200,
        height: 630,
        alt: "Galaksio - Deploy with confidence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galaksio - Deploy with confidence",
    description: "Build, deploy, and scale your applications with Galaksio. Import from GitHub and deploy instantly.",
    images: ["/galaksio-OG.png"],
    creator: "@galaksio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
