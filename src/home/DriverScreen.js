import React from "react";

const DriverScreen = () => {
  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const response = await fetch("http://localhost:5000/api/rides", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver: formData.get("driver"),
        time: formData.get("time"),
        address: formData.get("address"),
        location: formData.get("location"),
        maxNumber: formData.get("maxNumber"),
        riders: [],
      }),
    });
    const data = await response.json();
  };
  return (
    <div className="p-4">
      <form onSubmit={submitHandler}>
       
        <input type="text"  name="driver" placeholder=" John" />
       
        <input type="text"  name="driver" placeholder=" John" />
       
        <input type="text" name="driver" placeholder=" John" />
        <input type="text" name="driver" placeholder=" John" />
        <input type="text" name="driver" placeholder=" John" />
      </form>
    </div>
  );
};

export default DriverScreen;
