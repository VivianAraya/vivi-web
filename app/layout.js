import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ScrollReveal from "./components/ScrollReveal";

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Vivián Araya · Piezas únicas con tintes naturales",
  description:
    "Arte y objetos únicos creados a mano con tintes naturales, inspiración botánica y simbolismo animal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col">
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
