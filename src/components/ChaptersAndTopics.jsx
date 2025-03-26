import React from "react";

const ChaptersAndTopics = () => {
  const chapters = [
    "Life Sciences",
    "Lenses",
    "Microscopic World",
    "Water",
    "Air",
    "Biosphere",
    "Atoms and Molecules",
    "Plants and Animals",
    "Electricity and Magnetism",
  ];

  const topics = Array.from({ length: 12 }, (_, index) => `TOPIC ${index + 1}`);

  return (
    <div className="  flex text-white">
      {/* Left Panel: Chapters */}
      <div className="w-1/3 border-4 border-[#004692]">
        <h2 className="text-center text-lg font-bold bg-[#004692] py-2 -md mb-1">
          CHAPTERS
        </h2>
        <ul>
          {chapters.map((chapter, index) => (
            <li
              key={index}
              className={`p-2 ${
                index % 2 === 0 ? "bg-black" : ""
              } hover:bg-blue-600 cursor-pointer`}
            >
              {index + 1}. {chapter}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel: Topics */}
      <div className="w-2/3 bg-[#0046924D] px-2">
        <h2 className="text-center text-lg font-bold py-2 rounded-md mb-4">
          TOPICS
        </h2>
        <div className="grid grid-cols-4 gap-4 px-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="w-32 h-32 p-6 bg-[#000E1B] hover:bg-[#004692] rounded-lg text-center flex items-center justify-center cursor-pointer"
            >
              {topic}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-4">
          <button className="px-2 py-2 bg-[#9D00FF] text-white font-bold rounded-2xl hover:bg-purple-700">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChaptersAndTopics;
