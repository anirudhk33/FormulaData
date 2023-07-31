import React from "react";
import styles from "../style";
import fantasy from "../assets/fantasy.avif";
// import fantasy2 from "../assets/fantasy2.avif";
import fantasy2 from "../assets/fantasy2.jpeg";
import react from "../assets/react.svg";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export const Hero = () => {
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://formuladataapi.onrender.com/api/f1/circuit_data`
      );
      console.log("Successful Activation");
    } catch (error) {
      console.error(`Error fetching initial data`, error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col pt-10 pb-0  justify-between`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 pr-10 sm:pl-20 pl-[50px]`}
      >
        {/* <div className="flex flex-row items-center py-[6px] px-4 bg-discount-gradient rounded-[10px] mb-2">
          <img src={react} alt="discount" className="w-[32px] h-[32px]" />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">New Update: </span>Access{" "}
            <span className="text-white">race weather history</span> from past
            75+ years
          </p>
        </div> */}

        <div>
          <div className="flex flex-row justify-between items-center w-full">
            <h1 className="flex-1 font-poppins font-semibold ss:text-[69px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
              Build your
              <br className="sm:block hidden" />{" "}
              <span className=" text-redbull-yellow"> F1 Fantasy</span>{" "}
            </h1>
            {/* <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div> */}
          </div>

          <h1 className="font-poppins font-semibold ss:text-[69px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
            Team.
          </h1>
        </div>

        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Our algorithm leverages AI to create the optimal F1 fantasy team based
          on race data since 1950. The model is customizable according to your
          fantasy budget and chip usage.
        </p>
        <div className={` ${styles.flexStart} flex-row px-0 `}>
          <Button
            onClick={() => {
              navigate("/FantasyBuilder");
            }}
            styles={`mt-10 mr-4 py-3 px-4 bg-redbull-yellow`}
            text="Get Started"
          />
          <Button
            onClick={() => {
              navigate("/Api");
            }}
            styles={`mt-10 py-3 px-4 bg-redbull-yellow`}
            text="Use our API"
          />
        </div>
      </div>
      {/* <div className={` ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
        <Button styles={`mt-5`} text="Get Started" />
        <Button styles={`mt-3 mb-11`} text="Use our API" />
      </div> */}

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <img
          src={fantasy2}
          alt="fantasy image"
          className=" w-[100%] h-[100%] relative z-[5] sm:mr-40 mr-0 ml-0 "
        />

        {/* gradient start */}
        {/* <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" /> */}
        {/* gradient end */}
      </div>

      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};
