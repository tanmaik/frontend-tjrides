import React from "react";

const RideItem = (props) => {
  const date = new Date(props.time);
  const time = date.toLocaleTimeString("en-US").replace(":00", "");

  return (
    <div className="flex w-full p-4 border-[1px] rounded-full justify-around">
      <div className="">
        <h2 className="text-xl font-black">{props.driver}</h2>
        <p>{props.location} </p>
      </div>
      <div>{time ? time : ""}</div>
    </div>
  );
};

export default RideItem;
