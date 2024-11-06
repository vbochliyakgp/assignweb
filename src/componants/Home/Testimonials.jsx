import css from "./testimonials.module.css";

export default function Testimonials() {
  return (
    <section id="testimonials" className={css.testimonials_section}>
      <h2>What Our Students Say</h2>
      <div className={css.testimonials_container}>
        <div className={css.testimonial_card}>
          <h3>John Doe</h3>
          <p>
            "Thanks to Academic Help, I was able to ace my exams! The tutors are
            fantastic!"
          </p>
          <div className={css.video_wrapper}>
            <iframe
              src="https://www.youtube.com/embed/Jw7s42Op2ao?si=r49l38p7HwtbmO7D&amp;controls=0"
              title="John Doe Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className={css.testimonial_card}>
          <h3>Jane Smith</h3>
          <p>
            "The assignment help I received was top-notch. Highly recommend!"
          </p>
          <div className={css.video_wrapper}>
            <iframe
              src="https://www.youtube.com/embed/HSgjpQBkR0c?si=Dq0gjdMjju8jxhls&amp;controls=0"
              title="Jane Smith Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className={css.testimonial_card}>
          <h3>Mark Johnson</h3>
          <p>
            "I struggled with my topics, but the expert guidance helped me
            immensely."
          </p>
          <div className={css.video_wrapper}>
            <iframe
              src="https://www.youtube.com/embed/Jw7s42Op2ao?si=r49l38p7HwtbmO7D&amp;controls=0"
              title="Mark Johnson Testimonial"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
