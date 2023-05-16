import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../shared/context/auth-context";
import Button from "../shared/UI/Button";
import Autocomplete from "react-google-autocomplete";

const DriverScreen = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");

  const auth = useContext(AuthContext);

  const history = useHistory();
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = await fetch("http://localhost:5000/api/rides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver: auth.userData.display_name,
        time: formData.get("time"),
        address: address,
        location: location,
        maxNumber: parseInt(formData.get("maxNumber")),
        riders: [],
      }),
    });
    const data = await response.json();
    console.log(data);

    history.push({
      pathname: `/confirmedRide/${data.ride.id}`,
    });
  };
  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl">What are the details of your ride?</h2>
      <form onSubmit={submitHandler}>
        <p className="font-bold">When will you be driving?</p>
        <input type="datetime-local" name="time" />
        <p className="font-bold">What is the dropoff location?</p>
        <Autocomplete
          onPlaceSelected={(place) => {
            setAddress(place.formatted_address);
            setLocation(place.address_components[2].long_name);
          }}
          options={{
            types: ["address"],
          }}
        />
        <p className="font-bold">What is the maximum number of riders?</p>
        <input type="number" name="maxNumber" placeholder="4" />
        <br></br>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default DriverScreen;
