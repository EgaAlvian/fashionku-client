import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../reducers/userSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.users.user);

  const logoutHandler = () => {
    dispatch(
      setUser({
        id: null,
        fullname: "",
        username: "",
        email: "",
        password: "",
      })
    );

    localStorage.removeItem("acces_token");
    navigate("/login");
    alert("Logout success");
  };

  return (
    <div className="flex flex-row p-6 items-center justify-between bg-gradient-to-r from-sky-600 via-slate-500 to-slate-900 shadow-lg">
      <div className="px-3">
        <h1 className="font-bold text-xl text-white animate-bounce">
          Fashionku.
        </h1>
      </div>
      {userLogin.id ? (
        <>
          <div className="flex flex-row px-4 gap-4 mx-auto text-sm text-slate-300 font-semibold font-sans"></div>
          <div className="flex flex-row px-4 gap-4 text-white font-sans text-sm font-semibold">
            Hello 👋, {userLogin.username} ....
          </div>
          <div className="text-sm bg-red-500 text-white px-2.5 py-1.5 rounded-lg font-bold hover:bg-red-600 hover:cursor-pointer hover:scale-90 transition duration-500 ">
            <button onClick={logoutHandler}>Logout </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <div className="flex flex-row justify-end px-4 gap-4 text-white font-sans text-sm font-semibold hover: hover:cursor-pointer hover:scale-110 transition duration-500 ">
              <Link to={"/login"}>Login</Link>
            </div>
            <div className="font-bold text-white">|</div>
            <div className="flex flex-row px-4 gap-4 text-white font-sans text-sm font-semibold hover: hover:cursor-pointer hover:scale-110 transition duration-500">
              <Link to={"/register"}>Register</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
