import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlogFail,
  createBlogStart,
  createBlogSuccess,
} from "../../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const { isLoading } = useSelector((state) => state.blog);
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    posture: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBlog = async (e) => {
    e.preventDefault();

    try {
      dispatch(createBlogStart());
      const res = await axios.post("http://localhost:5000/api/blog", blogData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data) {
        dispatch(createBlogSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      dispatch(createBlogFail(error));
    }
  };

  return (
    <div className="bg-gray-300 p-5 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold uppercase text-center my-5">
        Create Blog
      </h1>

      <form onSubmit={handleBlog} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setBlogData({
              ...blogData,
              title: e.target.value,
            })
          }
        />
        <textarea
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Description"
          cols="30"
          rows="5"
          onChange={(e) =>
            setBlogData({
              ...blogData,
              body: e.target.value,
            })
          }
        ></textarea>
        <input
          type="file"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setBlogData({
              ...blogData,
              posture: e.target.files[0],
            })
          }
        />

        <button
          disabled={isLoading}
          type="submit"
          className="bg-black text-white text-xl mb-5 p-3 font-medium rounded-lg uppercase hover:opacity-50 disabled:opacity-50 duration-500"
        >
          {isLoading ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
}
