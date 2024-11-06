import css from "./about.module.css";
import OurUnivercities from "./OurUnivercities";

export default function About() {
  return (
    <section id="about" className={css.about_section}>
      <div className={css.about_content}>
        <h2>About Us</h2>
        <p>
          We are dedicated to providing personalized academic help for students
          across the globe. Whether it’s assignments, exams, or understanding
          complex topics, our platform connects students with expert tutors to
          ensure success in every subject.
        </p>
        <div className={css.mission}>
          <OurUnivercities />
        </div>
      </div>
    </section>
  );
}
