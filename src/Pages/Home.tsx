import AnnouncementBar from "../components/AnnouncementBar";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  return (
    <>
      {/* <AnnouncementBar /> */}
      <Header />
      <Hero />
      <Features />
      <Footer />
    </>
  );
}
