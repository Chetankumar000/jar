import React from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

const Chatbot = ({
  chatMessages,
  chatInput,
  setChatInput,
  handleSendMessage,
  isBotTyping, // New prop to show typing indicator
}) => {
  return (
    <div className="col-span-3 border-l border-[#004692] flex flex-col rounded-lg overflow-hidden shadow-lg">
      <div className="flex justify-between bg-gradient-to-r from-[#004692] to-[#9D00FF] text-white rounded-t-md py-3 px-4">
        <h2 className="font-semibold text-xl">Chatbot</h2>
        <div className="text-sm">
          <span className="opacity-80">Assistant</span>
        </div>
      </div>

      <div className="flex-1 bg-gray-800 rounded-b-md overflow-y-auto p-4 space-y-3">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 max-w-[80%] rounded-lg text-white ${
              msg.sender === "user"
                ? "bg-[#004692] self-end ml-auto"
                : "bg-gray-700 self-start"
            }`}
          >
            {msg.text}
            <div className="text-xs text-gray-400 mt-1">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        ))}

        {isBotTyping && (
          <div className="flex items-center space-x-2 text-gray-400">
            <FaSpinner className="animate-spin text-lg" />
            <span>Typing...</span>
          </div>
        )}
      </div>

      <div className="flex items-center border-t border-gray-600 p-2 bg-gray-700">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder="Start typing..."
          className="flex-1 p-3 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-[#9D00FF]"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-[#004692] text-white rounded-lg hover:bg-[#9D00FF] transition-colors duration-200"
        >
          <FaPaperPlane className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
