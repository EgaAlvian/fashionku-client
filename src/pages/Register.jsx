import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imageRegister from "../assets/image/register-img.png";
import { useDispatch } from "react-redux";
import { registerUser } from "../reducers/userSlice.js";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("Show");

  const showPass = () => {
    let idPass = document.getElementById("passwordRegis");
    if (idPass.type === "password") {
      setShow("Hide");
      idPass.type = "text";
    } else {
      setShow("Show");
      idPass.type = "password";
    }
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (fullname !== "" && username !== "" && email !== "" && password !== "") {
      dispatch(
        registerUser({
          fullname,
          username,
          email,
          password,
        })
      )
        .then(() => {
          alert("you have successfully created an account");
          navigate("/login");
        })
        .catch((error) => {
          alert(error.response.data.error);
          console.log(error);
        });
    } else {
      alert("Check again, data cannot be empty");
    }
  };

  return (
    <div className="container flex mx-auto max-w-full">
      <div className="flex flex-row w-full my-7 max-[877px]:flex-col">
        <div className="w-96 mr-20 p-2 max-[877px]:mx-auto">
          <div className=" ">
            <img
              src={imageRegister}
              alt="register-img"
              width={300}
              className="mx-28"
            />
            <div className="mx-14 w-full mt-5 ">
              <p className="p-2 text-center font-bold text-sky-600 text-xl">
                Register Now !<br />
                <span className="text-base text-slate-600 font-semibold">
                  Register now and start shopping in the most affordable
                  e-commerce platform.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-60 max-w-full w-96 shadow-lg p-9 rounded-xl font-sans border-2 bg-white">
          <p className="mx-auto mb-7 font-bold text-xl text-sky-600 ">
            Register Account
          </p>
          <div className="mb-1 flex flex-col text-sm font-semibold">
            <p className="text-slate-600">Fullname</p>
            <input
              onChange={(e) => setFullname(e.target.value)}
              name="fullname"
              type="text"
              className="my-1 border-2 border-sky-700 rounded-lg p-1"
              placeholder="Fullname ..."
            />
          </div>
          <div className="mb-1 flex flex-col text-sm font-semibold">
            <p className="text-slate-600">Username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              className="my-1 border-2 border-sky-700 rounded-lg p-1"
              placeholder="Name ..."
            />
          </div>
          <div className="mb-1 flex flex-col text-sm font-semibold">
            <p className="text-slate-600">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              className="my-1 border-2 border-sky-700 rounded-lg p-1"
              placeholder="Email ..."
            />
          </div>
          <div className="mb-1 flex flex-col text-sm font-semibold">
            <p className="text-slate-600">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="passwordRegis"
              name="password"
              type="password"
              className="mt-1 mb-3 border-2 border-sky-700 rounded-lg p-1"
              placeholder="Password ..."
            />
            <button
              className=" mx-[264px] text-xs -mt-[38px] flex items-center justify-center font-semibold rounded-md bg-slate-400 text-white p-0.5 w-10"
              onClick={showPass}
            >
              <p>{show}</p>
            </button>
          </div>
          <div className="mt-3">
            <button
              className="bg-sky-600 px-2 w-full text-sm flex items-center justify-center py-3 rounded-xl shadow-lg text-white font-bold hover:cursor-pointer hover:scale-95 hover:bg-sky-700 hover:text-slate-100 transition duration-500"
              onClick={registerHandler}
            >
              Register
            </button>
          </div>
          <div className=" text-sm text-center border-t-4 font-semibold text-slate-600 mt-4">
            <p className="mt-3">
              Have an account ?
              <span className="hover:underline hover:cursor-pointer font-bold text-sky-600 ml-1">
                <Link to={"/login"}>Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
