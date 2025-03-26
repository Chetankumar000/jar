import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import {
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineRotateRight,
  AiOutlineFullscreen,
  AiOutlineUpload,
} from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

// ✅ Use a stable worker to prevent errors
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js`;

const PDFViewer = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    if (pdfContainerRef.current) {
      pdfContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPdfFile(reader.result);
        setCurrentPage(1); // Reset page on new file upload
      };
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPdfFile(reader.result);
        setCurrentPage(1);
      };
    }
  };

  const handleFullScreen = () => {
    if (pdfContainerRef.current) {
      pdfContainerRef.current.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    }
  };

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-lg shadow-lg w-full h-full ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2 className="text-md font-semibold mb-2">📄 PDF Viewer</h2>

      {/* Upload PDF */}
      <div className="flex gap-4 mb-4 text-xs">
        <label className="cursor-pointer bg-blue-500 text-white px-1  py-1 rounded-lg flex items-center gap-2">
          <AiOutlineUpload size={20} />
          Upload PDF
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-1 py-2 rounded-lg flex items-center gap-2 bg-gray-500 text-white text-xs"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* PDF Display */}
      {pdfFile ? (
        <div className="w-full flex flex-col items-center">
          <div className="flex gap-4 mb-2">
            <button
              className="bg-gray-400 p-2 rounded-lg text-white"
              onClick={() => setScale((prev) => Math.min(prev + 0.1, 3))}
            >
              <AiOutlineZoomIn size={10} />
            </button>
            <button
              className="bg-gray-400 p-2 rounded-lg text-white"
              onClick={() => setScale((prev) => Math.max(prev - 0.1, 0.5))}
            >
              <AiOutlineZoomOut size={10} />
            </button>
            <button
              className="bg-gray-400 p-2 rounded-lg text-white"
              onClick={() => setRotation((prev) => prev + 90)}
            >
              <AiOutlineRotateRight size={10} />
            </button>
            <button
              className="bg-gray-400 p-2 rounded-lg text-white"
              onClick={handleFullScreen}
            >
              <AiOutlineFullscreen size={10} />
            </button>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded-lg"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <input
              type="range"
              min="1"
              max={numPages}
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="w-40"
            />
            <span>
              Page {currentPage} of {numPages}
            </span>
            <button
              className="bg-blue-500 text-xs text-white px-3 py-1 rounded-lg"
              disabled={currentPage >= numPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>

          {/* PDF Pages */}
          <div
            ref={pdfContainerRef}
            className="overflow-hidden border p-2 shadow-lg rounded-lg bg-gray-100"
          >
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                setCurrentPage(1);
              }}
              onLoadError={(error) =>
                console.error("Error loading PDF:", error)
              }
            >
              <Page pageNumber={currentPage} scale={scale} rotate={rotation} />
            </Document>
          </div>

          {/* Page Navigation */}
        </div>
      ) : (
        <div className="p-10 text-center border-2 border-dashed border-gray-500 rounded-lg w-full h-40 flex items-center justify-center">
          <p className="text-gray-600">
            Drag and drop a PDF file here or click "Upload PDF" to select one.
          </p>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
