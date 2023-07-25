import React, { useState } from "react";
import LoadingComponent from "./Loading";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [bugReport, setBugReport] = useState("");
  const [showFeedback, setShowFeedback] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the feedback and bug report data
    // You can send it to your backend or perform any other desired actions

    // Clear the input fields after submission
    setFeedback("");
    setBugReport("");
    setSubmitted(true);

    // Show the feedback form again after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setShowFeedback(true);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {submitted ? (
        <div className="bg-green-500 text-white p-6 rounded-lg mx-auto max-w-xl mb-20">
          <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
          <p>Your submission has been received.</p>
        </div>
      ) : null}

      <div
        className={`bg-yellow-400 text-black p-6 rounded-lg mx-auto sm:w-[600px] w-[300px] mb-6 ${
          showFeedback && !submitted ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="feedback" className="block mb-2 font-semibold">
              We'd love some feedback regarding our work!
            </label>
            <textarea
              id="feedback"
              className="w-full px-4 py-2 rounded-lg bg-yellow-100 border border-yellow-400 focus:outline-none focus:border-yellow-500"
              rows="8"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-gray-700 hover:bg-gray-500 text-white font-semibold rounded-lg"
          >
            Submit Feedback
          </button>
        </form>
        {!submitted ? (
          <button
            className="hover:text-[15px] underline text-gray-900 text-[14px] font-semibold rounded-lg mt-2"
            onClick={() => setShowFeedback(false)}
          >
            Report a Bug Instead?
          </button>
        ) : null}
      </div>

      <div
        className={`bg-redbullOrange text-black p-6 rounded-lg mx-auto sm:w-[600px] w-[300px] ${
          !showFeedback && !submitted ? "block" : "hidden"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-4">Report a Bug</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="bugReport" className="block mb-2 font-semibold">
              Ran into Errors? Please tell us what we should fix.
            </label>
            <textarea
              id="bugReport"
              className="w-full px-4 py-2 rounded-lg bg-yellow-100 border border-yellow-400 focus:outline-none focus:border-yellow-500"
              rows="8"
              value={bugReport}
              onChange={(e) => setBugReport(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-500 text-white font-semibold rounded-lg"
          >
            Submit Bug Report
          </button>
        </form>
        {!submitted ? (
          <button
            className="  hover:text-[15px] underline text-gray-900 font-semibold rounded-lg mt-2 text-[14px]"
            onClick={() => setShowFeedback(true)}
          >
            Give Feedback Instead?
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Feedback;
