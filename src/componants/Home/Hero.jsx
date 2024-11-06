import css from "./hero.module.css";

export default function Hero() {
  return (
    <>
      <section id="hero" className={css.hero_section}>
        <div className={css.overlay}></div>
        <div className={css.hero_content}>
          <h1>Achieve Academic Excellence</h1>
          <p>
            Get personalized help with assignments, exam preparation,
            understanding topics, and much more.
          </p>
          <a href="#services" className={css.cta_button}>
            Explore Services
          </a>
        </div>
      </section>
    </>
  );
}
