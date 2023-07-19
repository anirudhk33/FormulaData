import { useState } from "react";

export const DriverGrid = ({ update, selected, style }) => {
  const driverNames = [
    "Max Verstappen",
    "Sergio Perez",
    "Lewis Hamilton",
    "George Russell",
    "Charles Leclerc",
    "Carlos Sainz",
    "Fernando Alonso",
    "Lance Stroll",
    "Lando Norris",
    "Oscar Piastri",
    "Pierre Gasly",
    "Esteban Ocon",
    "Valtteri Bottas",
    "Zhou Guanyu",
    "Alexander Albon",
    "Logan Sargeant",
    "Yuki Tsunoda",
    "Daniel Ricciardo",
    "Nico Hulkenberg",
    "Kevin Magnussen",
  ];

  const toggleDriverSelection = (driverName) => {
    if (selected.includes(driverName)) {
      update(selected.filter((name) => name !== driverName));
    } else {
      update([...selected, driverName]);
    }
  };

  return (
    <div className={`z-[5] ${style}`}>
      <div className="bg-yellow-500 p-2 rounded-t-lg">
        <div className="grid sm:grid-cols-5 grid-cols-4 gap-2">
          {/* Render 20 images */}
          {driverNames.map((name, index) => (
            <div
              key={index}
              className={`bg-darkGrey flex flex-col items-center justify-center h-full rounded-lg shadow-xl ${
                selected.includes(name) ? "border-8 border-redbullRed" : ""
              }`}
              onClick={() => toggleDriverSelection(name)}
            >
              {/* Render image content here */}
              <img
                src={`/src/DriverImages/${name}.avif`}
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
