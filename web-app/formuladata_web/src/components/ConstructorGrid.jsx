import { useState } from "react";

export const ConstructorGrid = ({ update, selected, style }) => {
  const constructorNames = [
    "Red Bull Racing",
    "Mercedes",
    "Aston Martin",
    "Ferrari",
    "McLaren",
    "Alpine",
    "Williams",
    "Haas F1 Team",
    "Alfa Romeo",
    "AlphaTauri",
  ];

  const toggleConstructorSelection = (constructorName) => {
    if (selected.includes(constructorName)) {
      update(selected.filter((name) => name !== constructorName));
    } else {
      update([...selected, constructorName]);
    }
  };

  return (
    <div className={`z-[5] ${style}`}>
      <div className="bg-yellow-500  p-2 rounded-b-lg mt-5">
        <div className="grid sm:grid-cols-5 grid-cols-4 gap-2">
          {/* Render 20 images */}
          {constructorNames.map((name, index) => (
            <div
              key={index}
              className={`bg-darkGrey flex flex-col items-center justify-center h-full rounded-lg shadow-xl ${
                selected.includes(name) ? "border-8 border-redbullRed" : ""
              }`}
              onClick={() => toggleConstructorSelection(name)}
            >
              {/* Render image content here */}
              <img
                src={`/src/ConstructorImages/${name}.avif`}
                alt={`${name}`}
                className="max-w-full max-h-full object-contain mb-1"
              />
              {/* Add label */}
              <p className="text-xs text-poppins text-white">{`${name}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
