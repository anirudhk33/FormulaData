import React from "react";

export const Button = ({ styles, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`font-poppins font-bold text-[18px] text-primary rounded-[10px] outline-none ${styles}`}
    >
      {text}
    </button>
  );
};
