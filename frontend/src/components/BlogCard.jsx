import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";


const BlogCard = ({Blogs})=>{
    return(
       <>
        <div className='flex flex-wrap -m-4 p-2'>
        {
            Blogs.length>0 ?
            (
                Blogs.map((blog)=>(
                <div key={blog._id} className='p-4 md:w-[70%] mx-auto transition ease-in-out hover:scale-[102%] duration-300 delay-50'>
                    <Link to={`/blog/${blog._id}`}>
                        <div className='h-full border-2 border-slate-50 border-opacity-60 rounded-lg overflow-hidden'>
                        {blog.image && blog.image.data ? (
                            <img
                                src={blog.imageUrl}
                                className='lg:h-56 md:h-36 h-32 w-full object-cover object-center' alt="blog image"
                            />
                            ) : (<p>No Image Available</p>)
                        }
                            <div className='md:px-6 p-6'>
                                <h2 className='text-slate-50 my-2 font-medium text-md md:text-2xl'>{blog.title}</h2>
                                <p className='md:text-justify h-auto text-[13px] md:text-[15px] leading-relaxed'>{blog.content.substring(0,359)+"..."}</p>
                            </div>
                            <div className="text-gray-400 text-[13px] flex flex-col md:flex-row justify-between mx-6 mb-3">
                                <p className="md:text-lg bg-base-100 text-center font-medium">Author : {blog.author}</p>
                                <p className="text-center text-sm pt-2 font-normal">Published on : {dayjs(blog.createdAt).format("YYYY-MM-DD HH:mm:ss")}</p>
                            </div>
                        </div>
                    </Link>
                </div>
                ))
            ):<div className="text-center w-full md:text-lg text-[11px] p-10 m-3 flex justify-center items-center text-slate-50 font-bold"><p>Sorry! There is no any blog that you search for.</p></div>
        }
        </div> 
       </>
    );
}

export default BlogCard;