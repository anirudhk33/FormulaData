import React, { useState } from "react";

const Form = ({
  budget,
  track,
  chips,
  strategy,
  setBudget,
  setTrack,
  setChips,
  setStrategy,
}) => {
  const handleIncrement = () => {
    const newBudget = parseFloat(budget);
    if (newBudget <= 150) {
      setBudget((newBudget + 0.5).toFixed(1));
    }
  };

  const handleDecrement = () => {
    const newBudget = parseFloat(budget);
    if (newBudget >= 50) {
      setBudget((newBudget - 0.5).toFixed(1));
    }
  };

  const handleChipChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setChips((chips) => [...chips, value]);
    } else {
      setChips((chips) => chips.filter((chip) => chip !== value));
    }
  };

  const options = [
    { value: "Mega Driver", label: "Mega Driver" },
    { value: "Wildcard", label: "Wildcard" },
    // Add more options for other chips
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="bg-black pt-4 pr-2 ">
      <form onSubmit={handleSubmit} className=" mx-auto relative z-10">
        <div className="mb-6">
          <label htmlFor="budget" className="text-white text-lg font-semibold">
            Budget (in million USD):
          </label>
          <div className="flex items-center mt-1">
            <button
              type="button"
              onClick={handleDecrement}
              className="bg-yellow-500 text-black rounded-l-md py-2 px-3 hover:bg-yellow-600"
            >
              -
            </button>
            <input
              type="text"
              id="budget"
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="flex-grow bg-gray-800 text-white rounded-md py-2 px-3  focus:outline-none focus:ring focus:border-yellow-500"
            />
            <button
              type="button"
              onClick={handleIncrement}
              className="bg-yellow-500 text-black rounded-r-md py-2 px-3 hover:bg-yellow-600"
            >
              +
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="track" className="text-white text-lg font-semibold">
            Track:
          </label>
          <select
            id="track"
            name="track"
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="block w-full bg-gray-800 text-white rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-yellow-500"
          >
            <option value="">Select the track</option>
            <option value="bahrain">Bahrain</option>
            <option value="saudi-arabia">Saudi Arabia</option>
            <option value="australia">Australia</option>
            <option value="azerbaijan">Azerbaijan</option>
            <option value="miami">Miami</option>
            <option value="monaco">Monaco</option>
            <option value="spain">Spain</option>
            <option value="canada">Canada</option>
            <option value="austria">Austria</option>
            <option value="great-britain">Great Britain</option>
            <option value="hungary">Hungary</option>
            <option value="belgium">Belgium</option>
            <option value="netherlands">Netherlands</option>
            <option value="italy">Italy</option>
            <option value="singapore">Singapore</option>
            <option value="japan">Japan</option>
            <option value="qatar">Qatar</option>
            <option value="united-states">United States</option>
            <option value="mexico">Mexico</option>
            <option value="brazil">Brazil</option>
            <option value="las-vegas">Las Vegas</option>
            <option value="abu-dhabi">Abu Dhabi</option>

            {/* Add more track options */}
          </select>
        </div>

        <div>
          <label className="text-white text-lg font-semibold ">
            Chips Available for Use:
          </label>
          <div className="space-y-2 mt-2 mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Limitless"
                checked={chips.includes("Limitless")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">Limitless</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Wildcard"
                checked={chips.includes("Wildcard")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">Wildcard</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="Final Fix"
                checked={chips.includes("Final Fix")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">Final Fix</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                value="Autopilot"
                checked={chips.includes("Autopilot")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">Autopilot</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                value="No Negative"
                checked={chips.includes("No Negative")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">No Negative</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                value="Extra DRS"
                checked={chips.includes("Extra DRS")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">Extra DRS</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                value="All of the above"
                checked={chips.includes("All of the above")}
                onChange={handleChipChange}
                className="form-checkbox h-5 w-5 text-yellow-500"
              />
              <span className="ml-2 text-white">All of the above</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="strategy"
            className="text-white text-lg font-semibold"
          >
            Strategy:
          </label>
          <select
            id="strategy"
            name="strategy"
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="block w-full bg-gray-800 text-white rounded-md py-2 px-3 mt-1 focus:outline-none focus:ring focus:border-yellow-500"
          >
            <option value="">Select optimization strategy</option>
            <option value="High Risk, High Reward">
              High Risk, High Reward
            </option>
            <option value="Balanced">Balanced</option>
            <option value="Budget Increase">Budget Increase</option>
            {/* Add more strategy options */}
          </select>
        </div>
      </form>
    </div>
  );
};

export default Form;
