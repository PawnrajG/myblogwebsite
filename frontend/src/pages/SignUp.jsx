import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
const SignUp = () => {
    const {user,isAuthenticated,signup} = useAuthStore();
    const [formData , setFormData] = useState({
        fullname : "",
        email : "",
        password : ""
    });

    const handleInput = (e) =>{
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
    };

    const validateForm = ()=>{
        if(!formData.fullname){
            return toast.error('Give fullname');
        }
        if(!/\S+@\S+\.\S+/.test(formData.email)){
            return toast.error('Give valid email');
        }
        if(!formData.email){
            return toast.error('Give email');
        }
        if(!formData.password){
            return toast.error('Give password');
        }
        if(formData.password.length < 6){
            return toast.error('Give password atleast 6 characters');
        }
        return true;
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const success = validateForm();
        if(success===true){
            signup(formData);
        }
    };
  
  return (
    <div className="flex items-center justify-center m-2 min-w-64">
        <form className="w-96 h-96 p-5 my-24 bg-black text-white flex flex-col rounded-md shadow-lg shadow-neutral-900">
            <h2 className="text-gray-500 text-lg md:text-2xl mx-3 my-2">Create your account</h2>
            <input onChange={handleInput} value={formData.fullname} className="m-3 px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 transition delay-75 hover:outline-cyan-500 outline-none" type="text" name="fullname" placeholder="Fullname" required/>
            <input onChange={handleInput} value={formData.email} className="m-3 px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 transition delay-75 hover:outline-cyan-500 outline-none" type="email" name="email" placeholder="Email" required/>
            <input onChange={handleInput} value={formData.password} className="m-3 px-4 py-2 rounded-md bg-slate-600 hover:bg-slate-700 transition delay-75 hover:outline-cyan-500 outline-none" type="password" name="password" placeholder="Password" required/>
            <div className="flex flex-col items-center justify-center m-2">
                <button onClick={handleSubmit} className="text-md text-white text-center bg-cyan-500 px-2 py-1 rounded-md w-24 my-4 cursor-pointer" type="submit">Signup</button>
            </div>
        </form>
    </div>
  )
}

export default SignUp;