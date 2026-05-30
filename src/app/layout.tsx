import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./global.scss";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Native Roofing Enterprises | Wellington's Certified Roofing Contractor",
  description: "Native Roofing Enterprises is Wellington's trusted GAF certified roofing contractor serving Palm Beach & Broward Counties. State License CCC1329730. Free storm Inspections, emergency repairs & financing.",
  keywords: "roofing Wellington, roof repair Wellington, GAF certified roofer, South Florida roofing contractor, tile roof replacement Wellington, emergency roof repair Florida, CCC1329730",
  robots: "index, follow",
  openGraph: {
    title: "Native Roofing Enterprises | Wellington's Certified Roofing Contractor",
    description: "Wellington's trusted hometown roofing contractor. High-quality storm repairs, replacements, and financing. Certified Florida Contractor License CCC1329730.",
    url: "https://nativeroofing.com",
    siteName: "Native Roofing Enterprises",
    images: [
      {
        url: "https://nativeroofing.com/wp-content/uploads/2025/02/NRE-Logo-2021-web-1.png",
        width: 350,
        height: 90,
        alt: "Native Roofing Enterprises Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Native Roofing Enterprises | Wellington's Certified Roofing Contractor",
    description: "Wellington's trusted GAF certified roofing contractor serving Palm Beach & Broward Counties. State License CCC1329730.",
    images: ["https://nativeroofing.com/wp-content/uploads/2025/02/NRE-Logo-2021-web-1.png"],
  },
};

// JSON-LD local business schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  "name": "Native Roofing Enterprises",
  "image": "https://nativeroofing.com/wp-content/uploads/2025/02/NRE-Logo-2021-web-1.png",
  "telephone": "(561) 469-7930",
  "email": "solutions@nativeroofing.com",
  "url": "https://nativeroofing.com",
  "license": "CCC1329730",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3031 Fortune Way STE A-18",
    "addressLocality": "Wellington",
    "addressRegion": "FL",
    "postalCode": "33414",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 26.635952,
    "longitude": -80.227462
  },
  "areaServed": [
    {
      "@type": "AdministrativeArea",
      "name": "Wellington"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Palm Beach County"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Broward County"
    }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "07:00",
    "closes": "19:00"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Schema Markup for search engine optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${inter.variable}`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
