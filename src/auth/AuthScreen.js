import React, { useContext, useEffect } from "react";
import Button from "../shared/UI/Button";
import tjrides from ".././assets/tjrides_large.png";
import { AuthContext } from "../shared/context/auth-context";

const AuthScreen = (props) => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchData(code) {
      const response = await fetch("http://localhost:5000/api/auth/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: code }),
      });

      return await response.json();
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    if (code) {
      const data = fetchData(code);
      console.log(data);
    }
  }, []);

  const loginHandler = async () => {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "GET",
    });
    const responseData = await response.json();
    window.location.href = responseData.url;
  };

  return (
    <div className="flex items-center h-screen">
      <div className="px-6">
        <img src={tjrides} alt="hello " className="w-12" />
        <h1 className="text-3xl font-bold py-2">Let's get verified. </h1>
        <p className="pb-2 leading-snug">
          Sign into your app using your TJ Intranet login. This helps us keep
          the site safe for everyone that uses it.
        </p>
        <Button onClick={loginHandler}>I'll login with Ion</Button>
      </div>
    </div>
  );
};

export default AuthScreen;
