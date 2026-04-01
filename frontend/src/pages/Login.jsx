import React, { useState } from 'react';
import {useNavigate} from 'react-router';
import api from '../api/axios';

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try{
      const res = await api.post("/auth/login", form);
      // console.log(res.data);
      //Save Token to localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("isAdmin", res.data.user.isAdmin);

      setMsg(res.data.message);
      //Redirect to Home after 1 sec
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }catch(error){
      setMsg(error.response?.data?.message || "An error occured");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

        {msg && (
          <div className="mb-4 text-center text-sm text-blue-600 font-medium">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg active:scale-95 hover:bg-blue-700 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
