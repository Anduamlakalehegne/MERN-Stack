import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useSelector((state) => state.auth);
  return (
    <nav className="bg-gray-300 flex justify-between py-3 italic shadow-2xl">
      <h1 className="text-3xl font-bold uppercase mx-auto hover:scale-125 duration-1000 hover:bg-gradient-to-r from-orange-500 to-pink-500 hover:text-white hover:px-2 rounded-md">
        Trendy
      </h1>

      <ul className="flex gap-5 text-2xl font-semibold mx-auto">
        {user ? (
          <>
            <li className="hover:scale-105 hover:underline duration-300">
              <Link to="/">Home</Link>
            </li>
            {/* <li className="hover:scale-105 hover:underline duration-300">
              <Link to="/about">About</Link>
            </li> */}
            <li className="hover:scale-105 hover:underline duration-300">
              <Link to="/create">Create</Link>
            </li>
            <li className="hover:scale-105 hover:underline duration-300">
              <Link to="/profile">
                <img
                  src={user.profile}
                  alt="profile"
                  className="h-10 w-10 border-2 border-black rounded-full object-cover"
                />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="hover:scale-105 hover:underline duration-300">
              <Link to="/sign-in">Sign In</Link>
            </li>
            <li className="hover:scale-105 hover:underline duration-300">
              <Link to="/sign-up">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
