import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Hex Escorts UG - Verified Escorts in Kampala & Uganda",
  description:
    "Find premium verified escorts, sexy girls, and companions in Uganda. Browse genuine profiles from Kampala, Entebbe, Jinja, Mbarara and more at Hex Escorts UG.",
  keywords: "escorts Uganda, Kampala escorts, verified escorts, Uganda escort directory, hex escorts, sexy girls Kampala, hot girls Uganda, erotics Uganda, companions Uganda, high class escorts Kampala, call girls Uganda, independent escorts Kampala, Munyonyo escorts, Nakasero girls, adult services Uganda, genuine hookups Uganda",
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
