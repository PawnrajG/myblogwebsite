import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
import CommentEditor from "./CommentEditor";

const Comments = ({ BlogId }) => {
  const [isToEdit, setIsToEdit] = useState(false);
  const [commentEditorData, setCommentEditorData] = useState(null);
  const { user, setUser } = useAuthStore();
  const [blogComments, setBlogComments] = useState([]);
  const [comment, setComment] = useState({
    blogId: BlogId,
    text: "",
    author: user.fullname,
  });

  useEffect(() => {
    getComments();
  }, [blogComments]);

  const handleInput = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    //console.log(comment);
    try {
      e.preventDefault();
      setComment({
        text: "",
      });
      const res = await axiosInstance.post(`/comment/post/${BlogId}`, comment);
      //console.log(res);
      toast.success(res.data.message + "!");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComments = async () => {
    try {
      setUser();
      const res = await axiosInstance.get(`/comment/get/${BlogId}`);
      //console.log(res.data);
      setBlogComments(res.data);
      //console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCommentEdit = (comment) => {
    // console.log("commented user: "+comment.author);
    // console.log("logined user: "+user.fullname);
    if (user.fullname == comment.author) {
      setCommentEditorData(comment);
      //console.log(commentEditorData);
      setIsToEdit(!isToEdit);
    } else toast.error("You can only edit your comments!");
  };

  const handleDelete = async (comment) => {
    // if(!comment||!comment.author){
    //   toast.error("Invalid data.");
    //   return;
    // }
    try {
      if (user.fullname == comment.author) {
        const res = await axiosInstance.delete(
          `/comment/delete/${comment.blogId}`,
          {
            data: {
              id: comment._id,
              author: comment.author,
              text: comment.text,
            },
          }
        );
        toast.success(res.data.message);
      } else toast.error("You can only remove your comments!");
      return;
    } catch (error) {
      console.log(error.message);
      toast.error("An error occurred while deleting the comment");
    }
  };

  return (
    <>
      {isToEdit && <CommentEditor Comment={commentEditorData} />}
      <div className="mt-9 mx-auto px-4 py-2 mb-20 max-w-[70%]">
        <h1 className="text-center text-sm md:text-4xl font-bold text-green-500 mt-6">
          Share Your Comments
        </h1>
        <form
          method="POST"
          className="flex md:flex-row p-3 mx-5 my-4 items-center flex-col"
        >
          <input
            name="text"
            onChange={handleInput}
            value={comment.text}
            className="text-[11px] md:text-sm text-gray-800 dark:text-slate-50 outline-none px-4 md:px-6 py-2 min-w-64 w-full outline-3 hover:outline-slate-300 rounded-lg m-2 md:m-3 border-2 border-gray-700"
            type="text"
            placeholder="Add your comment..."
          />
          <button
            onClick={handleSubmit}
            className="m-3 w-24 md:w-32 rounded-2xl md:px-4 md:py-2 py-1 hover:bg-slate-600 text-white bg-green-500 text-sm md:text-[17px] w-25 hover:scale-105 ease-in-out duration-200 font-medium"
            type="submit"
          >
            Comment
          </button>
        </form>
        <div className="py-3 flex flex-col justify-center items-center mb-10 px-4 md:px-10 mx-auto rounded-xl md:border-2 md:border-gray-600">
          <p>Comments</p>
          {blogComments &&
            blogComments.map((comment) => (
              <div
                key={comment._id}
                className="w-full border-b-2 min-w-72 border-gray-400 flex flex-row justify-between items-center my-4"
              >
                <div
                  onClick={() => {
                    handleCommentEdit(comment);
                  }}
                  className="cursor-pointer text-green-500 text-[11px] md:text-[14px] leading-relaxed w-64 md:w-full font-semibold"
                >
                  <span className="text-gray-800 dark:text-slate-50">
                    {"@" + comment.author}
                    <br />
                  </span>
                  {comment.text}
                </div>
                <div className="ml-4 flex text-sm justify-center rounded-lg transition ease-in-out delay-100 hover:scale-90 hover:bg-slate-700 items-center h-8 w-8 bg-black">
                  <AiFillDelete
                    onClick={() => handleDelete(comment)}
                    className="cursor-pointer md:text-lg"
                    color="white"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
