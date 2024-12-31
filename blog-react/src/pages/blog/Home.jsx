import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteBlogFail,
  deleteBlogStart,
  deleteBlogSuccess,
  getBlogFail,
  getBlogStart,
  getBlogSuccess,
  searchBlogFail,
  searchBlogStart,
  searchBlogSuccess,
} from "../../features/blog/blogSlice";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const { data: blog } = useSelector((state) => state.blog);
  const [search, setSearch] = useState(null);
  const dispatch = useDispatch();

  const fetchBlogData = async () => {
    try {
      dispatch(getBlogStart());
      const res = await axios("http://localhost:5000/api/blog", {
        withcredentials: true,
      });

      if (res.data) {
        dispatch(getBlogSuccess(res.data));
      }
    } catch (error) {
      dispatch(getBlogFail(error));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      dispatch(searchBlogStart());
      const res = await axios(
        `http://localhost:5000/api/blog/search/${search}`,
        {
          withcredentials: true,
        }
      );

      if (res) {
        dispatch(searchBlogSuccess(res.data));
      }
    } catch (error) {
      dispatch(searchBlogFail(error));
    }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();

    try {
      dispatch(deleteBlogStart());
      const res = await axios.delete(`http://localhost:5000/api/blog/${id}`, {
        withCredentials: true,
      });

      if (res) {
        dispatch(deleteBlogSuccess(res.data));
      }
    } catch (error) {
      dispatch(deleteBlogFail(error));
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <div className="flex flex-col gap-3 mx-10  mt-10">
      <form onSubmit={handleSearch} className="flex gap-3 mx-auto ">
        <input
          type="text"
          placeholder="Title..."
          className="bg-slate-300 p-3 w-full text-xl rounded-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black p-1 px-3 font-medium text-white rounded-lg"
        >
          Search
        </button>
      </form>
      <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
        {blog &&
          blog.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-col-3 shadow-2xl rounded-lg"
              >
                <img
                  src={`http://localhost:5000/upload/${item.posture}`}
                  alt={item.title}
                  className="w-full h-40 border-b-2 border-black"
                />

                <div className="px-6 py-3">
                  <div className="flex justify-between">
                    <h2 className="text-lg font-serif font-semibold italic mb-2">
                      {item.title}
                    </h2>

                    <span className="text-sm mt-1">
                      {new Date(item.createdAt).toLocaleString("en-GB", {
                        dateStyle: "medium",
                      })}
                    </span>
                  </div>
                  <p className="italic font-serif">{item.body}</p>
                </div>

                <div className="flex justify-between p-2 border-t-2">
                  <button
                    type="button"
                    className="bg-black text-white p-1 rounded-md text-lg uppercase font-medium italic"
                    onClick={(e) => handleDelete(e, item._id)}
                  >
                    Delete
                  </button>
                  <Link
                    to={`/edit/${item._id}`}
                    className="bg-slate-300 text-black p-1 rounded-md text-lg uppercase font-medium italic"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
