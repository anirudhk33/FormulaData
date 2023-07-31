import React, { useState, useEffect } from "react";
import { FidgetSpinner } from "react-loader-spinner";

const LoadingComponent = () => {
  const loadingMessages = [
    "Querying Database...",
    "Scraping Latest Data...",
    "Loading ML Model...",
    "Running Prediction Algorithms...",
    "Optimizing Recommendations...",
    "Almost there...",
    "Thank you for your patience...",
    "Thank you for your patience...",
    "Thank you for your patience...",
    "Thank you for your patience...",
    "Thank you for your patience...",
    "Thank you for your patience...",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    // Update the loading message every 2 seconds
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col items-center justify-center mt-[100px] mb-[240px]">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#e30118", "#00ff00", "#0000ff"]}
          backgroundColor="#fdd900"
        />
        <h2 className="text-redbullYellow text-[30px] font-bold mt-4">
          {loadingMessages[messageIndex]}
        </h2>
      </div>
    </div>
  );
};

// redbullYellow: "#fdd900",
// redbullRed: "#e30118",
// redbullOrange: "#fd8f00",

export default LoadingComponent;
