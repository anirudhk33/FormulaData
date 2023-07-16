import React from "react";
import styles from "../style";
import fantasy from "../assets/fantasy.avif";
import react from "../assets/react.svg";
import { Button } from "./Button";
import alex from "../DriverImages/alex.avif";
import carlos from "../DriverImages/carlos.avif";
import charles from "../DriverImages/charles.avif";
import fernando from "../DriverImages/fernando.avif";
import esteban from "../DriverImages/esteban.avif";
import george from "../DriverImages/george.avif";
import guanyu from "../DriverImages/guanyu.avif";
import nyck from "../DriverImages/nyck.avif";
import yuki from "../DriverImages/yuki.avif";
import valtteri from "../DriverImages/valtteri.avif";
import kevin from "../DriverImages/kevin.avif";
import nico from "../DriverImages/nico.avif";
import logan from "../DriverImages/logan.avif";
import pierre from "../DriverImages/pierre.avif";
import oscar from "../DriverImages/oscar.avif";
import lando from "../DriverImages/lando.avif";
import lance from "../DriverImages/lance.avif";
import lewis from "../DriverImages/lewis.avif";
import sergio from "../DriverImages/sergio.avif";
import max from "../DriverImages/max.avif";

export const FantasyBuilder = () => {
  const driverNames = [
    "max",
    "sergio",
    "lewis",
    "george",
    "charles",
    "carlos",
    "fernando",
    "lance",
    "lando",
    "oscar",
    "pierre",
    "esteban",
    "valtteri",
    "guanyu",
    "alex",
    "logan",
    "yuki",
    "nyck",
    "nico",
    "kevin",
  ];

  return (
    <section className={`flex md:flex-row flex-col py-16 justify-between`}>
      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <div className="bg-gray-200 p-4 relative z-[5]">
          <div className="grid grid-cols-5 gap-4">
            {/* Render 20 images */}
            {driverNames.map((name, index) => (
              <div
                key={index}
                className="bg-white flex flex-col items-center justify-center h-20 rounded-md shadow-md"
              >
                {/* Render image content here */}
                <img
                  src={`/src/DriverImages/${name}.avif`}
                  alt={`${name}`}
                  className="max-w-full max-h-full object-contain"
                />
                {/* Add label */}
                <p className="text-xs text-gray-600 mt-1">{`${name}`}</p>
              </div>
            ))}
          </div>
        </div>
        {/* gradient start */}
        <div className="absolute z-[0] w-[30%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[60%] h-[60%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[20%] h-[20%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};
