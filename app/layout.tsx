import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "Hex Escorts UG - Verified Escorts in Kampala & Uganda",
  description:
    "Find premium verified escorts, sexy call girls, and independent companions in Uganda. Browse genuine profiles from Kampala, Entebbe, Jinja and more. High class erotics and hookups at Hex Escorts UG.",
  keywords: "escorts, escorts in ug, escorts in uganda, escorts ug, uganda escorts, uganda call girls, ugandan hot girls, girls to fuck in uganda, sexy girls in uganda, hook ups in uganda, hook up girls, call girls in kampala, hot girls in kampala, girls to fuck in kampala, sexy girls in kampala, porno ug, erotics uganda, erotic escorts kampala, independent escorts uganda, hex escorts",
  metadataBase: new URL('https://www.hexescortsug.xyz'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Hex Escorts UG – Verified Escorts in Uganda",
    description:
      "Find premium verified escorts and companions in Uganda. Browse genuine profiles from Kampala, Entebbe, Jinja and more.",
    url: "https://www.hexescortsug.xyz",
    siteName: "Hex Escorts UG",
    locale: "en_UG",
    type: "website",
  },
  verification: {
    google: "GPTdzpbCAZkm2ngY85XrfQc-iNDolN3mBsRrbfzUDGY",
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
        {/* Google Analytics - Replace G-XXXXXXXXXX with your actual ID */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
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
        <ScrollToTop />
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
