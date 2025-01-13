import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineClose } from "react-icons/ai";
import { axiosInstance } from '../lib/axios';


const CommentEditor = ({Comment}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [comment, setComment] = useState(Comment.text);
    
    const handleInput = (e)=>{
      setComment(e.target.value);
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      try{
        //console.log(comment);
        const res = await axiosInstance.put(`/comment/edit/${Comment.blogId}`,{id:Comment._id,text:comment,author:Comment.author});
        setIsOpen(false);
        toast.success(res.data.message);
      }catch(error){
        console.log(error.message);
      }
    }

  return (
    isOpen && (
    <div className='fixed top-0 left-0 w-full h-screen bg-white bg-opacity-65 mx-auto z-10 flex items-center justify-center'>
        <div className='mx-10 px-2 w-96 flex flex-col bg-slate-50 justify-center items-center pt-5 rounded-xl shadow-lg shadow-gray-600'>
            {/* <AiOutlineClose onClick={()=>setIsOpen(!isOpen)} className="ml-56 cursor-pointer" size={17} color="black"/> */}
            <h1 className='md:text-2xl text-sm mt-5 font-bold text-gray-950'>Edit your comment</h1>
            <form method='POST' className='md:h-48 flex mt-5 md:mt-10 items-center flex-col px-3'>
                <input value={comment} name="text" onChange={handleInput} className='min-w-32 text-[11px] md:text-sm text-black outline-none px-2 md:px-6 bg-white md:py-2 py-1 w-full outline-3 hover:outline-slate-300 rounded-lg m-2 md:m-3 border-2 border-gray-700' type="text"/>
                <button type="submit" onClick={handleSubmit} className='m-3 w-24 md:w-32 rounded-2xl md:px-4 md:py-2 py-1 hover:bg-slate-600 text-white bg-green-500 text-sm md:text-[17px] w-25 hover:scale-105 ease-in-out duration-200 font-medium'>Done</button>
            </form>
        </div>
    </div>
    )
  );
}

export default CommentEditor;