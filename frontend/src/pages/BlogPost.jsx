import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import React from "react";
import { useState } from "react";

const BlogPost = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleInput = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const imageUploaded = e.target.files[0]; // Get the first file
    if (imageUploaded) {
      setImage(imageUploaded);
      setImagePreview(URL.createObjectURL(imageUploaded)); // Generate preview URL
      //console.log(imageUploaded);
    } else {
      toast.error("No file selected.");
    }
  };

  const handleDelete = () => {
    setImage(null);
  };

  const clearForm = () => {
    setBlog({
      title: "",
      content: "",
      author: "",
    });
    setImage(null);
  };

  const postData = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", blog.title);
      formData.append("content", blog.content);
      formData.append("author", blog.author);
      formData.append("image", image);
      if (!blog.title) {
        return toast.error("Fill title.");
      }
      if (!blog.author) {
        return toast.error("Fill author.");
      }
      if (!blog.content) {
        return toast.error("Fill content.");
      }
      if (!image) {
        return toast.error("No image selected.");
      }
      const res = await axiosInstance.post("/blog/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      clearForm();
      //console.log(res.data.message);
      toast.success("Your Blog is posted!");
    } catch (error) {
      toast.error(error.message);
      //toast.error("Oops! There is an internal error");
    }
  };

  return (
    <div className="min-w-[65px] max-w-[70%] mx-auto p-2 md:p-4 md:hover:border-2 md:hover:border-slate-600 rounded-xl">
      <h1 className="p-1 md:p-2 text-center text-lg md:text-4xl font-bold md:mt-6 mt-4">
        Post Your Thoughts
      </h1>
      <form className="flex mx-5 my-4 items-center flex-col" method="POST">
        <input
          name="title"
          value={blog.title}
          onChange={handleInput}
          className="text-sm text-slate-50 outline-none px-4 md:px-6 py-2 min-w-64 w-full outline-3 hover:outline-slate-300 rounded-lg m-2 md:m-3 border-2 border-gray-700"
          type="text"
          placeholder="Blog title"
          required
        />
        <input
          name="author"
          value={blog.author}
          onChange={handleInput}
          className="text-sm text-slate-50 outline-none px-4 md:px-6 py-2 min-w-64 w-full outline-3 hover:outline-slate-300 rounded-lg m-2 md:m-3 border-2 border-gray-700"
          type="text"
          placeholder="Author"
          required
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleInput}
          className="h-[450px] resize-none text-sm text-slate-50 outline-none px-4 md:px-6 py-2 min-w-64 w-full outline-3 hover:outline-slate-300 rounded-lg m-2 md:m-3 border-2 border-gray-700"
          type="text"
          placeholder="Share your thoughts..."
          required
        />
        <div className="flex items-center justify-center w-full min-w-64 m-2 md:m-3">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG or JPEG
              </p>
            </div>
            <input
              onChange={handleImage}
              type="file"
              className="hidden"
              accept=".jpg, .png, .jpeg"
            />
          </label>
        </div>
        <div className="flex justify-around">
          {image && imagePreview && (
            <div className="text-lg text-gray-800 mt-4 border-2 border-gray-300 p-5 min-w-64 rounded-lg overflow-hidden">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover object-center w-full h-48 rounded-md border border-gray-300"
              />
              <p className="m-2 text-[11px] md:text-md text-white">
                <strong className="text-green-400 ">File Name: </strong>
                {image.name}
              </p>
              <button
                onClick={handleDelete}
                className="md:mt-6 mt-5 w-20 rounded-2xl md:px-2 py-2 hover:bg-slate-600 text-white bg-green-500 text-sm md:text-md md:w-24 w-25 hover:scale-105 ease-in-out duration-200 font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
        <button
          type="submit"
          onClick={postData}
          className="md:mt-6 mt-5 w-24 rounded-2xl md:px-4 py-2 hover:bg-slate-600 text-white bg-green-500 text-sm md:text-lg md:w-24 w-25 hover:scale-105 ease-in-out duration-200 font-medium"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default BlogPost;
