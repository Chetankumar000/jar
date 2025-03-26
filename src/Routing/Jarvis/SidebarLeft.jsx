import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

import { formatDistanceToNow } from "date-fns";

const SidebarLeft = ({
  sidebarOpen,
  toggleSidebar,
  chatHistory,
  sessionId,
  setSessionId,
  setMessages,
  startNewChat,
  userName,
  email,
}) => {
  // Improved sidebar animation variants
  const sidebarVariants = {
    open: {
      left: "0%",
      width: "400px",
      transition: {
        delay: 0.2,
        duration: 0.2,
        ease: "easeOut",
      },
    },
    closed: {
      left: "0%",
      width: "60px",
      transition: {
        delay: 0.2,
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Content fade animation variants
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  // List item animation variants
  const listItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.02,
        duration: 0.2,
        ease: "easeOut",
      },
    }),
  };

  return (
    <motion.div
      initial={sidebarOpen ? "open" : "closed"}
      animate={sidebarOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className={`bg-[#171717] py-2 flex flex-col 2xl:space-y-6 space-y-3 border-r border-[#00FFFF] h-screen shadow-lg relative`}
    >
      {/* Sidebar Toggle Button */}
      <motion.div
        whileHover={{
          backgroundColor: "#374151",
          borderRadius: "9999px",
          scale: 1.05,
        }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer flex justify-center items-center text-xl transition-all absolute right-2 w-7 h-7"
        onClick={toggleSidebar}
        title="Toggle Sidebar"
        aria-expanded={sidebarOpen}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={sidebarOpen ? "open" : "closed"}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            layout
          >
            {sidebarOpen ? <FaAngleLeft /> : <FaAngleRight />}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence mode="wait">
        {sidebarOpen ? (
          <motion.div
            key="fullSidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className=" flex flex-col h-screen"
          >
            {/* Title */}
            <div className="px-8 flex flex-col 2xl:space-y-6 space-y-4">
              <div>
                <motion.h2
                  custom={0}
                  initial="hidden"
                  animate="visible"
                  variants={contentVariants}
                  className="text-3xl font-bold flex justify-center text-[#00FFFF] pt-4 items-center"
                >
                  IndianAtoms.AI
                </motion.h2>
                <p className="text-center text-[0.5rem]">POWERED BY HEMANT</p>
              </div>

              {/* New Chat Button */}
              <motion.button
                custom={1}
                initial="hidden"
                animate="visible"
                variants={contentVariants}
                whileHover={{ scale: 1.03, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.97 }}
                onClick={startNewChat}
                className="w-full bg-blue-700 rounded-full text-white p-1.5 "
              >
                + New Chat
              </motion.button>
            </div>

            {/* Chat History List */}
            <motion.ul
              className="2xl:mt-8 mt-4 overflow-y-auto overflow-x-hidden px-4 scrollbar scrollbar-thumb-[#2F2F2F] scrollbar-track-transparent whitespace-nowrap flex-grow 2xl:max-h-[calc(100vh-260px)]  max-h-[calc(100vh-210px)] custom-scroll"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.5,
                  },
                },
              }}
            >
              {chatHistory.map((session, index) => {
                const chatTitle =
                  session.messages.length > 0
                    ? session.messages[0].text.slice(0, 30) + "..."
                    : "New Chat";

                const relativeTime = formatDistanceToNow(
                  new Date(parseInt(session.id)),
                  { addSuffix: true }
                );

                const isActive = sessionId === session.id;
                console.log(sessionId, session.id);

                return (
                  <motion.li
                    key={session.id}
                    // initial={{ opacity: 0, y: 10 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // whileHover={{ backgroundColor: "#374151" }}
                    // whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setSessionId(session.id);
                      setMessages(session.messages);
                    }}
                    className={`cursor-pointer hover:bg-[#2e2e2e] p-2 px-4 mb-2 rounded-lg flex flex-col transition-all duration-200 ${
                      isActive
                        ? "border border-l-4 border-cyan-400 bg-[#2F2F2F]"
                        : ""
                    }`}
                  >
                    <span className="text-white text-lg font-semibold truncate">
                      {chatTitle}
                    </span>
                    <span className="text-sm text-gray-400">
                      {relativeTime}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* User Info (Bottom) */}
            <motion.div
              custom={8}
              initial="hidden"
              animate="visible"
              variants={contentVariants}
              className="pt-2 border-t-[0.1rem] px-2 border-black shadow-md flex items-center gap-4 text-white mt-auto"
            >
              <motion.div className="2xl:h-12 2xl:w-12 h-8 w-8 flex items-center justify-center bg-[#00FFFF] rounded-full text-xl font-bold">
                {userName?.slice(0, 1).toLowerCase() || "u"}
              </motion.div>
              <div>
                <p className="text-md 2xl:text-lg font-semibold">
                  {userName || "username"}
                </p>
                <p className="text-xs 2xl:text-sm text-gray-300">
                  {email || "email"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="miniSidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-screen gap-4 justify-center items-center"
          >
            {/* Mini Logo */}
            <motion.div className="text-[#00FFFF] text-4xl mt-8 text-center w-12 h-12 font-bold">
              IA
            </motion.div>
            <motion.button
              onClick={startNewChat}
              className="bg-blue-700 text-2xl text-center w-10 h-10 font-bold rounded-full text-white"
            >
              +
            </motion.button>
            <motion.div className="p-2 rounded-lg shadow-md flex items-center gap-4 text-white mt-auto">
              <div className="h-10 w-10 flex items-center justify-center bg-[#00FFFF] rounded-full text-xl font-bold">
                {userName?.slice(0, 1).toLowerCase() || "u"}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SidebarLeft;
