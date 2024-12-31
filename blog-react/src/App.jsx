import { Route, Routes } from "react-router-dom";
import Header from "./Include/Header";
import PrivateRoute from "./util/PrivateRoute";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/blog/Home";
import Create from "./pages/blog/Create";
import { useEffect } from "react";
import axios from "axios";
import Update from "./pages/blog/Update";

export default function App() {
  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Update />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </main>
    </div>
  );
}
