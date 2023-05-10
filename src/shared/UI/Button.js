import React from "react";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className="text-lg bg-blue-500 hover:bg-blue-700 transition text-white font-bold py-2 px-6 rounded-full"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
