import React, { useState } from "react";

const BugReports = () => {
  const [feedback, setFeedback] = useState("");
  const [bugReport, setBugReport] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Process the feedback and bug report data
    // You can send it to your backend or perform any other desired actions

    // Clear the input fields after submission
    setFeedback("");
    setBugReport("");
  };

  return (
    <div className="bg-redbullYellow text-black p-6 rounded-lg mx-auto max-w-md mt-20">
      <h2 className="text-2xl font-semibold mb-4">Feedback & Bug Report</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="feedback" className="block mb-2">
            Feedback
          </label>
          <textarea
            id="feedback"
            className="w-full px-4 py-2 rounded-lg bg-yellow-100 border border-yellow-400 focus:outline-none focus:border-yellow-500"
            rows="4"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="bugReport" className="block mb-2">
            Bug Report
          </label>
          <textarea
            id="bugReport"
            className="w-full px-4 py-2 rounded-lg bg-yellow-100 border border-yellow-400 focus:outline-none focus:border-yellow-500"
            rows="4"
            value={bugReport}
            onChange={(e) => setBugReport(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-gray-700 hover:bg-gray-500 text-white font-semibold rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BugReports;
