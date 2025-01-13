import React, { useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import Comments from "../components/Comments";
import BlogList from "../components/BlogList";
import { Loader } from "lucide-react";

const Blog = () => {
  const { blogId } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [neededBlog, setNeededBlog] = useState(null);
  const [remainBlog, setRemainBlog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length > 0) {
      divideBlogs();
    }
  }, [blogs, blogId]);

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/blog/get-all");
      const blogsWithImages = res.data.map((blog) => {
        //converting binary to object url
        if (blog.image && blog.image.data) {
          const blob = new Blob([new Uint8Array(blog.image.data.data)], {
            type: blog.image.contentType,
          });
          return { ...blog, imageUrl: URL.createObjectURL(blob) };
        }
        //return blog;
      });
      setBlogs(blogsWithImages);
      // console.log(blogsWithImages);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const divideBlogs = () => {
    try {
      //get only the needed blog using blogId
      const neededBlog = blogs.find((data) => data._id == blogId);
      if (neededBlog) {
        setNeededBlog(neededBlog);
        const remainBlog = blogs.filter((data) => data._id != blogId);
        setRemainBlog(remainBlog);
      } else {
        setNeededBlog(null); // Set to null if not found
        setRemainBlog([]);
      }

      // console.log("blog needed "+neededBlog);
      // console.log("remain blogs "+remainBlog);
    } catch (error) {
      console.log(error.message);
    }
  };
  // Early return when loading or blog is not found
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  }

  if (!neededBlog) {
    return (
      <div className="text-center my-10">
        <p>
          Blog not found or failed to load the content. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-16 mx-auto  md:w-[70%] px-4 md:px-1" key={blogId}>
        <h1 className="text-center text-2xl sm:text-4xl font-bold mt-10 mb-16 bg-base-100">
          Blog for you
        </h1>
        <h1 className="text-gray-950 dark:text-white sm:text-4xl text-2xl font-bold my-7">
          {neededBlog.title}
        </h1>
        <div className="border-2 border-slate-50 rounded-lg overflow-hidden mb-7">
          <img
            src={neededBlog.imageUrl}
            className="lg:h-96 md:h-80 w-full object-cover object-center"
            alt="blog image"
          />
        </div>
        <p className="h-auto p-2 text-sm md:text-[15px] mx-auto leading-relaxed text-justify text-md mb-4 text-gray-700 dark:text-slate-100">
          {neededBlog.content}
        </p>
        <div className="text-gray-400 text-[13px] flex flex-col md:flex-row justify-between mx-2 mb-3">
          <p className="md:text-lg bg-base-100 text-center font-medium">
            Author : {neededBlog.author}
          </p>
          <p className="text-center text-sm pt-2 font-normal">
            Published on :{" "}
            {dayjs(neededBlog.createdAt).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      </div>
      <Comments BlogId={blogId} />
      <BlogList remain={true} remainBlogs={remainBlog} />
    </>
  );
};

export default Blog;
