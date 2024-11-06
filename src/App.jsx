import { useContext } from "react";
import "./App.css";
import Navbar from "./componants/General/Navbar";
import MobileNavbar from "./componants/General/MobileNavbar";
import Loading_wait from "./componants/General/Loading_wait";
import Hero from "./componants/Home/Hero";
import Services from "./componants/Home/Services";
import HelpSteps from "./componants/Home/HelpSteps";
import About from "./componants/Home/About";
import Testimonials from "./componants/Home/Testimonials";
import Contact from "./componants/Home/Contact";
import Login from "./componants/Accounts/Login";
import SignUp from "./componants/Accounts/Signup";
import ForgotPassword from "./componants/Accounts/ForgotPassword";
import ServiceForm from "./componants/Accounts/ServiceForm";
import Dashboard from "./componants/Dashboard/Dashboard";
import GeneralQueriesContainer from "./componants/Queries/Queries";
import { GlobalContextForApp } from "./store/authentiation-store";

function App() {
  const { screenWidth, userMainComponant, setuserMainComponant } =
    useContext(GlobalContextForApp);
  return (
    <>
      {userMainComponant === "" && (
        <>
          {" "}
          {screenWidth > 800 ? <Navbar /> : <MobileNavbar />}
          <Hero />
          <Services />
          <HelpSteps />
          <About />
          <Testimonials />
          <Contact />
        </>
      )}
      {userMainComponant === "login" && (
        <Login
          userMainComponant={userMainComponant}
          setuserMainComponant={setuserMainComponant}
        />
      )}
      {userMainComponant === "signup" && (
        <SignUp
          userMainComponant={userMainComponant}
          setuserMainComponant={setuserMainComponant}
        />
      )}
      {userMainComponant === "forgot_password" && (
        <ForgotPassword setuserMainComponant={setuserMainComponant} />
      )}
      {userMainComponant === "dashboard" && <Dashboard />}
      {userMainComponant === "Loading_wait" && <Loading_wait />}
      {userMainComponant === "general_queries" && <GeneralQueriesContainer />}
      {userMainComponant === "service_form" && <ServiceForm />}
    </>
  );
}

export default App;
