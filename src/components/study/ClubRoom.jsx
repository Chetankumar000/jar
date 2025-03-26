import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import fireIcon from "../ClubIco/fire.png";
import earthIcon from "../ClubIco/earth.png";
import waterIcon from "../ClubIco/water.png";
import airIcon from "../ClubIco/air.png";
import etherIcon from "../ClubIco/ether.png";
import { useNavigate } from "react-router";
import ClubLoading from "./ClubLoading";
import { motion } from "framer-motion";
import useClubRoom from "../../stores/useClubRoom";

function ClubRoom() {
  const [isPopularityOpen, setPopularityOpen] = useState(false);
  const [isSectorOpen, setSectorOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [finalElement, setFinalElement] = useState(null);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();
  const { club, setClub } = useClubRoom();
  const [animationState, setAnimationState] = useState("initial");

  const sentenceVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const genres = [
    {
      id: "fire",
      name: "Fire",
      icon: fireIcon,
      gradientFrom: "rgba(255, 0, 31, 0.8)", // 80% visible (strong)
      gradientTo: "rgba(32, 3, 46, 0.6)", // 60% visible
    },
    {
      id: "earth",
      name: "Earth",
      icon: earthIcon,
      gradientFrom: "rgba(0, 187, 30, 0.9)", // 70% visible
      gradientTo: "rgba(192, 207, 12, 0.7)", // 50% visible
    },
    {
      id: "water",
      name: "Water",
      icon: waterIcon,
      gradientFrom: "rgba(0, 255, 255, 0.8)",
      gradientTo: "rgba(0, 0, 0, 0.7)", // 50% visible
    },
    {
      id: "air",
      name: "Air",
      icon: airIcon,
      gradientFrom: "rgba(255, 255, 255,1)", // 40% visible (softer white)
      gradientTo: "rgba(217, 219, 199, 0.7)", // 30% visible (light)
    },
    {
      id: "ether",
      name: "Ether",
      icon: etherIcon,
      gradientFrom: "rgba(191, 12, 130, 0.9)", // 70% visible
      gradientTo: "rgba(32, 3, 46, 0.7)", // 50% visible
    },
  ];

  // Create two separate arrays for the two rows
  const firstRowGenres = genres.slice(0, 3); // First 3 elements
  const secondRowGenres = genres.slice(3); // Remaining 2 elements
  useEffect(() => {
    // Start with title at center
    setAnimationState("initial");

    // After a delay, move title up
    const titleTimer = setTimeout(() => {
      setAnimationState("titleUp");
    }, 1000);

    // After another delay, show content
    const contentTimer = setTimeout(() => {
      setAnimationState("contentVisible");
    }, 2000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  useEffect(() => {
    if (animationState !== "contentVisible") return;

    const selectRandomElement = () => {
      setAnimating(true);

      let cycleCount = 0;
      const maxCycles = 15; // More cycles for smoother effect

      // Step 1: Fast flashing between elements
      const cycleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * genres.length);
        setSelectedElement(genres[randomIndex].id);

        cycleCount++;
        if (cycleCount >= maxCycles) {
          clearInterval(cycleInterval);

          // Step 2: Gradually slowing down
          let slowCycleCount = 0;
          let delay = 100; // Start fast
          const slowCycleInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * genres.length);
            setSelectedElement(genres[randomIndex].id);

            slowCycleCount++;
            delay += 150; // Increase delay gradually

            if (slowCycleCount >= 5) {
              clearInterval(slowCycleInterval);

              // Step 3: Final selection with consistency
              setTimeout(() => {
                const finalIndex = Math.floor(Math.random() * genres.length);
                const finalChoice = genres[finalIndex];

                // 🚀 Ensure both states update at the same time
                setSelectedElement(finalChoice.id);
                setFinalElement(finalChoice);

                setTimeout(() => {
                  setAnimating(false);
                }, 1500); // Wait 1s after animation
              }, 500);
            }
          }, delay);
        }
      }, 100);
    };

    // Start the selection process after a short delay
    const timer = setTimeout(selectRandomElement, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [animationState]);

  const getButtonStyle = (elementId) => {
    const genre = genres.find((e) => e.id === elementId);
    if (!genre) return {};

    return {
      background: `linear-gradient(to right, ${
        selectedElement === elementId
          ? `${genre.gradientFrom}, ${genre.gradientTo}`
          : "rgba(19, 97, 153, 0.7), rgba(0, 0, 0, 0.5)"
      })`,
      boxShadow:
        selectedElement === elementId
          ? "0px 0px 25px rgba(255, 255, 255, 0.5)" // Stronger glow effect
          : "none",
      transform: selectedElement === elementId ? "scale(1.1)" : "scale(1)",
      // opacity: animating && selectedElement === elementId ? 0.6 : 1, // Blinking effect
      transition: "all 0.4s ease-in-out",
    };
  };

  useEffect(() => {
    if (finalElement && !animating) {
      setClub(finalElement);

      // Show loading screen for 1.5s, then navigate
      const timer = setTimeout(() => {
        navigate("/studymaterial/clubs"); // 🔁 update to your actual route
      }, 4000); // Duration matches the animation end

      return () => clearTimeout(timer);
    }
  }, [finalElement, animating, setClub, navigate]);

  if (finalElement && !animating) {
    return <ClubLoading />;
  }

  return (
    <div className="text-white pt-12 space-y-12 flex flex-col  h-[93vh] px-4 sm:px-8 md:px-16 lg:px-32 2xl:px-48">
      {/* Top Menu Bar */}
      <div className="hidden md:block">
        <div className="flex  sm:flex-row justify-between items-center gap-4">
          <button className="flex items-center gap-2 text-xl 2xl:text-2xl font-semibold hover:bg-purple-900/30">
            The Club Room
          </button>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <button
                className="text-white text-md 2xl:text-xl font-bold 2xl:py-1 px-8 2xl:px-10 rounded-lg flex items-center justify-between lg:justify-center w-full"
                style={{
                  border: "1px solid transparent",
                  borderImage:
                    "linear-gradient(to right, #136199 45%, #10040b) 1",
                }}
                onClick={() => setPopularityOpen(!isPopularityOpen)}
              >
                Genre{" "}
                <ChevronDown className="ml-2 sm:ml-8 h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              {isPopularityOpen && (
                <div className="absolute bg-white text-black shadow-md rounded-lg mt-2 w-full sm:w-44 z-50">
                  <ul>
                    <li className="px-4 py-1 rounded-lg hover:bg-gray-200">
                      Most Popular
                    </li>
                    <li className="px-4 py-1 hover:bg-gray-200">Trending</li>
                    <li className="px-4 py-1 rounded-lg hover:bg-gray-200">
                      New
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="relative w-full sm:w-auto">
              <button
                className="text-white text-md 2xl:text-xl font-bold 2xl:py-1 px-8 2xl:px-10 rounded-lg flex items-center justify-between lg:justify-center w-full"
                style={{
                  border: "1px solid transparent",
                  borderRadius: "20px",
                  borderImage:
                    "linear-gradient(to right, #136199 40%, #10040b) 1",
                }}
                onClick={() => setSectorOpen(!isSectorOpen)}
              >
                Region{" "}
                <ChevronDown className="ml-2 sm:ml-8 h-6 w-6 sm:h-8 sm:w-8" />
              </button>
              {isSectorOpen && (
                <div className="absolute bg-white text-black shadow-md rounded-lg mt-2 w-full sm:w-44 z-50">
                  <ul>
                    <li className="px-4 py-1 rounded-lg hover:bg-gray-200">
                      Technology
                    </li>
                    <li className="px-4 py-1 hover:bg-gray-200">Arts</li>
                    <li className="px-4 py-1 rounded-lg hover:bg-gray-200">
                      Science
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`font-bold transition-all duration-1000 ease-in-out  ${
          animationState === "initial"
            ? "transform translate-y-40 scale-125"
            : "transform -translate-y-0 "
        }`}
      >
        <motion.h1
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          className="text-center 2xl:py-4 px-4 sm:px-24 text-3xl 2xl:text-4xl"
        >
          {selectedElement && !animating
            ? `Your element is ${
                genres.find((e) => e.id === selectedElement)?.name
              }`
            : "Let's get you a club"}
          <span className="inline-block text-2xl ml-2">🔮</span>
        </motion.h1>
        {animating && (
          <p className="mt-2 text-center text-blue-400">
            Selecting your element...
          </p>
        )}
      </div>

      <div
        className={`clubbody flex flex-col duration-1000 transition-opacity ${
          animationState === "contentVisible" ? "visible" : "invisible"
        }`}
      >
        {/* Genre Grid - First Row (3 tiles) */}
        <div className="mt-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 xl:gap-20 2xl:gap-36">
            {firstRowGenres.map((genre, index) => (
              <div
                key={index}
                className={`p-3 sm:p-4  rounded-lg flex items-center justify-between text-center w-full sm:w-48 md:w-52 2xl:w-64 h-24 sm:h-32 2xl:h-40 cursor-pointer`}
                style={getButtonStyle(genre.id)}
              >
                <div>
                  <img
                    src={genre.icon}
                    alt={genre.name}
                    className="w-16 h-16 sm:w-24 sm:h-24 2xl:w-32 2xl:h-32"
                  />
                </div>
                <div className="mt-2 font-bold text-2xl sm:text-3xl 2xl:text-4xl">
                  {genre.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Genre Grid - Second Row (2 tiles) */}
        <div className="mt-4 sm:mt-10 2xl:mt-16">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 lg:gap-12 xl:gap-20 2xl:gap-36">
            {secondRowGenres.map((genre, index) => (
              <div
                key={index}
                className={`p-3 sm:p-4 ${
                  genre.id === "air" &&
                  selectedElement === "air" &&
                  `text-black`
                } rounded-lg flex items-center justify-between text-center  w-full sm:w-48 md:w-52 2xl:w-64 h-24 sm:h-32 2xl:h-40 cursor-pointer`}
                style={getButtonStyle(genre.id)}
              >
                <div>
                  <img
                    src={genre.icon}
                    alt={genre.name}
                    className="w-16 h-16 sm:w-24 sm:h-24 2xl:w-32 2xl:h-32"
                  />
                </div>
                <div className="mt-2 font-bold text-2xl sm:text-3xl 2xl:text-4xl">
                  {genre.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubRoom;
