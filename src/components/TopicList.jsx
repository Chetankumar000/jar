import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import TopicCard from "./TopicCard";
import CircularProgressBar from "./CircularProgressBar";
import LoadingScreen from "./LoadingScreen";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function TopicList() {
  const [ChapterLoading, setChapterLoading] = useState(true);
  const { subjectId } = useParams();
  const [progress, setProgress] = useState(53);
  const [Chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const is2xl = useMediaQuery({ minWidth: 1536 });

  console.log(selectedTopics);

  const topics = Array.from({ length: 12 }, (_, index) => `TOPIC ${index + 1}`);

  const navigate = useNavigate();
  const location = useLocation();
  let { selectedClass } = location.state || {};
  selectedClass = `Class ${selectedClass}`;
  const subjectName = subjectId;

  useEffect(() => {
    if (subjectName && selectedClass) {
      setChapterLoading(true);
      const fetchTopics = async () => {
        try {
          const response = await fetch(
            "https://quizfullapp.onrender.com/quizStart",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ step: 2, selectedClass, subjectName }),
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch topics, status: ${response.status}`
            );
          }

          const data = await response.json();
          setChapters(data || []);
          setChapterLoading(false);
        } catch (error) {
          console.error("Error fetching topics:", error);
        }
      };

      fetchTopics();
    }
  }, [subjectName, selectedClass]);

  const handleContinueBtn = () => {
    if (!selectedChapter) {
      alert("Please select a chapter before continuing.");
      return;
    }

    navigate(`/quizme/difficulty/${subjectId}/${selectedChapter}`, {
      state: { selectedClass },
    });
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSelectTopic = (topic) => {
    setSelectedTopics((prevSelected) => {
      if (prevSelected.includes(topic)) {
        // Deselect if already selected
        return prevSelected.filter((t) => t !== topic);
      } else {
        // Select if not already selected
        return [...prevSelected, topic];
      }
    });
  };

  return ChapterLoading ? (
    <LoadingScreen />
  ) : (
    <div className="px-3">
      {/* Header Section */}
      <div className="flex w-full items-center gap-6 mt-2 2xl:mt-5">
        {/* Back Button */}
        <div
          onClick={handleGoBack}
          className="cursor-pointer h-8 w-8 2xl:h-12 2xl:w-12"
        >
          <svg
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.6045 38.1667L39.9378 61.5L34.0003 67.3334L0.666992 34L34.0003 0.666687L39.9378 6.50002L16.6045 29.8334H67.3337V38.1667H16.6045Z"
              fill="white"
            />
          </svg>
        </div>

        {/* Subject Information and Progress */}
        <div className="flex justify-between w-full">
          <div>
            <h1 className="text-3xl 2xl:text-5xl p-0 font-bold">
              {subjectName}
            </h1>
            <p className="text-gray-500 p-0 text-md 2xl:text-2xl">
              {selectedClass}
            </p>
          </div>
          <div className="mr-14">
            <CircularProgressBar
              percentage={progress}
              size={is2xl ? 80 : 60}
              strokeWidth={is2xl ? 10 : 8}
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto rounded-md shadow-lg py-3 2xl:py-5 px-14">
        <div className="flex text-white">
          {/* Left Panel: Chapters */}
          <div className=" w-[30%] 2xl:w-[27%] border-4 border-[#004692]">
            <h2 className="text-center 2xl:text-2xl font-bold bg-[#004692] py-1 mb-1">
              CHAPTERS
            </h2>
            <div
              className={` overflow-y-auto scrollbar-thin h-[calc(76vh-4rem)] 2xl:h-[calc(72vh-4rem)] scrollbar-thumb-gray-500 scrollbar-track-black `}
            >
              <ul>
                {Chapters.map((chapter, index) => (
                  <li
                    onClick={() => setSelectedChapter(chapter.topicName)}
                    key={index}
                    className={`p-2 hover:bg-[#004692] text-xs 2xl:text-lg cursor-pointer ${
                      selectedChapter === chapter.topicName
                        ? "bg-[#004692]"
                        : index % 2 === 0
                        ? "bg-black"
                        : ""
                    }`}
                  >
                    {index + 1}. {chapter.topicName}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Panel: Topics */}
          <div className="w-[70%] 2xl:w-[73%] bg-[#0046924D] 2xl:px-8 px-4 mx-auto">
            <h2 className="text-center 2xl:text-2xl font-bold py-2 rounded-md mb-4">
              TOPICS
            </h2>

            {/* First row (5 topics) */}
            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-5 gap-12 2xl:gap-16 px-4">
                {topics.slice(0, 5).map((topic, index) => (
                  <TopicCard
                    key={index}
                    topic={topic}
                    isSelected={selectedTopics.includes(topic)}
                    onSelect={handleSelectTopic}
                  />
                ))}
              </div>
            </div>

            {/* Second row (5 topics) */}
            <div className="flex justify-center mt-6">
              <div className="grid grid-cols-5 gap-12 2xl:gap-16 px-4">
                {topics.slice(5, 10).map((topic, index) => (
                  <TopicCard
                    key={index}
                    topic={topic}
                    isSelected={selectedTopics.includes(topic)}
                    onSelect={handleSelectTopic}
                  />
                ))}
              </div>
            </div>

            {/* Third row (2 topics centered) */}
            <div className="flex justify-center mt-6">
              <div className="grid grid-cols-2 gap-12 2xl:gap-16 px-4">
                {topics.slice(10, 12).map((topic, index) => (
                  <TopicCard
                    key={index}
                    topic={topic}
                    isSelected={selectedTopics.includes(topic)}
                    onSelect={handleSelectTopic}
                  />
                ))}
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center 2xl:py-16 py-8 2xl:mb-4">
              <motion.button
                onClick={handleContinueBtn}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#7A00CC",
                  boxShadow: "0px 4px 10px rgba(157, 0, 255, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1  bg-[#9D00FF] text-sm 2xl:text-lg text-white font-bold rounded-xl transition-all duration-300"
              >
                Continue
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicList;
