import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false); // toggle between Login & Signup
  const [form, setForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // handle login form input
  const handleLoginChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // handle signup form input
  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  // Sign In Function
  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
      (u) =>
        u.email === form.email.trim().toLowerCase() &&
        u.password === form.password
    );

    if (userFound) {
      toast.success("✅ Login Successful!");
      setTimeout(() => navigate("/manager"), 1200);
    } else {
      toast.error("❌ Invalid email or password!");
    }
  };

  // Create Account Function
  const handleSignup = (e) => {
    e.preventDefault();
    if (
      !signupForm.name ||
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    if (users.some((u) => u.email === signupForm.email.trim().toLowerCase())) {
      toast.error("⚠️ User already exists!");
      return;
    }

    const newUser = {
      name: signupForm.name,
      email: signupForm.email.trim().toLowerCase(),
      password: signupForm.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    toast.success("🎉 Account Added Successfully!");
    setSignupForm({ name: "", email: "", password: "", confirmPassword: "" });
    setIsSignup(false); // switch back to login
  };

  // Toggle password visibility
  const togglePassword = () => {
    if (passwordRef.current.type === "password") {
      passwordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-30 blur-[100px]"></div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account" : "Sign In"}
        </h2>

        {!isSignup ? (
          // Login Form
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleLoginChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                ref={passwordRef}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-3 top-2 text-sm text-gray-500 hover:text-gray-700"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/snxksidl.json"
                  //   ref={ref}
                  trigger="hover"
                  colors="primary:#121331,secondary:#30e849"
                ></lord-icon>
              </button>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(true)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                New User?
              </button>
            </div>
          </form>
        ) : (
          // Signup Form
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={handleSignupChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
            />
            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/snxksidl.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#30e849"
                  style={{ width: "24px", height: "24px" }}
                ></lord-icon>
              </button>
            </div>

            {/* Confirm Password Field */}
            <div className="relative mt-3">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 border rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2"
              >
                <lord-icon
                  src="https://cdn.lordicon.com/snxksidl.json"
                  trigger="hover"
                  colors="primary:#121331,secondary:#30e849"
                  style={{ width: "24px", height: "24px" }}
                ></lord-icon>
              </button>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setIsSignup(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={1500} />
    </div>
  );
}
