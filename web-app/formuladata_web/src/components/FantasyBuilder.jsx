import React, { useState } from "react";
import styles from "../style";
import fantasy from "../assets/fantasy.avif";
import react from "../assets/react.svg";
import { Button } from "./Button";
import { DriverGrid } from "./DriverGrid";
import { ConstructorGrid } from "./ConstructorGrid";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "./Loading";
import { Results } from "./Results";
import SliderModal from "./SliderModal";

export const FantasyBuilder = () => {
  const navigate = useNavigate();
  const [currentDrivers, setCurrentDrivers] = useState([]);
  const [currentConstructors, setCurrentConstructors] = useState([]);
  const [budget, setBudget] = useState(100.0);
  const [track, setTrack] = useState("");
  const [chips, setChips] = useState([]);
  const [strategy, setStrategy] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [generateRec, setGenerateRec] = useState(false);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const images = [
    "../assets/fantasy.avif",
    "../assets/fantasy.avif",
    "../assets/fantasy.avif",
    // Add more image URLs as needed
  ];

  const recommend = () => {
    if (isNaN(parseFloat(budget))) {
      setErrorMessage("Please Enter a Valid Budget");
      return;
    }
    if (budget < 50 || budget > 150) {
      setErrorMessage(
        "Please Enter a Budget Value between 50 and 150 (USD mill.)"
      );
      return;
    }

    if (track === "") {
      setErrorMessage("Please Select a Track");
      return;
    }

    if (strategy === "") {
      setErrorMessage("Please Select a Strategy");
      return;
    }

    if (currentDrivers.length !== 5 && currentDrivers.length !== 0) {
      setErrorMessage("Please Select Either Zero or Five Drivers");
      return;
    }

    if (currentConstructors.length !== 2 && currentConstructors.length !== 0) {
      setErrorMessage("Please Select Either Zero or Two Constructors");
      return;
    }

    if (currentConstructors.length === 2 && currentDrivers.length !== 5) {
      setErrorMessage("Please Select Five Drivers or Zero Constructors");
      return;
    }

    if (currentConstructors.length === 0 && currentDrivers.length !== 0) {
      setErrorMessage("Please Select Zero Drivers or Two Constructors");
      return;
    }

    setGenerateRec(true);
    console.log("CHECK");
    let fp = checkbox ? "yes" : "no";
    axios
      .get(
        `https://formuladataapi.onrender.com/api/f1/predictions?location=${track}&fp=${fp}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data for ${track}:`, error);
        setErrorMessage("Error Fetching Data");
        setGenerateRec(false);
      });
  };

  const handleCheckbox = (e) => {
    setCheckbox(!checkbox);
  };

  return (
    <section className={` pt-20 pb-3 justify-between`}>
      {generateRec && !data ? (
        <LoadingComponent />
      ) : generateRec ? (
        <Results
          data={data}
          currentDrivers={currentDrivers}
          currentConstructors={currentConstructors}
          budget={budget}
          track={track}
          chips={chips}
          strategy={strategy}
        />
      ) : (
        // ////////////////
        // ////////////////
        // ////////////////
        <div>
          <div className="flex sm:flex-row flex-col items-center justify-between mb-10 px-[40px] sm:pb-[40px] pb-0] ">
            <h2 className="text-gray-200 font-poppins font-semibold text-[28px] sm:text-[36px] leading-9 ">
              Fantasy Builder: Formula One 2023
            </h2>
            {/* ///////// FIND ME /////// */}
            {/* <div>
              <h1>Modal Slider Page</h1>
              <button
                className="text-white"
                onClick={() => setModalIsOpen(true)}
              >
                Open Modal
              </button>
              <SliderModal
                images={images}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
              />
            </div> */}
            {/* //////// FIND ME */}
            {/* Modal button */}
            <button
              className="text-redbullYellow hover:underline font-bold focus:outline-none mr-3 self-center self-center pt-3 sm:pt-0"
              onClick={() => setShowModal(true)}
            >
              New to F1 Fantasy?
            </button>
          </div>

          {showModal && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setShowModal(false);
                }
              }}
            >
              <div className="bg-black bg-opacity-50 fixed inset-0"></div>
              <div className="relative bg-gray-800 p-8 sm:max-w-2xl w-full rounded-lg shadow-lg z-10 container ss:text-xs sm:text-[13px]">
                {/* Close button (X) */}
                <button
                  className="absolute top-4 right-6 text-redbullYellow text-[24px] font-normal font-lunas focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  x
                </button>
                <h3 className="text-redbullYellow font-semibold text-xl mb-4">
                  Welcome to F1 Fantasy!
                </h3>
                <p className="text-gray-300">
                  <span className="font-bold text-white">
                    What is F1 Fantasy?
                    <br />
                  </span>
                  F1 Fantasy is a free online game developed and hosted by
                  Formula One. Each player needs to select a team of 5 drivers
                  and 2 constructors while staying within their allocated
                  budget. After every grand prix weekend, each driver and
                  constructor is awarded points based on their real-life
                  performance. The goal is to build a high-performing team
                  within the budget constraints. Click{" "}
                  <a
                    href="https://fantasy.formula1.com/en/game-rules"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-yellow-300 hover:underline hover:cursor-pointer"
                  >
                    here
                  </a>{" "}
                  to learn more about the game rules.
                </p>
                <br />
                <p className="text-gray-300">
                  <span className="font-bold text-white">
                    What does our Fantasy Builder do?
                    <br />
                  </span>
                  Our Fantasy Builder assists F1 Fantasy players in selecting
                  their optimal fantasy team week after week. Our model takes
                  into account all relevant variables, including but not limited
                  to budget constraints, weather predictions, penalties, and
                  driver stock prices before providing a recommendation.
                  Additionally, we have integrated Machine Learning models
                  trained on 50+ years of data to predict every aspect of the
                  race, further enhancing our recommendations.
                </p>
                <br />
                <p className="text-gray-300">
                  <span className="font-bold text-white">
                    Never Played Before?
                    <br />
                  </span>
                  Get started with a budget of $100 million. Select "All of the
                  above" for Chip Availability. Choose the optimization strategy
                  according to your preference. For your first game, do not
                  select any Drivers or Constructors. Once you generate
                  recommendations, please visit the{" "}
                  <a
                    href="https://fantasy.formula1.com/en/create-team"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-yellow-300 hover:underline hover:cursor-pointer"
                  >
                    F1 Fantasy site
                  </a>{" "}
                  to finalize your fantasy team.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col  items-center">
            {/* <h2 className="text-gray-200 font-poppins font-semibold text-[32px] leading-9 mb-[80px]">
            Fantasy Builder: Formula One 2023
          </h2> */}
            <div className="flex sm:flex-row flex-col sm:justify-center sm:gap-40 gap-10 sm:items-stretch items-center">
              <div className="sm:w-5/12 w-4/5 flex-col self-start sm:self-center sm:ml-0 ml-10">
                <h3 className="text-gray-200 font-poppins font-medium sm:text-lg text-md leading-7 mb-0 sm:ml-0 ">
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

                <div className="flex flex-row items-center py-[6px] px-3 bg-discount-gradient rounded-[10px] mb-3">
                  <p
                    className={`font-poppins font-normal text-gray-200 text-[16px] leading-[25px] ml-2`}
                  >
                    <span className="text-white">
                      For optimal prediction accuracy, we recommend selecting
                      your fantasy team after all practice sessions of the GP
                      weekend. This ensures that we have sufficient data to
                      assess driver performance under current track conditions.
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
                  <span className="ml-2 text-gray-200 text-[15px]">
                    Check this if the practice session for the GP weekend has
                    already taken place.
                  </span>
                </label>

                <Button
                  onClick={recommend}
                  styles={`mt-4 py-2 px-2 bg-redbull-yellow`}
                  text="Generate Recommendations"
                />

                <p className="text-redbullRed mt-1 ml-1 text-[14px] font-bold">
                  {errorMessage}
                </p>
              </div>
              <div className="sm:w-2/5 ">
                <h3 className="text-gray-200 font-poppins font-medium text-lg leading-7 mb-7">
                  Please select your current fantasy team below.
                </h3>
                {
                  <>
                    <DriverGrid
                      style=""
                      update={setCurrentDrivers}
                      selected={currentDrivers}
                    />
                    <ConstructorGrid
                      style=""
                      update={setCurrentConstructors}
                      selected={currentConstructors}
                    />
                  </>
                }
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
