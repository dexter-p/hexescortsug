import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Escorts UG – #1 Verified Escorts in Uganda | Kampala Girls",
  description:
    "Find verified escorts in Uganda. Browse Kampala escorts, Entebbe escorts, Jinja, Mbarara and all Uganda cities. Real profiles, reviewed companions, girls in Uganda available now.",
  keywords: [
    "escorts Uganda",
    "escorts in Uganda",
    "Uganda escorts",
    "UG escorts",
    "escorts ug",
    "Kampala escorts",
    "escorts in Kampala",
    "Entebbe escorts",
    "Jinja escorts",
    "Mbarara escorts",
    "verified escorts Uganda",
    "Uganda escort directory",
    "girls in Uganda",
    "girls to fuck in Uganda",
    "sexy girls Uganda",
    "hot girls Uganda",
    "companions Uganda",
    "call girls Uganda",
    "call girls Kampala",
    "escort services Uganda",
    "escort services Kampala",
    "ladies in Uganda",
    "hookup Uganda",
    "hookup Kampala",
    "Uganda adult entertainment",
    "Kampala adult entertainment",
    "Uganda girls for hire",
    "best escorts in Uganda",
    "independent escorts Uganda",
  ].join(", "),
  verification: {
    google: "37jbT2PcWcRwnnSmVcZxesfTuLLL5uyupKBsSed4pY4",
  },
  openGraph: {
    title: "Escorts UG – #1 Verified Escorts in Uganda | Kampala Girls",
    description:
      "Find verified escorts in Uganda. Real profiles from Kampala, Entebbe, Jinja, Mbarara and all major Uganda cities.",
    url: "https://www.hexescortsug.xyz",
    siteName: "Escorts UG",
    type: "website",
    locale: "en_UG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Escorts UG – #1 Verified Escorts in Uganda",
    description: "Browse verified escorts from across Uganda. Real profiles, reviewed companions.",
  },
  alternates: {
    canonical: "https://www.hexescortsug.xyz",
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
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="geo.region" content="UG" />
        <meta name="geo.country" content="Uganda" />
        <meta name="language" content="English" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Escorts UG",
              "url": "https://www.hexescortsug.xyz",
              "description": "Uganda's #1 verified escort directory. Find escorts in Kampala, Entebbe, Jinja, Mbarara and all major Uganda cities.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "UG",
                "addressLocality": "Kampala"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Uganda"
              },
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
