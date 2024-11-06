import { useContext } from "react";
import css from "./services.module.css";
import { GlobalContextForApp } from "../../store/authentiation-store";

export default function Services() {
  const { isAuthenticated, userMainComponant, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const services = [
    "Assignment Help",
    "Assesment",
    "Project & Lab report",
    "Essay & Presentation",
    "",
  ];

  return (
    <>
      <section id="services" className={css.services_section}>
        <h2 className={css.services_heading}>Our Services</h2>

        <div className={css.services_container}>
          {services.map((s_name) => (
            <div
              className={css.service_card}
              key={s_name}
              onClick={() => setuserMainComponant("service_form")}
            >
              <p className={css.service_title}>{s_name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
