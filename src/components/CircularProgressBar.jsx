import React, { useState, useEffect, useRef } from "react";

const CircularProgressBar = ({
  percentage,
  size = 80,
  strokeWidth = 10,
  progressColor = "#39FF14", // Progress ring color
  bgColor = "#D9D9D9", // Background ring color
  textColor = "#FFFFFF", // Percentage text color
  innerCircleColor = "transparent", // Inner circle fill color
  innerCircleBorderColor = "#000000", // Inner circle border color
  innerCircleBorderWidth = 1, // Border width of the inner circle
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const requestRef = useRef();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
  const offset = circumference - (animatedPercentage / 100) * circumference;

  useEffect(() => {
    const start = animatedPercentage;
    const duration = 1000; // Animation duration in milliseconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const newPercentage = start + (normalizedPercentage - start) * progress;

      setAnimatedPercentage(Math.round(newPercentage));

      if (progress < 1) {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(requestRef.current);
  }, [percentage]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Outer Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-out"
        />

        {/* Inner Circle with Border */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2} // Slightly smaller to fit inside
          fill={innerCircleColor}
          stroke={innerCircleBorderColor}
          strokeWidth={innerCircleBorderWidth}
        />
      </svg>

      {/* Centered Percentage Text */}
      <div
        className="absolute font-semibold"
        style={{
          fontSize: `${size / 4}px`,
          color: textColor,
        }}
      >
        {animatedPercentage}%
      </div>
    </div>
  );
};

export default CircularProgressBar;
