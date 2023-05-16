import React, { useEffect, useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";

const ConfirmedRide = (props) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  const [rideData, setRideData] = useState(location.state?.rideData);
  useEffect(() => {
    async function fetchData(name) {
      const response = await fetch(
        `http://localhost:5000/api/rides/${rideData.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rider: name }),
        }
      );
      return await response.json();
    }

    fetchData(auth.userData.display_name)
      .then((data) => {
        setRideData(data.ride);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl">Your confirmed ride details</h1>
      {rideData ? (
        <div>
          <p>Driver: {rideData.driver}</p>
          <p>
            Address: {rideData.address}, {rideData.location}
          </p>
          <p>Time: {rideData.time}</p>
          <p>Riders</p>
          <ul className="px-4">
            {rideData.riders.map((rider) => (
              <li key={Math.random()}>• {rider}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No ride data available.</p>
      )}
    </div>
  );
};

export default ConfirmedRide;
