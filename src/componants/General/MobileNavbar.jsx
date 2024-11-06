import { useContext, useState } from "react";
import css from "./mobileNavbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContextForApp } from "../../store/authentiation-store.jsx";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, LogoutUser_function, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className={css.mobile_navbar}>
        <div className={css.logo}>
          <a className={css.logo_a} href="#hero">
            <img src="./media/logo.png" alt="Academic Help Logo" />
          </a>
        </div>
        <button className={css.menu_btn} onClick={toggleMenu}>
          {isOpen ? "×" : "☰"}
        </button>
      </header>
      <div
        className={`${css.menu} ${isOpen ? css.menu_open : css.menu_closed}`}
      >
        <div className={css.linkOnlyContainer}>
          <ul className={css.nav_links}>
            <li>
              <a href="#services" onClick={toggleMenu}>
                Services
              </a>
            </li>
            <li>
              <a href="#about" onClick={toggleMenu}>
                About Us
              </a>
            </li>
            <li>
              <a href="#testimonials" onClick={toggleMenu}>
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" onClick={toggleMenu}>
                Contact Us
              </a>
            </li>
          </ul>
          {isAuthenticated && (
            <ul className={css.nav_links}>
              <li>
                <a onClick={() => setuserMainComponant("dashboard")}>
                  Dashboard
                </a>
              </li>{" "}
              <li>
                <a onClick={() => setuserMainComponant("general_queries")}>
                  Queries
                </a>
              </li>
            </ul>
          )}
        </div>

        {!isAuthenticated ? (
          <button
            onClick={() => setuserMainComponant("login")}
            className={css.login_btn}
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              LogoutUser_function();
              toggleMenu();
            }}
            className={css.logout_btn}
          >
            Log out
          </button>
        )}
      </div>
    </>
  );
}
