import React from 'react';
import BlogCard from '../components/BlogCard';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../lib/axios';
import { Loader } from 'lucide-react';

const BlogList = ({remain=false,remainBlogs,needSearch=false}) => {
  const [blogs,setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchBlogs, setSearchBlogs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  useEffect(()=>{
    getAllBlogs();
  },[]);
  
  const getAllBlogs = async()=>{
    try{
      setLoading(true);
      const res = await axiosInstance.get("/blog/get-all");
      const blogsWithImages = res.data.map((blog) => {
        //converting binary to object url
        if (blog.image && blog.image.data) {
            const blob = new Blob([new Uint8Array(blog.image.data.data)], { type: blog.image.contentType });
            return { ...blog, imageUrl: URL.createObjectURL(blob) };
        }
        return blog;
      });
      setBlogs(blogsWithImages);
      // setBlogs(res.data);
      // console.log(blogsWithImages);
    }catch(error){
      console.log(error.message);
    }finally{
      setLoading(false);
    }
  }

  //to handle the searching blogs
  const handleSearch = (input)=>{
    setIsSearching(true);
    const textInput = input.target.value.toLowerCase();
    setSearchText(textInput);
    if(searchText){
      const resultBlogs = blogs.filter((blog)=>blog.title.toLowerCase().includes(searchText))
      //console.log(resultBlogs);
      setSearchBlogs(resultBlogs);
    }
  }

  return (
    <div className='mb-20 mx-auto px-3'>
      <h1 className='text-center sm:text-4xl text-2xl font-bold my-6 bg-base-100 px-2'>{remain?"Other Blogs":"Published Blogs"}</h1>
      {
        needSearch ? (
          <div className="visible form-control mx-auto min-w-56 max-w-[40%] mb-10 mt-12">
            <input value={searchText} onChange={handleSearch} type="text" placeholder="Search" className="input input-bordered text-[11px] md:text-[15px] md:w-auto" />
          </div>
        ):null
      }
      <div className='container py-4 mx-auto'>
      {
            loading ? (
              <div className="flex items-center justify-center h-72">
                <Loader className="size-20 animate-spin" />
              </div>
            ) : (
              (isSearching) ? <BlogCard Blogs={searchBlogs} />:<BlogCard Blogs={remain ? remainBlogs : blogs} />
            )
      }
      </div>
    </div>
  )
}

export default BlogList;