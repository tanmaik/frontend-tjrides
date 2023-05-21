import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import { MapPinIcon } from "@heroicons/react/24/solid";

import GoogleMap from "google-map-react";

const ConfirmedRide = (props) => {
  const { rideId } = useParams();
  const auth = useContext(AuthContext);
  const [lat, setLat] = useState(0); // [lat, lng]
  const [lng, setLng] = useState(0); // [lat, lng]
  const [rideData, setRideData] = useState(null);
  useEffect(() => {
    async function fetchData(name) {
      const response = await fetch(
        `http://localhost:5000/api/rides/${rideId}`,
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
    async function fetchLatLng(address) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBYaOnnIFQpxGbz4kUSNE7cmjO5fvoz-y8`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return await response.json();
    }

    fetchData(auth.userData.display_name)
      .then((data) => {
        setRideData(data.ride);
        fetchLatLng(data.ride.address)
          .then((data) => {
            setLat(data.results[0].geometry.location.lat);
            setLng(data.results[0].geometry.location.lng);
          })
          .catch((error) => {
            console.log(error);
          });
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
          <p>Address: {rideData.address}</p>
          <p>
            Time:
            {new Date(rideData.time)
              .toLocaleTimeString("en-US")
              .replace(":00", "")}
          </p>
          <p>Riders</p>
          <ul className="px-4">
            {rideData.riders.map((rider) => (
              <li key={Math.random()}>• {rider}</li>
            ))}
          </ul>
          <div className="h-24 w-full">
            <GoogleMap center={[lat, lng]} zoom={14}></GoogleMap>
          </div>
        </div>
      ) : (
        <p>No ride data available.</p>
      )}
    </div>
  );
};

export default ConfirmedRide;
