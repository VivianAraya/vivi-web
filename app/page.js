import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Colecciones from "./components/Colecciones";
import AnimalesDePoder from "./components/AnimalesDePoder";
import EncargoPersonalizado from "./components/EncargoPersonalizado";
import TintesNaturales from "./components/TintesNaturales";
import SobreVivi from "./components/SobreVivi";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Colecciones />
        <AnimalesDePoder />
        <EncargoPersonalizado />
        <TintesNaturales />
        <SobreVivi />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
