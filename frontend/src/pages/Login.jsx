import React from "react";
import { Users, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useRef } from "react";

function Login() {
  const [selectedTab, setSelectedTab] = useState("employee");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef(null);
  const [password, setPassword] = useState("");

  const handleRegisterwithAxios = async () => {
    try {
      const name = nameRef.current.value;
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("User Registered Successfully");
      setEmail("");
      setPassword("");
      nameRef.current.value = "";
      console.log("Registration response:", res.data);
    } catch (error) {
      if (error.response) {
        console.error("Registration Error:", error.response.data);
        alert(`Error: ${error.response.data.message}`);
      } else {
        console.error(error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleLoginwithFetch = async () => {
    try {
      console.log("Logging in with:", { email, password });
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Login response data:", data);

      if (res.ok) {
        alert("Logged in successfully 🎉");

        localStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (value.includes("@") && !value.endsWith("gmail.com")) {
      setError("Please enter a valid Gmail address.");
    } else {
      setError("");
    }
  };
  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center p-4">
      {/* employee and chef button toggle  */}
      <div className="flex w-full max-w-md bg-slate-100  rounded-lg shadow-md mb-4 p-3">
        <button
          onClick={() => setSelectedTab("employee")}
          className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md font-medium transition ${
            selectedTab === "employee"
              ? "bg-white text-orange-500 shadow"
              : "text-slate-500"
          }`}
        >
          <Users className="w-5 h-5" />
          Employee
        </button>

        <button
          onClick={() => setSelectedTab("chef")}
          className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-md font-medium transition ${
            selectedTab === "chef"
              ? "bg-white text-orange-500 shadow"
              : "text-slate-500"
          }`}
        >
          <UtensilsCrossed className="w-5 h-5" />
          Aunty (Chef)
        </button>
      </div>

      {/* main box */}
      <div className="bg-white p-6 rounded-b-xl shadow-md w-full max-w-md">
        {selectedTab === "employee" ? (
          <>
            <h2 className="text-xl font-semibold text-center mb-1">
              {isRegister ? "Employee Register" : "Employee Login"}
            </h2>
            <p className="text-center text-gray-500 mb-6">
              {isRegister ? "" : "Book your breakfast for tomorrow"}
            </p>
            <div className="space-y-4">
              {isRegister && (
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full border border-orange-200 rounded px-3 py-2 focus:ring-orange-400 focus:outline-none"
                  ref={nameRef}
                />
              )}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  error ? "border-red-500" : "border-orange-200"
                }`}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border border-orange-200 rounded px-3 py-2 focus:ring-orange-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition"
                onClick={
                  isRegister ? handleRegisterwithAxios : handleLoginwithFetch
                }
              >
                {isRegister ? "Register" : "Login"}
              </button>
              <p
                className="text-center mt-2 text-orange-500 cursor-pointer"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister
                  ? "Already have an account? Login here"
                  : "Need to Register?Click here"}
              </p>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-1">
              Chef Login
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Access your chef dashboard
            </p>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="अपनी ID लिखें (Enter your chef ID-)"
                className="w-full border border-orange-200 rounded px-3 py-2 focus:ring-orange-400 focus:outline-none"
              />
              <input
                type="password"
                placeholder="अपना पासवर्ड लिखें (Enter your password)"
                className="w-full border border-orange-200 rounded px-3 py-2 focus:ring-orange-400 focus:outline-none"
              />
              <button className="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600 transition">
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
