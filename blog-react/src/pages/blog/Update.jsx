import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  BlogFail,
  BlogStart,
  BlogSuccess,
  updateBlogFail,
  updateBlogStart,
  updateBlogSuccess,
} from "../../features/blog/blogSlice";
import { useEffect } from "react";

export default function Update() {
  const { data: blog, isLoading } = useSelector((state) => state.blog);
  const [blogData, setBlogData] = useState({
    title: "",
    body: "",
    posture: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchBlog = async () => {
    try {
      dispatch(BlogStart());
      const res = await axios(`http://localhost:5000/api/blog/${id}`, {
        withCredentials: true,
      });

      if (res) {
        dispatch(BlogSuccess(res.data));
      }
    } catch (error) {
      dispatch(BlogFail(error));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateBlogStart());
      const res = await axios.put(
        `http://localhost:5000/api/blog/${id}`,
        blogData,
        { withCredentials: true }
      );

      if (res) {
        dispatch(updateBlogSuccess(res.data));
        navigate("/");
      }
    } catch (error) {
      dispatch(updateBlogFail(error));
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div className="bg-gray-300 p-5 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold uppercase text-center my-5">
        Edit Blog
      </h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="bg-slate-100 p-3 rounded-lg"
          defaultValue={blog.title}
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
          defaultValue={blog.body}
          onChange={(e) =>
            setBlogData({
              ...blogData,
              body: e.target.value,
            })
          }
        ></textarea>
        <div className="flex flex-col gap-5">
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

          <img
            src={`http://localhost:5000/upload/${blog.posture}`}
            alt={blog.title}
            width={200}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-black text-white text-xl mb-5 p-3 font-medium rounded-lg uppercase hover:opacity-50 disabled:opacity-50 duration-500"
        >
          {isLoading ? "Loading" : "Update"}
        </button>
      </form>
    </div>
  );
}
