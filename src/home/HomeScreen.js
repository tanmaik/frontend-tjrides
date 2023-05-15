import React, { useContext, useEffect } from "react";
import Button from "../shared/UI/Button";
import { AuthContext } from "../shared/context/auth-context";
import { Link } from "react-router-dom";

const HomeScreen = (props) => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log(code);
    }
  }, []);
  const auth = useContext(AuthContext);
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h2 className="font-bold text-xl pb-2">
          Welcome, {auth.userData.first_name}
        </h2>
        <h2 className="font-bold text-xl pb-2">Are you a...</h2>
        <div>
          <Link to="/rider">
            <Button>Rider?</Button>
          </Link>
          <Link to="/driver">
            <Button>Driver?</Button>
          </Link>
        </div>
        <button onClick={auth.logout} className="underline">
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomeScreen;
