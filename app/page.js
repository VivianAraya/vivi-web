import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Colecciones from "./components/Colecciones";
import AnimalesDePoder from "./components/AnimalesDePoder";
import EncargoPersonalizado from "./components/EncargoPersonalizado";
import TintesNaturales from "./components/TintesNaturales";
import SobreVivi from "./components/SobreVivi";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import { getColecciones, getAnimalesDePoder } from "@/lib/supabase/server";

export default async function Home() {
  // Fetch from Supabase at build/render time
  const colecciones = await getColecciones().catch(() => []);
  const animales = await getAnimalesDePoder().catch(() => []);

  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Colecciones colecciones={colecciones} />
        <AnimalesDePoder animales={animales} />
        <TintesNaturales />
        <SobreVivi />
        <EncargoPersonalizado />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
