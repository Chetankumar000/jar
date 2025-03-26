// import React, { useState, useEffect } from "react";

// const ProgressBar = ({ percentage }) => {
//   const [currentPercentage, setCurrentPercentage] = useState(0);

//   useEffect(() => {
//     let animation;

//     // Gradually increase the progress from 0 to the target percentage
//     if (currentPercentage < percentage) {
//       animation = setInterval(() => {
//         setCurrentPercentage((prev) => {
//           if (prev >= percentage) {
//             clearInterval(animation); // Stop the animation once we reach the target
//             return percentage;
//           }
//           return Math.min(prev + 1, percentage); // Increment progress gradually
//         });
//       }, 75); // Adjust the interval speed (10ms for smoother animation)
//     }

//     // Cleanup interval
//     return () => clearInterval(animation);
//   }, [percentage, currentPercentage]);

//   return (
//     <div className="w-full">
//       {/* Percentage Label */}
//       <div className="text-center 2xl:text-2xl mb-1 2xl:mb-2 font-semibold">
//         {currentPercentage}%
//       </div>

//       {/* Progress Bar Container */}
//       <div className="w-full bg-[#FFFFFF14] rounded-full h-3 border border-[#FFFFFF14]">
//         <div
//           className="bg-[#39FF14] h-[0.65rem] rounded-full transition-all duration-300 border border-[#FFFFFF14]"
//           // style={{
//           //   width: `${currentPercentage}%`,
//           // }}
//           style={{
//             transform: `scaleX(${currentPercentage / 100})`,
//             transformOrigin: "left",
//           }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default ProgressBar;

import React, { useEffect, useState } from "react";

const ProgressBar = ({ percentage = 0 }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev < percentage) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 50);

    // Cleanup the interval on unmount or if value changes
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="w-full">
      {/* Percentage Label */}

      <div className="text-center 2xl:text-2xl mb-1 2xl:mb-2 font-semibold">
        {value}%
      </div>
      <div className="progress w-full h-5 border border-gray-600 bg-[#FFFFFF14] relative overflow-hidden rounded-xl">
        {/* <span
          className="font-semibold text-xl w-full absolute flex justify-center items-center"
          style={{ color: value > 49 ? "white" : "black" }}
        >
          {value}%
        </span> */}
        <div
          className="h-full bg-[#39FF14]"
          role="progressbar"
          aria-valuemax="100"
          aria-valuemin="0"
          aria-valuenow={value}
          // style={{ width: `${pert}%` }}
          style={{
            transform: `scaleX(${value / 100})`,
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
