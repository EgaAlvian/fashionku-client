import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser, loginUser } from "../reducers/userSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState("Show");

  const token = localStorage.getItem("acces_token");

  useEffect(() => {
    dispatch(fetchCurrentUser(token))
      .then(() => {
        navigate("/product");
      })
      .catch(() => {
        navigate("/login");
      });
  }, [token]);

  const showPass = () => {
    let idPass = document.getElementById("password");
    if (idPass.type === "password") {
      setShow("Hide");
      idPass.type = "text";
    } else {
      setShow("Show");
      idPass.type = "password";
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (email !== "" && password !== "") {
      dispatch(
        loginUser({
          email,
          password,
        })
      )
        .then(() => {
          alert("Login success");
          navigate("/product");
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          alert(err.response.data.msg);
        });
    } else {
      alert("Check again, data cannot be empty");
    }
  };

  return (
    <div className="container flex mx-auto max-w-full">
      <div className="flex flex-row w-full my-7">
        <div className="flex flex-col mx-auto max-w-full w-96 shadow-lg p-9 rounded-xl font-sans border-2 bg-white">
          <p className="mx-auto mb-7 font-bold text-xl text-sky-600">
            Login Account
          </p>

          <div className="mb-1 flex flex-col text-sm font-semibold ">
            <p className="text-slate-600">Email</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
              className="my-1 border-2 border-sky-700 rounded-lg p-1 "
              placeholder="Name ..."
            />
          </div>

          <div className="mb-1 flex flex-col text-sm font-semibold ">
            <p className="text-slate-600">Password</p>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              className="mt-1 mb-2 border-2 border-sky-700 rounded-lg p-1"
              placeholder="Password ..."
            />
            <button
              className=" mx-[264px] text-xs -mt-[34px] flex items-center justify-center font-semibold rounded-md bg-slate-400 text-white p-0.5 w-10  "
              onClick={showPass}
            >
              <p className="">{show}</p>
            </button>
          </div>
          <div>
            <button
              onClick={loginHandler}
              className="bg-sky-600 px-4 w-full mt-5 text-sm flex items-center py-3 rounded-xl shadow-lg text-white font-bold hover:cursor-pointer hover:scale-95 hover:bg-sky-700 hover:text-slate-100 transition duration-500 justify-center"
            >
              Login
            </button>
          </div>
          <div className="text-sm font-semibold text-slate-600 mt-5 border-t-4">
            <p className="mt-5 text-center ">
              Don't have an account ?
              <span className="text-sm font-bold text-sky-600 hover:cursor-pointer ml-1 hover:underline">
                <Link to={"/register"}>Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
