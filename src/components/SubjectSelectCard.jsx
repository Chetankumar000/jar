import React, { useState, useEffect } from "react";
import SubjectCardComponent from "./SubjectCardComponent";
import { getClasses } from "../utils/api";
import ProgressBar from "./ProgressBar";
import { useAsyncError, useNavigate } from "react-router";
import LoadingScreen from "./LoadingScreen";
import { motion } from "framer-motion";
import useAuthStore from "../stores/useAuthStore";

const SubjectSelectComponent = () => {
  const [standards, setStandards] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subLoading, setSubLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true); // Handles subjectData loading
  const [progress, setProgress] = useState();
  const [subjectData, SetSubjectData] = useState();
  const navigate = useNavigate();
  const [TotalAvgPercentage, setTotalAvgPercentage] = useState(0);
  const [hoverSubject, setHoverSubject] = useState(
    "   What are you studying today?"
  );
  const user = useAuthStore.getState().user;

  console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      setProgress(0);
      setDataLoading(true); // Start loading for subject data

      if (user) {
        setSelectedStandard(user?.studentClass);

        try {
          const subjectsData = await getSubjectsData(user);
          console.log(subjectsData);
          SetSubjectData(subjectsData?.subjects);
          setTotalAvgPercentage(
            Math.ceil(subjectsData?.totalAverageProgress) || 0
          );
          setProgress(Math.ceil(subjectsData?.totalAverageProgress) || 0);
        } catch (error) {
          console.error("Error fetching subjects data:", error);
        } finally {
          setDataLoading(false); // Stop loading after API response
        }
      } else {
        try {
          const classes = await getClasses();
          setStandards(classes);
          if (classes.length > 0) {
            setSelectedStandard(classes[0].id);
          }
        } catch (error) {
          console.error("Error fetching classes:", error);
        } finally {
          setDataLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    if (selectedStandard) {
      setSubLoading(true);
      getSubjects(selectedStandard)
        .then((subjects) => {
          setSubjects(subjects.slice(0, 8));
        })
        .catch((error) => console.error("Error fetching subjects:", error))
        .finally(() => setSubLoading(false)); // Ensure loading stops
    }
  }, [selectedStandard]);

  const handleStandardChange = (e) => {
    setSelectedStandard(e.target.value);
  };

  // Function to fetch subjects for a class
  const getSubjects = async (selClass) => {
    try {
      const response = await fetch(
        "https://quizfullapp.onrender.com/quizStart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ step: 1, selectedClass: `Class ${selClass}` }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }
  };

  // Function to fetch subject progress data
  const getSubjectsData = async (user) => {
    try {
      const url = `https://quizfullapp.onrender.com/api/subject-progress/${
        user.id
      }/Class%20${encodeURIComponent(user.studentClass)}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch subjects data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data || [];
    } catch (error) {
      console.error("Error fetching subjects:", error.message);
      return [];
    }
  };

  const handleGoBack = () => navigate(-1);

  const handleMouseLeave = () => {
    // setHoverSubject("");
    // setProgress(TotalAvgPercentage || 0);
  };

  const onHover = (subj) => {
    setHoverSubject(subj);
    const subject = subjectData?.filter((s) => s.subject === subj) || [];
    setProgress(Math.ceil(subject[0]?.progressPercentage) || 0);
  };

  // ✅ Show LoadingScreen when either subjects or subjectData is loading
  if (subLoading || dataLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="flex-grow px-4 md:px-8 lg:px-12 2xl:mt-4 2xl:py-10 pt-5 pb-2">
      <div className="flex justify-between">
        <div
          onClick={handleGoBack}
          className="cursor-pointer h-6 w-6 md:h-12 md:w-12 2xl:h-16 2xl:w-16"
        >
          <svg
            // width="50"
            // height="50"
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
        {!user && (
          <select
            id="standard-select"
            value={selectedStandard}
            onChange={handleStandardChange}
            className="mb-4 md:mb-2 text-sm md:text-base px-2 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg shadow-sm cursor-pointer text-black 2xl:mr-20"
          >
            {standards.map((standard) => (
              <option key={standard.id} value={standard.id}>
                {standard.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {subLoading ? (
        <LoadingScreen />
      ) : (
        subjects.length > 0 && (
          <div className="w-full py-6 md:py-10 px-6 md:px-16 font-inter">
            <motion.h2
              key={hoverSubject} // Key forces re-render & animation on change
              className="text-xl md:text-3xl 2xl:text-6xl font-bold text-white text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {hoverSubject
                ? `${hoverSubject}?`
                : "What are you studying today?"}
            </motion.h2>
            <div className="mt-4 md:mt-5 2xl:mt-8">
              <ProgressBar key={progress} percentage={progress} />
            </div>
            <div className="px-4 sm:px-8 md:px-16 2xl:px-32 py-5 2xl:py-10">
              {/* First Row (Subjects) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center">
                {subjects.slice(0, 5).map((subject) => (
                  <SubjectCardComponent
                    key={subject.subjectName}
                    subject={subject}
                    selectedClass={selectedStandard}
                    onHover={onHover}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>

              {/* Second Row (Centered Below) */}
              <div className="flex justify-center mt-6 md:mt-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full sm:w-4/5 md:w-[60%]">
                  {subjects.slice(5, 8).map((subject) => (
                    <SubjectCardComponent
                      key={subject.subjectName}
                      subject={subject}
                      selectedClass={selectedStandard}
                      onHover={onHover}
                      onMouseLeave={handleMouseLeave}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default SubjectSelectComponent;
