import { useContext, useState } from "react";
import css from "./navbar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { GlobalContextForApp } from "../../store/authentiation-store";

export default function Navbar() {
  const [isSmallProfileOpen, setisSmallProfileOpen] = useState(false); //small dock of profile to show or not
  //? token regenration we have to build
  const { isAuthenticated, LogoutUser_function, setuserMainComponant } =
    useContext(GlobalContextForApp);

  const showSmallProfile_function = () => {
    setisSmallProfileOpen(!isSmallProfileOpen);
  };

  return (
    <>
      <header>
        <nav className={css.navbar}>
          <div className={css.logo}>
            <a className={css.logo_a} href="#hero">
              <img src="./media/logo.png" alt="" />
            </a>
          </div>
          <ul className={css.nav_links}>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
          {!isAuthenticated && (
            <button
              onClick={() => setuserMainComponant("login")}
              className={css.login_btn}
            >
              Login
            </button>
          )}
          {isAuthenticated && (
            <>
              <button
                onClick={showSmallProfile_function}
                className={css.profile_button}
              >
                <FaUserCircle size={50} />
              </button>

              {/* Profile Container */}
              <div
                className={`${css.small_profile_container} ${
                  isSmallProfileOpen
                    ? css.small_profile_container_show
                    : css.small_profile_container_hide
                }`}
              >
                <h3>Hi, {localStorage.getItem("username")}!</h3>
                <a
                  onClick={() => setuserMainComponant("dashboard")}
                  className={css.profile_link}
                >
                  Dashboaed
                </a>
                <a
                  onClick={() => setuserMainComponant("general_queries")}
                  className={css.profile_link}
                >
                  Queries
                </a>
                <button
                  onClick={LogoutUser_function}
                  className={css.logout_btn}
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </nav>
      </header>
    </>
  );
}
