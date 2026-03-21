import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Escorts UG – Verified Escorts in Uganda",
  description:
    "Browse verified escort profiles from across Uganda's major cities including Kampala, Entebbe, Jinja, Mbarara and more.",
  keywords: "escorts Uganda, Kampala escorts, verified escorts, Uganda escort directory",
  openGraph: {
    title: "Escorts UG – Verified Escorts in Uganda",
    description:
      "Browse verified escort profiles from across Uganda's major cities.",
    url: "https://www.hexescortsug.xyz",
    siteName: "Hex Escorts UG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.hexescortsug.xyz" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Escorts UG",
              "url": "https://www.hexescortsug.xyz",
              "sameAs": [
                "https://x.com/vickywiz60",
                "https://t.me/+1R927eT3ccg5N2Zk"
              ]
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
