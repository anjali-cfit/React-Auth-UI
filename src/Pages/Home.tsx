import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import "../styles/home.css";
import ProductBar from "../components/ProductBar";

export default function Home() {
  return (
    <>
      {/* <AnnouncementBar /> */}
      <Header />
      <Hero />
      <ProductBar />
      <Features />
      <Footer />
    </>
  );
}
