import React, { useContext, useEffect } from "react";
import Button from "../shared/UI/Button";
import { AuthContext } from "../shared/context/auth-context";
import { useParams } from "react-router-dom";

const HomeScreen = (props) => {
  

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Do something with the code
      console.log(code);
    }
  }, []);

  const auth = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h2 className="font-bold text-xl pb-2">Welcome, {auth.userId}</h2>
        <h2 className="font-bold text-xl pb-2">Are you a...</h2>
        <div>
          <Button>Rider?</Button>
          <Button>Driver?</Button>
        </div>
        <button onClick={auth.logout} className="underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
