import { jwtDecode } from "jwt-decode"; //token is expiration cheaking
import React, { createContext, useEffect, useRef, useState } from "react";

// "http://192.168.177.224:8000/api_new/login/",
// 3.7.71.83:80/
// 192.168.177.224:8000/

// Create a context
export const GlobalContextForApp = createContext();
// Create a provider component
export const GlobalContextForAppProvider = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); //it is to change navbar appreance according to screenwidth
  const [userMainComponant, setuserMainComponant] = useState(""); //login/signup/forgot_password ... which componant to show and others to hide
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const multipleAssignmentData = useRef();
  const multipleAssignmentErrs = useRef();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to check if the access token is expired  //return true/false only
  const isTokenExpired = (token) => {
    if (!token) {
      return true; // If no token, treat it as expired
    }
    try {
      // Decode the token to get its payload
      const decoded = jwtDecode(token);
      // Get current time in seconds (since exp is in seconds)
      const currentTime = Math.floor(Date.now() / 1000);
      // Check if token has expired
      if (decoded.exp < currentTime) {
        return true;
      }
      return false;
    } catch (error) {
      // If there is an error decoding, treat it as expired
      return true;
    }
  };

  //give token then make request otherwise go to login
  const getAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token"); // Or get it from cookies
    const accessToken = localStorage.getItem("access_token");

    if (!isTokenExpired(accessToken)) {
      console.log("Token is valid, no need to refresh");
      return accessToken; // Token is valid, no need to refresh
    } else if (!isTokenExpired(refreshToken)) {
      // Make request to refresh the token
      console.log("Token is not valid, need to refresh");
      const response = await fetch("http://3.7.71.83:80/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
      if (response.ok) {
        const data = await response.json();
        const newAccessToken = data.access;
        // Save the new access token
        localStorage.setItem("access_token", newAccessToken);
        return newAccessToken;
      } else {
        console.error("Failed to refresh access token.");
        return null; // Handle this scenario as needed (e.g., force logout)
      }
    } else {
      console.log("Token is not valid, not able to refresh ");
      return null;
    }
  };

  //it is cheaking that token is valid or not if not then new refresh token
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getAccessToken();
      setisAuthenticated(token != null);
    };
    checkAuth();
  }, [userMainComponant]);

  const LoginUser_function = async (email, password) => {
    try {
      const response = await fetch("http://3.7.71.83:80/api_new/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log(data, response.status);
        localStorage.setItem("access_token", data.access); //token_storing_local_storage
        localStorage.setItem("refresh_token", data.refresh);
        setisAuthenticated(true);
        localStorage.setItem("email", data.email);
        getMultipleAssignmentData(); //issue here  it is not running , cheak carefully
        return {
          message: "login successful",
          type: "success",
        };
      } else {
        return {
          message: data.non_field_errors[0],
          type: "error",
        };
      }
    } catch (err) {
      return {
        message: "Network error. Please try again later",
        type: "error",
      };
    }
  };

  const LogoutUser_function = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    setisAuthenticated(false);
    multipleAssignmentData.current = null;
    multipleAssignmentErrs.current = null;
  };

  const ForgotPassoword_function = async (email) => {
    setuserMainComponant("loading");
    try {
      const response = await fetch(
        "http://3.7.71.83:80//api_new/forgot-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );
      setuserMainComponant("forgot_passoword");
      if (response.ok) {
        return {
          message: "Email has been sent for password reset to registered email",
          type: "success",
        };
      } else {
        console.log(data.error);
        return {
          message: "Not able to resolve the request",
          type: "error",
        };
      }
    } catch (err) {
      setuserMainComponant("forgot_passoword");
      return {
        message: "Network error. Please try again later",
        type: "error",
      };
    }
  };

  const getMultipleAssignmentData = async () => {
    try {
      const response = await fetch(
        "http://3.7.71.83:80/api_new/assignment-details/overview/",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      console.log("request resolved", data);
      if (response.ok) {
        multipleAssignmentData.current = data;
        multipleAssignmentErrs.current = null;
        return true;
      } else {
        multipleAssignmentErrs.current = data;
        multipleAssignmentData.current = null;
        return true;
      }
    } catch (err) {
      multipleAssignmentErrs.current = err;
      multipleAssignmentData.current = null;
      return true;
    }
  };
  const get_DataForUniqueAssignmentCard = async (dict) => {
    if (isAuthenticated) {
      try {
        const response = await fetch(
          `http://3.7.71.83:80/api_new/assignment-details/${dict.action}/${dict.unique_id}/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(
          `http://3.7.71.83:80/api_new/assignment-details/${dict.action}/${dict.unique_id}/`
        );

        const data = await response.json();
        if (response.ok) {
          console.log(data);
          return data;
        } else {
          console.log(data);
          return data;
        }
      } catch (err) {
        console.log(err);
        return err;
      }
    }
  };
  const delete_UniqueAssignmentCard = async (dict) => {
    const cnfm = confirm("Are you sure to Delete this Task!");
    if (cnfm && isAuthenticated) {
      try {
        const response = await fetch(
          `http://3.7.71.83:80/api_new/assignment-details/${dict.action}/${dict.unique_id}/`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(
          `http://3.7.71.83:80/api_new/assignment-details/${dict.action}/${dict.unique_id}/`
        );

        return { status: response.status };
      } catch (err) {
        console.log(err);
        return { err: err };
      }
    }
  };
  useEffect(() => {
    getMultipleAssignmentData();
    console.log("request resolved");
    console.log(multipleAssignmentData);
  }, []);
  return (
    <GlobalContextForApp.Provider
      value={{
        screenWidth,
        userMainComponant,
        getAccessToken,
        isAuthenticated,
        setisAuthenticated,
        setuserMainComponant,
        LoginUser_function,
        LogoutUser_function,
        ForgotPassoword_function,
        getMultipleAssignmentData,
        multipleAssignmentData,
        multipleAssignmentErrs,
        get_DataForUniqueAssignmentCard,
        delete_UniqueAssignmentCard,
      }}
    >
      {children}
    </GlobalContextForApp.Provider>
  );
};

export default function blank_function() {
  console.log("store blamk defaul function");
  return null;
}
