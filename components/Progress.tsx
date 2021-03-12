/**
 *-------------------------------------------------------------------------------------------------------------------
 * FILE: Progress.tsx
 * PACKAGE: components
 * AUTHOR: Mohammed SalmanKhan M A
 * DATE: 03/12/2021
 * VERSION: 0.1
 * ABSTRACT: This page is responsible to show progress of file uploading.
 * HISTORY: - Mohammed SalmanKhan M A - created fist cut of the code.
 * -------------------------------------------------------------------------------------------------------------------
 */

import PropTypes from "prop-types";

const Progress = ({ percentage }) => {
  console.log("Percenta", percentage);
  return (
    <div className="progress" style={{ width: "200px" }}>
      <div
        className="progress-bar progress-bar-striped bg-success"
        role="progressbar"
        style={{ width: `${percentage}` }}
      >
        {percentage}% here
      </div>
    </div>
  );
};

Progress.protoTypes = {
  percentage: PropTypes.number.isRequired,
};

export default Progress;
