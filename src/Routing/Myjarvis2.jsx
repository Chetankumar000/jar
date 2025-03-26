import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaCog,
  FaSyncAlt,
  FaClock,
  FaBullseye,
  FaUsers,
  FaChalkboardTeacher,
  FaBars,
  // FaPlus, // Remove if unused
} from "react-icons/fa";

import useAuthStore from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const Myjarvis2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAnimation, setTypingAnimation] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const [sessionId, setSessionId] = useState(Date.now().toString());
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const messagesEndRef = useRef(null);
  const [model, setModel] = useState("gemini");
  const [showModel, setShowModel] = useState(true);
  const user = useAuthStore.getState().user;
  const [userName, setUserName] = useState("c");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  console.log(user);

  // leftSidebarRef is defined but not used
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [sidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    user && setEmail(user?.email);
    setUserName(user?.name);
  }, [user]);

  useEffect(() => {
    setShowModel(messages.length === 0);
  }, [messages]);

  useEffect(() => {
    const savedChats = JSON.parse(localStorage.getItem("chatSessions")) || [];
    setChatHistory(savedChats);
    if (savedChats.length > 0) {
      setSessionId(savedChats[0].id); // Load last session by default
      setMessages(savedChats[0].messages);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const saveChatHistory = (updatedMessages) => {
    let updatedHistory = chatHistory.map((session) =>
      session.id === sessionId
        ? { ...session, messages: updatedMessages }
        : session
    );

    if (!updatedHistory.find((session) => session.id === sessionId)) {
      updatedHistory = [
        { id: sessionId, messages: updatedMessages },
        ...updatedHistory,
      ];
    }

    setChatHistory(updatedHistory);
    localStorage.setItem("chatSessions", JSON.stringify(updatedHistory));
  };

  const formatText = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      if (line.trim().startsWith("*") || line.trim().startsWith("-")) {
        const trimmedLine = line.trim().slice(1).trim();
        const formattedContent = trimmedLine
          .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
          .map((part, idx) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return <strong key={idx}>{part.slice(2, -2)}</strong>;
            } else if (part.startsWith("*") && part.endsWith("*")) {
              return <em key={idx}>{part.slice(1, -1)}</em>;
            }
            return part;
          });

        return (
          <ul key={i} className="list-disc pl-5">
            <li>{formattedContent}</li>
          </ul>
        );
      }

      const formattedLine = line
        .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
        .map((part, idx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={idx}>{part.slice(2, -2)}</strong>;
          } else if (part.startsWith("*") && part.endsWith("*")) {
            return <em key={idx}>{part.slice(1, -1)}</em>;
          }
          return part;
        });

      return (
        <p key={i} className="mb-2">
          {formattedLine}
        </p>
      );
    });
  };

  const addResponse = (response) => {
    setIsTyping(true);
    setTypingAnimation("");
    const words = response.split(" ");
    let currentText = "";
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        currentText += words[index] + " ";
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { type: "response", text: currentText },
        ]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 25);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const currentInput = input; // store the current input before clearing

    if (showTitle) setShowTitle(false);

    const newMessages = [
      ...messages,
      { type: "user", text: currentInput },
      { type: "response", text: "" },
    ];
    setMessages(newMessages);
    setIsLoading(true);
    setInput(""); // clear input after storing it in currentInput

    let dotIndex = 0;
    const typingInterval = setInterval(() => {
      setTypingAnimation(".".repeat((dotIndex % 3) + 1));
      dotIndex++;
    }, 500);

    try {
      const response = await axios.post(
        "https://myjarvis-2.onrender.com/chat",
        { message: currentInput }
      );
      const updatedMessages = [
        ...newMessages.slice(0, -1),
        { type: "response", text: response.data.reply },
      ];
      clearInterval(typingInterval);
      setMessages(updatedMessages);
      saveChatHistory(updatedMessages);
      addResponse(response.data.reply);
    } catch (error) {
      clearInterval(typingInterval);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: "error",
          text: "Failed to fetch response. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    const newSessionId = Date.now().toString();
    setSessionId(newSessionId);
    setMessages([]);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="flex font-roboto bg-black text-white h-screen w-full relative">
      {/* Left Sidebar */}
      <motion.div
        initial={{ left: "-100%" }} // Initially hidden on small screens
        animate={{
          left: sidebarOpen ? "0%" : isSmallScreen ? "0%" : "0%",
          width: sidebarOpen ? (isSmallScreen ? "60%" : "25%") : "4rem",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
        className={`bg-[#1a1a1a] flex flex-col p-2 space-y-4 border-r border-[#00FFFF] h-screen shadow-lg
    ${isSmallScreen ? "absolute top-0 left-0 z-50" : "relative"}
  `}
      >
        {/* Sidebar Toggle Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer flex justify-center items-center text-xl transition-all absolute right-4 
               hover:bg-slate-700 hover:rounded-full w-7 h-7"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "◀" : "▶"}
        </motion.div>

        {/* Sidebar Content */}
        {sidebarOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="px-4 flex flex-col h-screen"
          >
            {/* Title */}
            <h2 className="text-3xl font-bold flex justify-center text-[#00FFFF] pt-4 items-center">
              IndianAtoms.AI
            </h2>

            {/* New Chat Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={startNewChat}
              className="w-full bg-blue-700 rounded-full text-white p-1.5 mt-3"
            >
              + New Chat
            </motion.button>

            {/* Chat History List */}
            <motion.ul
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent flex-grow max-h-[60vh]"
            >
              {chatHistory.map((session) => (
                <motion.li
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  onClick={() => {
                    setSessionId(session.id);
                    setMessages(session.messages);
                  }}
                  className={`cursor-pointer p-2 rounded transition-all ${
                    sessionId === session.id
                      ? "bg-gray-700"
                      : "hover:bg-gray-600"
                  }`}
                >
                  {new Date(parseInt(session.id)).toLocaleString()}
                </motion.li>
              ))}
            </motion.ul>

            {/* User Info (Moved to Bottom) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-4 border-t-[0.1rem]  border-black  shadow-md flex items-center gap-4 text-white mt-auto"
            >
              {/* User Avatar / Icon */}
              <div className="h-12 w-12 flex items-center justify-center bg-[#00FFFF] rounded-full text-xl font-bold">
                {userName?.slice(0, 1).toLowerCase() || "u"}
              </div>

              {/* User Info */}
              <div>
                <p className="text-lg font-semibold">
                  {userName || "username"}
                </p>
                <p className="text-sm text-gray-300">{email || "email"}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-screen gap-4 justify-center items-center"
          >
            {/* Sidebar Collapsed Icon */}
            {/* <div
              className="cursor-pointer flex justify-center items-center text-xl transition-transform 
                   hover:bg-slate-700 hover:rounded-full w-7 h-7"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            ></div> */}

            {/* Mini Logo */}
            <div className="text-[#00FFFF] text-4xl mt-8 text-center w-12 h-12 font-bold">
              IA
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={startNewChat}
              className=" bg-blue-700 text-2xl text-center w-10 h-10 font-bold rounded-full text-white "
            >
              <div>+</div>
            </motion.button>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className=" p-2 rounded-lg shadow-md flex items-center gap-4 text-white mt-auto"
            >
              {/* User Avatar / Icon */}
              <div className="h-10 w-10 flex items-center justify-center bg-[#00FFFF] rounded-full text-xl font-bold">
                {userName?.slice(0, 1).toLowerCase() || "u"}
              </div>

              {/* User Info */}
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 w-full flex flex-col justify-between items-center  relative`}
      >
        {/* Dropdown */}
        <div
          className={`w-full ${
            isSmallScreen && "pl-20"
          } px-6 py-3 flex border-b-[0.1rem] gap-4 border-b-gray-800`}
        >
          <div
            onClick={handleGoHome}
            className="bg-[#00FFFF] rounded-full cursor-pointer"
          >
            <img
              className="h-8 2xl:h-12 "
              src="/svg_icons/i.svg"
              alt="indianAtoms"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-[0.7rem] 2xl:text-[1rem] text-gray-200">
              {" "}
              IndianAtoms.Ai
            </div>
            <div className="flex gap-4">
              <div className="text-[0.7rem] 2xl:text-[0.9rem] text-gray-400">
                Version: v1
              </div>
              <div className="text-[0.7rem] 2xl:text-[0.9rem] text-gray-400">
                LLM: {model}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex-1 2xl:w-[60%]  ${
            isSmallScreen ? "pl-20" : "w-[65%]"
          } px-4 flex flex-col justify-between items-center overflow-y-auto mx-auto relative transition-all duration-50`}
        >
          {/* Title and Subtitle */}
          {messages.length === 0 && (
            <div className="mt-[10rem]">
              <h1 className="text-2xl 2xl:text-4xl text-center font-bold text-[#00FFFF]">
                What can I help with?
              </h1>
              <p className="italic 2xl:text-3xl text-gray-400 mt-2">
                "Journey of long miles starts with a small step."
              </p>
            </div>
          )}
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto  w-full px-4 mt-4 space-y-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-black">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex  ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-2xl px-3 2xl:text-[0.9rem] font-thin text-xs py-2 rounded-xl shadow-md leading-relaxed 
    ${
      message.type === "user"
        ? "bg-gray-900 text-white"
        : message.type === "response"
        ? "text-white"
        : "bg-red-500 text-white"
    }
  `}
                >
                  <div className="space-y-2">
                    {message.type === "response" || message.type === "error"
                      ? formatText(message.text || typingAnimation)
                      : message.text}
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Section */}
          <div
            className={`w-full ${
              messages.length === 0 ? "mb-[12rem]" : " mb-4"
            }`}
          >
            <JarvisInput
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              isTyping={isTyping}
              model={model}
              setModel={setModel}
              showModel={showModel}
            />
          </div>
        </div>
        {/* <div className="absolute top-4 left-[10rem] transform -translate-x-1/2">
          <div
            className="flex items-center space-x-2 cursor-pointer text-white hover:text-orange-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>DeepSeek V3</span>
            <FaChevronDown />
          </div>
          {dropdownOpen && (
            <div className="absolute mt-2 bg-gray-800 rounded-md shadow-md p-2 w-32">
              <p className="cursor-pointer hover:bg-gray-700 p-1">Option 1</p>
              <p className="cursor-pointer hover:bg-gray-700 p-1">Option 2</p>
              <p className="cursor-pointer hover:bg-gray-700 p-1">Option 3</p>
            </div>
          )}
        </div> */}
      </div>

      {/* Right Sidebar with Icons */}
      <div className="w-12 bg-black flex flex-col items-center space-y-6 py-6 text-white border-l border-gray-800">
        <FaBars className="cursor-pointer text-xl" />
        <FaChalkboardTeacher className="cursor-pointer text-xl" />
        <FaUsers className="cursor-pointer text-xl" />
        <FaBullseye className="cursor-pointer text-xl" />
        <FaClock className="cursor-pointer text-xl" />
        <FaSyncAlt className="cursor-pointer text-xl" />
        <FaCog className="cursor-pointer text-xl" />
      </div>
    </div>
  );
};

export default Myjarvis2;
