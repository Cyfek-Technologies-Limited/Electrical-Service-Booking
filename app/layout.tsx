import { Analytics } from "@vercel/analytics/next";
import { Poppins } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Habitech Power Limited | Electrical & Solar Services in Lagos",
  description:
    "Habitech Power Limited provides electrical installation, maintenance, solar inverter, solar panel, water pumping, CCTV, and industrial electrical services in Lagos and across Nigeria.",
  generator: "",
  icons: {
    icon: [
      {
        url: "/habitech-logo.jpeg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/habitech-logo.jpeg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/habitech-logo.jpeg",
        type: "image/svg+xml",
      },
    ],
    apple: "/habitech-logo.jpeg",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
