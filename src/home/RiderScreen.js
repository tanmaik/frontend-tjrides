import { AuthContext } from "../shared/context/auth-context";
import React, { useContext, useEffect, useState } from "react";
import RideList from "./components/RideList";
import { useHistory } from "react-router-dom";

const RiderScreen = () => {
  const [rideList, setRideList] = useState([]);

  useEffect(() => {
    console.log(rideList);
    async function fetchData() {
      const response = await fetch("http://localhost:5000/api/rides/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }

    fetchData()
      .then((data) => {
        console.log(data.rides);
        setRideList(
          data.rides.filter((ride) => ride.riders.length < ride.maxNumber)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setRideList]);

  const auth = useContext(AuthContext);
  const history = useHistory();

  const handleRideSelect = (rideData) => {
    history.push({
      pathname: "/confirmedRide",
      state: { rideData },
    });
  };

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold pb-2">
          Select a ride, {auth.userData.first_name}
        </h2>
        {rideList.length > 0 ? (
          <RideList list={rideList} onRideSelect={handleRideSelect} />
        ) : (
          <p>No rides available.</p>
        )}
      </div>
    </>
  );
};

export default RiderScreen;
