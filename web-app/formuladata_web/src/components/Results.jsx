import * as functions from "../algorithms";
import axios from "axios";
import React, { useEffect, useState } from "react";

export const Results = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    // Make the API request to your Flask backend
    axios
      .get("http://127.0.0.1:5000/api/f1/fp_scraping?location=spain")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  console.log(data);

  // // // // ALGORITHMIC IMPLEMENTATION
  // Receive: Predicted Race Order in String Array Form
  //
  const driverChoices = [
    "Max Verstappen",
    "George Russell",
    "Charles Leclerc",
    "Fernando Alonso",
    "Daniel Ricciardo",
  ];
  const constructorChoices = ["Red Bull Racing", "Aston Martin"];

  // // // // DISPLAY IMPLEMENTATION

  return (
    <div className="flex items-center justify-center mt-[60px] ">
      <div className="flex flex-row items-center mb-20 px-14 bg-discount-gradient overflow-scroll rounded-[30px] w-4/5 pb-12">
        <p className="w-full h-full max-w-full max-h-full font-poppins font-normal text-white text-[16px] leading-[30px] ml-2">
          <div className="flex flex-col items-center justify-center mt-8 ">
            <h2 className=" text-[25px] font-bold leading-[50px] mb-10">
              Optimal Fantasy Team
            </h2>
            <h3 className=" text-[20px] font-medium leading-[50px] mb-10">
              Drivers
            </h3>
            <div className="grid sm:grid-cols-5 grid-cols-4 gap-2">
              {/* Render 20 images */}
              {driverChoices.map((name, index) => (
                <div
                  key={index}
                  className={`bg-darkGrey flex flex-col items-center justify-center h-full rounded-lg shadow-xl border-2 border-white`}
                >
                  {/* Render image content here */}
                  <img
                    src={`/src/DriverImages/${name}.avif`}
                    alt={`${name}`}
                    className="max-w-full max-h-full object-contain mb-1"
                  />
                  {/* Add label */}
                  <p className="text-md text-poppins text-white">{`${name}`}</p>
                </div>
              ))}
            </div>
            <h3 className=" text-[20px] font-medium leading-[50px] mb-10 mt-20">
              Constructors
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {/* Render 20 images */}
              {constructorChoices.map((name, index) => (
                <div
                  key={index}
                  className={`bg-darkGrey flex flex-col items-center justify-center h-full rounded-lg shadow-xl border-2 border-white`}
                >
                  {/* Render image content here */}
                  <img
                    src={`/src/ConstructorImages/${name}.avif`}
                    alt={`${name}`}
                    className="w-2/3 max-h-full object-contain mb-1"
                  />
                  {/* Add label */}
                  <p className="text-md text-poppins text-white">{`${name}`}</p>
                </div>
              ))}
            </div>
          </div>
        </p>
      </div>
    </div>
  );
};
