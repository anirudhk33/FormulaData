import React, { useState } from "react";
import styles from "../style";
import fantasy from "../assets/fantasy.avif";
import react from "../assets/react.svg";
import { Button } from "./Button";
import { DriverGrid } from "./DriverGrid";
import { ConstructorGrid } from "./ConstructorGrid";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

export const FantasyBuilder = () => {
  const navigate = useNavigate();
  const [currentDrivers, setCurrentDrivers] = useState([]);
  const [currentConstructors, setCurrentConstructors] = useState([]);
  const [chipsUsed, setChipsUsed] = useState(null);
  const [budget, setBudget] = useState(100.0);
  const [track, setTrack] = useState(null);
  const [chips, setChips] = useState([]);
  const [strategy, setStrategy] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [checkbox, setCheckbox] = useState(false);
  const numPages = 3;

  const handleCheckbox = (e) => {
    setCheckbox(!checkbox);
  };

  return (
    <section className={`flex py-10 justify-between`}>
      <div className="flex flex-col  items-center">
        <h2 className="text-white font-poppins font-semibold text-2xl leading-9 mb-7">
          Fantasy Builder
        </h2>
        <div className="flex sm:flex-row flex-col sm:justify-center gap-40 items-center">
          <div className="w-5/12 ">
            {currentPage === 0 && (
              <>
                <h3 className="text-white font-poppins font-medium text-lg leading-7 mb-0">
                  Please answer the following questions so we can adapt our
                  algorithm according to your requirements.
                </h3>
                <div className="mt-0">
                  <Form
                    budget={budget}
                    track={track}
                    chips={chips}
                    strategy={strategy}
                    setBudget={setBudget}
                    setTrack={setTrack}
                    setChips={setChips}
                    setStrategy={setStrategy}
                  />
                </div>
              </>
            )}
            <div className="flex flex-row items-center py-[6px] px-3 bg-discount-gradient rounded-[10px] mb-3">
              <p
                className={`font-poppins font-normal text-dimWhite text-[16px] leading-[25px] ml-2`}
              >
                <span className="text-white">
                  For optimal prediction accuracy, we recommend selecting your
                  fantasy team after all practice sessions of the GP weekend.
                  This ensures that we have sufficient data to assess driver
                  performance under current track conditions.
                </span>
              </p>
            </div>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="practicedata"
                checked={checkbox == true}
                onChange={handleCheckbox}
                className="form-checkbox h-4 w-4 text-yellow-500 mt-1 mb-1"
              />
              <span className="ml-2 text-white text-[15px]">
                Check this if the practice session for the GP weekend has
                already taken place.
              </span>
            </label>

            <Button
              onClick={() => {
                if (currentPage > 0) setCurrentPage(currentPage - 1);
              }}
              styles={`mt-4 py-2 px-2 bg-redbull-yellow`}
              text="Generate Recommendations"
            />
          </div>
          <div className="sm:w-2/5 ">
            <h3 className="text-white font-poppins font-medium text-lg leading-7 mb-7">
              Please select your current fantasy team.
            </h3>
            {currentPage === 0 && (
              <>
                <DriverGrid
                  style=""
                  update={setCurrentDrivers}
                  selected={currentDrivers}
                />
                <ConstructorGrid
                  style=""
                  update={setCurrentDrivers}
                  selected={currentDrivers}
                />
              </>
            )}
          </div>
        </div>

        {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
      </div>
    </section>
  );
};
