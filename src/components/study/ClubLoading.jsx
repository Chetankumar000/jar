import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useClubRoom from "../../stores/useClubRoom";

const ClubLoading = () => {
  const navigate = useNavigate();
  const { club } = useClubRoom();

  return (
    <div className=" flex min-h-[93.5vh]  flex-col justify-center items-center bg-black text-white text-center p-6 overflow-hidden">
      <h1 className="text-4xl font-semibold animate-fadeIn">
        You've been assigned to:
      </h1>

      {/* ✅ Corrected Style Attribute */}
      <div
        style={{
          background: `linear-gradient(to right, ${club?.gradientFrom}, ${club?.gradientTo})`,
        }}
        className="mt-6 p-6 rounded-lg shadow-lg animate-pulse"
      >
        <h2
          className={`text-6xl ${club?.id === "air" && "text-black"} font-bold`}
        >
          {club.name}
        </h2>
      </div>

      <p className="mt-4 text-lg text-gray-300 animate-fadeInSlow">
        Redirecting you to your club...
      </p>
    </div>
  );
};

export default ClubLoading;
