import { useEffect, useRef } from "react";
import "../styles/Hero.css";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          heroRef.current?.classList.add("show");
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero">
      <div className="hero-content" ref={heroRef}>
        <h1>Discover Products You’ll Love</h1>

        <p>
          From pencils, toys, glue, notebooks, and charts to seasonal essentials,
          find everything kids need—quality products at reasonable prices.
        </p>
      </div>
    </section>
  );
}

