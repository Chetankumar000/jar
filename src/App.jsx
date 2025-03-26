// Import styles and libraries
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import Pages (Organized and grouped for readability)
import Home from "./Routing/Home";
import Quizme from "./Routing/Quizme";

import StudyMaterial from "./Routing/StudyMaterial";
import LeaderBoard from "./Routing/LeaderBoard";
import QuizStartPage from "./Routing/QuizStartPage";
import QuizQuestionPage from "./Routing/QuizQuestionPage";
import QuizResult from "./Routing/QuizResult";
import Body from "./Routing/Body";
import Login from "./Routing/Login";
import SignUp from "./Routing/SignUp";
import Profile from "./Routing/Profile";
import ShopComponent from "./Routing/ShopComponent";
import ShoppingCart from "./components/ShoppingCart";
import Payment from "./Routing/Payment";
import Shop from "./Routing/Shop";
// Import Components (components are smaller units within pages)
import SubjectSelectCard from "./components/SubjectSelectCard";
import TopicList from "./components/TopicList";
import DifficultySelection from "./components/DifficultySelection";
import useAuthStore from "./stores/useAuthStore";
import { useEffect } from "react";
import MyJarvis from "./Routing/Jarvis/MyJarvis";
import Myjarvis2 from "./Routing/Myjarvis2";
import { elements } from "chart.js";
import ClubRoom from "./components/study/ClubRoom";
import ClubRoom2 from "./components/study/ClubRoom2";
import ClubRoom3 from "./components/study/ClassRomm3";
import MainScreen from "./components/study/MainScreen";
import Members from "./components/study/Members";
import Leader from "./components/study/Leader";

// Centralized route configuration
const routes = [
  {
    path: "/", // Root path, defaults to Home
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    element: <Body />, // Wraps the following routes with Header
    children: [
      {
        path: "quizme",
        element: <Quizme />,
        children: [
          { index: true, element: <SubjectSelectCard /> }, // Default child for /quizme
          { path: "subjects/:classId", element: <SubjectSelectCard /> },
          { path: "topics/:subjectId", element: <TopicList /> },
          {
            path: "difficulty/:subjectId/:topicId",
            element: <DifficultySelection />,
          },
          // { path: "quizQuestionPage", element: <QuizQuestionPage /> },
          { path: "quizResult", element: <QuizResult /> },
          // {
          //   path: "quizstart",
          //   element: <QuizQuestionPage />,
          // },
        ],
      },
      { path: "login", element: <Login /> },
      { path: "signUp", element: <SignUp /> },
      { path: "profile", element: <Profile /> },
      // { path: "myjarvis", element: <MyJarvis /> },
      {
        path: "studymaterial",
        element: <StudyMaterial />,
        children: [
          {
            path: "",
            element: <ClubRoom />,
          },
          {
            path: "clubs",
            element: <ClubRoom2 />,
          },
          {
            path: "clubDesk",
            element: <ClubRoom3 />,
          },
          {
            path: "mainScreen",
            element: <MainScreen />,
          },
          {
            path: "members",
            element: <Members />,
          },
          {
            path: "leader",
            element: <Leader />,
          },
        ],
      },
      { path: "leaderboard", element: <LeaderBoard /> },
      { path: "quizstartpage", element: <QuizStartPage /> },
    ],
  },
  {
    path: "myjarvis",
    element: <MyJarvis />,
  },
  { path: "quizstart", element: <QuizQuestionPage /> },
  {
    element: <ShopComponent />, // Wraps the following routes with Header
    children: [
      {
        path: "shop",
        element: <Shop />,
      },
      { path: "/cart", element: <ShoppingCart /> },
      { path: "/payment", element: <Payment /> },
    ],
  },
];

// Create router instance
const router = createBrowserRouter(routes);

// Main App component
function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth(); // Initialize authentication when app starts
  }, [initializeAuth]);
  return (
    <div className="bg-[#000E1B] font-inter text-white min-h-screen">
      <div className="mx-auto shadow-lg bg-black 2xl:shadow-slate-700 min-h-screen ">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
