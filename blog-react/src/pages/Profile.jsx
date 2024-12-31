import { useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logoutSuccess } from "../features/auth/authSlice";
import { deleteBlogFail, deleteBlogStart } from "../features/blog/blogSlice";

export default function Profile() {
  const { user, isError, isLoading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    profile: "",
  });
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleUpdate = async (e) => {
    e.preventDefault();
  };

  const handleDelete = async () => {
    try {
      dispatch(deleteBlogStart());
      const res = await axios.delete(`http://localhost:5000/api/auth/`);

      console.log(res);
    } catch (error) {
      dispatch(deleteBlogFail(error));
    }
  };

  const handleSignout = async () => {
    try {
      await axios(`http://localhost:5000/api/auth/sign-out`);
      dispatch(logoutSuccess());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>

      <form onSubmit={handleUpdate} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) =>
            setUserData({
              ...userData,
              profile: e.target.files[0],
            })
          }
        />
        {/* 
        -------firebase storage rule--
        service firebase.storage {
          match /b/{bucket}/o {
            match /{allPaths=**} {
              allow read,
              allow write if
              request.resource.size < 2 * 1024 * 1024 &&
              request.resource.contentType.match('image/.*')
            }
          }
        }
         */}
        <img
          src={userData.profile || user.profile}
          alt={user.username}
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
          onClick={() => fileRef.current.click()}
        />

        <input
          type="text"
          placeholder="Username"
          defaultValue={user.username}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={user.email}
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />

        <button
          type="submit"
          className="bg-slate-700 p-3 font-medium uppercase text-white rounded-lg hover:opacity-70 disabled:opacity-90"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-4">
        <span
          className="text-lg text-white font-semibold bg-red-500 p-2 rounded-lg cursor-pointer shadow-md hover:opacity-80"
          onClick={handleDelete}
        >
          Delete user
        </span>
        <span
          className="text-lg text-white font-semibold bg-blue-500 p-2 rounded-lg cursor-pointer shadow-md hover:opacity-80"
          onClick={handleSignout}
        >
          Sign out
        </span>
      </div>

      <p className="text-red-500 text-xl font-bold my-4">
        {isError && "Something went wrong!"}
      </p>
    </div>
  );
}
