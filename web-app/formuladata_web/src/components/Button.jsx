import React from "react";

export const Button = ({ styles, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-3 px-4 font-poppins font-bold text-[18px] text-primary bg-red-gradient rounded-[10px] outline-none ${styles}`}
    >
      {text}
    </button>
  );
};
