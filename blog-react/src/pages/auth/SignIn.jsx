import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  loginFail,
  loginStart,
  loginSuccess,
} from "../../features/auth/authSlice";

export default function SignIn() {
  const { isLoading } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());

      const res = await axios.post(
        "http://localhost:5000/api/auth/sign-in",
        userData,
        { withcredentials: true }
      );

      if (res.data) dispatch(loginSuccess(res.data));

      if (res.data.success === false) {
        dispatch(loginFail(res.data.message));

        return;
      } else {
        navigate("/");
      }
    } catch (error) {
      dispatch(loginFail(error));
    }
  };

  return (
    <div className="bg-gray-300 p-5 max-w-lg mx-auto my-16 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold uppercase text-center my-5">Sign In</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
          {isLoading ? "Loading" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
