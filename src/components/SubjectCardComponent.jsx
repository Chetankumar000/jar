import React from "react";
import { Link } from "react-router-dom";

const SubjectCardComponent = ({
  subject,
  selectedClass,
  onHover,
  onMouseLeave,
}) => {
  const svgIcons = {
    Maths: "/svg_icons/Maths.svg",
    Science: "/svg_icons/Science (2).svg",
    History: "/svg_icons/history.svg",
    Geography: "/svg_icons/geography.svg",
    ["Political Science"]: "/svg_icons/political science.svg",
    English: "/svg_icons/English.svg",
    Hindi: "/svg_icons/Hindi.svg",
    Sanskrit: "/svg_icons/sanskrit.svg",
    Economics: "/svg_icons/Economics.svg",
    ["Physics"]: "/svg_icons/Physcis.svg",
    Chemistry: "/svg_icons/Chemistry.svg",
    Biology: "/svg_icons/biology.svg",
    ["Non-academic"]: "/svg_icons/Non-Academic.svg",
    Accounts: "/svg_icons/Account.svg",
  };

  return (
    <Link
      to={`/quizme/topics/${encodeURIComponent(subject.subjectName)}`}
      state={{ selectedClass }}
      className="relative w-42 2xl:w-60 2xl:h-36 h-28 p-5 rounded-sm shadow-lg 
      bg-[#0046924D] hover:bg-[#004692]
      hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer
      text-white flex flex-col justify-between items-start backdrop-blur-lg bg-opacity-60 
      overflow-hidden" /* 👈 Ensures part of the image is clipped */
      onMouseEnter={() => onHover && onHover(subject.subjectName)}
      onTouchMove={() => onHover && onHover(subject.subjectName)}
      onMouseLeave={onMouseLeave}
    >
      {/* Subject Name */}
      <div className="py-4">
        <h3 className="text-lg 2xl:text-xl font-bold uppercase tracking-wide">
          {subject.subjectName}
        </h3>
        <p className="text-[0.75rem] 2xl:text-sm opacity-80">
          Class {selectedClass}
        </p>
      </div>

      {/* Icon Container (Partially Hidden to the Right) */}
      <div
        className="absolute right-[-1.5rem] bottom-[-0.5rem] w-28 h-28 md:w-32 md:h-32 2xl:w-36 2xl:h-36 
        flex justify-center items-center transform transition-transform duration-300 hover:rotate-12"
      >
        <img
          className="w-3/4 h-3/4 object-contain scale-125 drop-shadow-lg"
          src={svgIcons[subject.subjectName]}
          alt={subject.subjectName}
        />
      </div>
    </Link>
  );
};

export default SubjectCardComponent;
