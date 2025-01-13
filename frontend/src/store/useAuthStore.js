import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import toast from 'react-hot-toast';


//custom hook to authenticate user when they visit the site
export const useAuthStore = create((set)=>({
    user: null,
    isSigningUp: false,
    isLoggingIn: false,
    isAuthenticated: true,
    setUser: async()=>{
        try{
            const res = await axiosInstance.get("/auth/check");
            set({user:res.data});
        }catch(error){
            
            set({user:null});
            console.log(error);
            //toast.error(error.response.data.message);

        }finally{
            set({isAuthenticated:false});
        }
    },

    signup: async(formData)=>{
        set({isSigningUp : true});
        try{
            const res = await axiosInstance.post("/auth/signup",formData);
            set({user:res.data});
            toast.success("Account created for you!");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp: false});
        }
    },

    login: async(formData)=>{
        set({isLoggingIn:true});
        try{
            const res = await axiosInstance.post("/auth/login",formData);
            set({user:res.data});
            toast.success("Logged in your account!");
        }catch(error){
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn: false});
        }
    },
    
    logout: async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({user:null});
            toast.success("Logged out successfully");
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
}));