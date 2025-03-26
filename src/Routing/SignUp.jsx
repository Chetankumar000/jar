import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentClass: "",
    dream: "",
    school: "",
    phoneNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const hasCheckedLogin = useRef(false);

  useEffect(() => {
    if (!hasCheckedLogin.current) {
      const token = localStorage.getItem("token");
      if (token) {
        alert("You are already logged in");
        navigate("/");
      }
      hasCheckedLogin.current = true;
    }
  }, [navigate]);

  const validateField = (field, value) => {
    switch (field) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "email":
        return /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email address";
      case "password":
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value
        )
          ? ""
          : "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character";
      case "studentClass":
        return value === "" ? "Please select a class" : "";
      case "dream":
        return value.trim() === "" ? "Dream is required" : "";
      case "school":
        return value.trim() === "" ? "School is required" : "";
      case "phoneNumber":
        return /^[0-9]{10}$/.test(value)
          ? ""
          : "Enter a valid 10-digit phone number";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const response = await fetch("https://quizfullapp.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      const { success, message, token, error: apiError, user } = result;

      if (success) {
        login(user, token);
        navigate("/");
      } else {
        setError(message || apiError || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Start your quiz journey
        </p>

        {error && (
          <p className="p-2 mt-2 text-center text-red-600 bg-red-100 rounded">
            {error}
          </p>
        )}

        <form onSubmit={handleSignup} className="mt-6 space-y-4 text-black">
          {Object.keys(formData).map((field) => (
            <div key={field}>
              {field === "studentClass" ? (
                <select
                  name="studentClass"
                  value={formData.studentClass}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 cursor-pointer border rounded-lg focus:outline-none focus:ring-2 
                  ${
                    errors.studentClass
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }
                  ${formData.studentClass ? "text-black" : "text-gray-400"}`}
                >
                  <option value="" disabled className="text-gray-400">
                    Select Class
                  </option>
                  {[...Array(7)].map((_, i) => (
                    <option className="text-black" key={i} value={i + 6}>
                      Class {i + 6}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors[field]
                      ? "border-red-500 focus:ring-red-500"
                      : "focus:ring-purple-500"
                  }`}
                />
              )}
              {errors[field] && (
                <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
