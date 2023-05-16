import React from "react";
import RideItem from "./RideItem";

const RideList = (props) => {
  const { list, onRideSelect } = props;

  const handleRideItemClick = (rideData) => {
    onRideSelect(rideData);
  };

  return (
    <ul>
      {list.map((ride) => (
        <li key={ride.id} onClick={() => handleRideItemClick(ride)}>
          <RideItem
            driver={ride.driver}
            location={ride.location}
            time={ride.time}
          />
        </li>
      ))}
    </ul>
  );
};

export default RideList;
