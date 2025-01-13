import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Login = () => {
  const { user, login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Give valid email");
    }
    if (!formData.email) {
      return toast.error("Give email");
    }
    if (!formData.password) {
      return toast.error("Give password");
    }
    if (formData.password.length < 6) {
      return toast.error("Give password atleast 6 characters");
    }
    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      login(formData);
    }
    //console.log({user});
    //console.log(formData);
  };
  return (
    <div className="flex items-center justify-center m-2 min-w-64">
      <form className="w-96 h-96 p-5 my-24 bg-black text-white flex flex-col rounded-md shadow-lg shadow-neutral-900">
        <h2 className="text-gray-500 text-lg md:text-2xl mx-3 my-2">
          Login to your account
        </h2>
        <input
          value={formData.email}
          onChange={handleInput}
          className="m-3 px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 transition delay-75 hover:outline-cyan-500 outline-none"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          value={formData.password}
          onChange={handleInput}
          className="m-3 px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 transition delay-75 hover:outline-cyan-500 outline-none"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <div className="flex flex-col items-center justify-center m-2">
          <button
            onClick={handleSubmit}
            type="submit"
            className="text-md text-white text-center bg-cyan-500 px-2 py-1 rounded-md w-24 my-4 cursor-pointer"
          >
            Login
          </button>
          <div className="flex flex-row mx-3 my-3">
            <p className="m-2 text-[10px] md:text-sm">
              If you don't have an account -
            </p>
            <Link
              to="/signup"
              className="my-2 text-[10px] md:text-sm text-center text-cyan-500"
            >
              Signup
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
