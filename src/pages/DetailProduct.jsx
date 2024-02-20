import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../reducers/productSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { currency } from "../helpers/currency.js";
import { fetchCurrentUser } from "../reducers/userSlice.js";

function DetailProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useSelector((state) => state.products.product);
  const token = localStorage.getItem("acces_token");

  useEffect(() => {
    dispatch(fetchCurrentUser(token))
      .then(() => {
        dispatch(getProductById(id));
      })
      .catch(() => {
        navigate("/login");
      });
  }, [token]);

  return (
    <div className="flex justify-center my-14">
      <div className=" p-8 border-2 rounded-xl shadow-lg w-1/2">
        <p className="mb-8 text-center text-xl font-bold text-sky-600 max-[877px]:text-lg">
          Detail Product
        </p>
        <div className="flex flex-row ">
          <div>
            <img
              src={product.image}
              alt="Img"
              className="rounded-lg ml-6 w-64"
            />
          </div>
          <div className="-mt-6 ml-14 w-72 ">
            <p className="text-sm font-bold  mt-5 max-[877px]:text-xs">
              Name Product :{" "}
              <span className="font-semibold text-slate-600 max-[877px]:text-xs">
                {product.name}
              </span>
            </p>
            <p className="text-sm font-bold  mt-2 max-[877px]:text-xs">
              Description :{" "}
              <span className="font-semibold text-slate-600 max-[877px]:text-xs">
                {product.description}
              </span>
            </p>
            <p className="text-sm font-bold  my-2 max-[877px]:text-xs">
              Price :{" "}
              <span className="font-bold text-sky-600 max-[877px]:text-xs">
                {currency(product.price)}
              </span>
            </p>
            <p className="text-sm font-bold mb-5 max-[877px]:text-xs">
              Quantity :{" "}
              <span className="font-semibold text-slate-600 max-[877px]:text-xs">
                {product.quantity}
              </span>
            </p>
            <button
              className="w-full rounded-lg  px-2 py-2 bg-sky-600 text-white text-sm font-semibold mt-28 mb-2 hover:bg-sky-700 transition-all duration-500"
              onClick={() => navigate("/product")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
