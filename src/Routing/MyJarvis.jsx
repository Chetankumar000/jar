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
import JarvisInput from "../components/JarvisInput";

const MyJarvis = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingAnimation, setTypingAnimation] = useState("");
  const [showTitle, setShowTitle] = useState(true);
  const [sessionId, setSessionId] = useState(Date.now().toString());
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const messagesEndRef = useRef(null);
  const [model, setModel] = useState("gemini");
  // leftSidebarRef is defined but not used

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <div className="flex bg-black text-white h-screen w-full relative">
      {/* Left Sidebar */}
      <motion.div
        animate={{
          width: sidebarOpen ? (isSmallScreen ? "50%" : "25%") : "3rem",
          position: isSmallScreen && sidebarOpen ? "absolute" : "relative",
          zIndex: isSmallScreen && sidebarOpen ? 100 : "auto",
        }}
        transition={{ duration: 0.5 }}
        className={`bg-[#1a1a1a] flex flex-col p-2 space-y-4 border-r border-red-500 transition-all h-screen ${
          isSmallScreen && sidebarOpen ? "shadow-lg" : ""
        }`}
      >
        {/* FaCog Always Visible */}
        {/* <FaCog
          className="cursor-pointer text-xl transition-transform duration-200 transform absolute top-4 left-4"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ transform: sidebarOpen ? "rotate(0deg)" : "rotate(90deg)" }}
        /> */}
        <div
          className="cursor-pointer text-xl transition-transform duration-10 relative transform "
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            transform: sidebarOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          ▶️
        </div>

        {/* Sidebar Content (Only Visible When Open) */}
        {sidebarOpen ? (
          <>
            <h2 className="text-xl font-bold flex justify-center text-orange-600 items-center space-x-2 ">
              <span>IndianAtoms.AI</span>
            </h2>

            <h3 className="font-semibold mb-3 text-lg text-white">History</h3>
            <button
              onClick={startNewChat}
              className="w-full bg-blue-600 text-white p-2 mt-3 rounded"
            >
              + New Chat
            </button>

            <ul className="mt-4 overflow-y-auto max-h-[60vh]">
              {chatHistory.map((session) => (
                <li
                  key={session.id}
                  onClick={() => {
                    setSessionId(session.id);
                    setMessages(session.messages);
                  }}
                  className={`cursor-pointer p-2 rounded ${
                    sessionId === session.id ? "bg-gray-700" : ""
                  }`}
                >
                  {new Date(parseInt(session.id)).toLocaleString()}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <div className="text-orange-600 text-center bg-black rounded-full w-6 font-bold">
              IA
            </div>
          </>
        )}
      </motion.div>

      {/* Main Chat Area */}
      <div className="flex-1 w-full flex flex-col justify-between items-center pb-2  relative">
        {/* Dropdown */}
        <div className="w-full px-6 py-3 flex border-b-[0.1rem] gap-4 border-b-gray-800">
          <div className="bg-orange-600 rounded-full">
            <img className="h-8 " src="/svg_icons/i.svg" alt="indianAtoms" />
          </div>
          <div className="flex flex-col">
            <div className="text-[0.7rem] text-gray-200"> IndianAtoms.Ai</div>
            <div className="flex gap-4">
              <div className="text-[0.7rem] text-gray-400">Version: v1</div>
              <div className="text-[0.7rem] text-gray-400">LLM: gemini</div>
            </div>
          </div>
        </div>
        <div
          className={`flex-1 ${
            isSmallScreen ? "w-[100%]" : "w-[65%]"
          } px-4 flex flex-col justify-between items-center overflow-y-auto mx-auto relative transition-all duration-50`}
        >
          {/* Title and Subtitle */}
          {showTitle && (
            <div className="mt-[10rem]">
              <h1 className="text-2xl text-center font-bold text-orange-600">
                What can I help with?
              </h1>
              <p className="italic text-gray-400 mt-2">
                "Journey of long miles starts with a small step."
              </p>
            </div>
          )}
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto w-full px-4 mt-4 space-y-4 scrollbar-thin scrollbar-thumb-black scrollbar-track-black">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-2xl px-3py-2 rounded-xl shadow-md ${
                    message.type === "user"
                      ? "bg-gray-900  text-white"
                      : message.type === "response"
                      ? " text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {message.type === "response" || message.type === "error"
                    ? formatText(message.text || typingAnimation)
                    : message.text}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          {/* Input Section */}
          <div className="w-full">
            <JarvisInput
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              isTyping={isTyping}
              model={model}
              setModel={setModel}
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

export default MyJarvis;
