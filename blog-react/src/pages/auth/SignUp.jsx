import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerFail,
  registerStart,
  registerSuccess,
} from "../../features/auth/authSlice";
import axios from "axios";

export default function SignUp() {
  const { isLoading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      dispatch(registerStart());

      const res = await axios.post(
        "http://localhost:5000/api/auth/sign-up",
        userData
      );

      if (res.data) dispatch(registerSuccess(res.data));

      if (res.data.success === false) {
        dispatch(registerFail(res.data.message));
        return;
      } else {
        navigate("/sign-in");
      }
    } catch (error) {
      dispatch(registerFail(error));
    }
  };

  return (
    <div className="bg-gray-300 p-5 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold uppercase text-center my-5">Sign Up</h1>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Firstname"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setUserData({
              ...userData,
              firstname: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Lastname"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setUserData({
              ...userData,
              lastname: e.target.value,
            })
          }
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setUserData({
              ...userData,
              email: e.target.value,
            })
          }
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={(e) =>
            setUserData({
              ...userData,
              password: e.target.value,
            })
          }
        />

        <button
          disabled={isLoading}
          type="submit"
          className="bg-black text-white text-xl mb-5 p-3 font-medium rounded-lg uppercase hover:opacity-50 disabled:opacity-50 duration-500"
        >
          {isLoading ? "Loading" : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
