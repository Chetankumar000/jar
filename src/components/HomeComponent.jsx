import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HomeComponent = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Lazy loading the video using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.load(); // Start loading video only when component is in view
          observer.disconnect(); // Stop observing once loaded
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Static Background Image as Placeholder */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-cover bg-center ${
          isVideoLoaded ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
        style={{
          backgroundColor: "black",
        }}
      ></div>

      {/* Background Video */}
      <div
        className={`fixed top-0 left-0 w-full h-full overflow-hidden transition-opacity duration-500 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          playsInline
          ref={videoRef}
          onCanPlayThrough={() => setIsVideoLoaded(true)} // When video is ready
        >
          <source src="/img/bgvideo2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-[8%]">
          <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-8">
            {/* Left Section */}
            <div className="md:w-1/2 w-full mt-auto flex justify-center md:justify-start">
              <div className="flex flex-col items-center md:items-start">
                {/* Call-to-Action Button */}
                <div className="bg-cover bg-no-repeat w-full h-full flex justify-center items-center bg-center">
                  <div className="m-3 px-5">
                    <Link to="/quizme">
                      <button className="rounded-full px-6 py-2 font-bold bg-blue-500 hover:bg-blue-600 text-white mt-5 text-sm sm:text-base md:text-lg lg:text-xl">
                        LET’S PLAY
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex gap-2 mt-5">
                  <a href="#">
                    <img
                      className="w-6 h-6 sm:w-8 sm:h-8"
                      src="/img/homeellip2.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      className="w-6 h-6 sm:w-8 sm:h-8"
                      src="/img/homeellip1.png"
                      alt=""
                    />
                  </a>
                  <a href="#">
                    <img
                      className="w-6 h-6 sm:w-8 sm:h-8"
                      src="/img/homeellip2.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="md:w-1/3 w-full flex justify-center items-center flex-col">
              <img
                className="w-40 sm:w-52 md:w-72 mt-4"
                src="img/homeimage.png"
                alt=""
              />
              <p className="text-white text-center text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mt-4 px-4 sm:px-0">
                “Let’s create our own AI assistant”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
