import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

const App = () => {
  const { user, setUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    setUser();
  }, [user]);

  //console.log({ user, isAuthenticated });

  if (isAuthenticated && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-20 animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        {/* <Route path="/home" element={<HomePage/>}/> */}
        <Route path="/blog/:blogId" element={<Blog />} />
        <Route
          path="/post-blog"
          element={user ? <BlogPost /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
};
export default App;
