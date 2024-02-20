import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteProductById } from "../reducers/productSlice";
import { currency } from "../helpers/currency";
import { fetchCurrentUser } from "../reducers/userSlice";

function CardProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products.productsList);

  const token = localStorage.getItem("acces_token");

  const buttonDelete = (id) => {
    dispatch(fetchCurrentUser(token))
      .then(() => {
        dispatch(deleteProductById(id, productList));
      })
      .catch(() => {
        navigate("/login");
      });
  };

  return (
    <div className="grid grid-cols-3 my-10 gap-x-4 gap-y-8 xl:grid-cols-3 max-[877px]:grid-cols-2 max-[1182px]:grid-cols-2">
      {productList.map((product) => (
        <div
          className="border-2 w-64 p-5 rounded-lg shadow-lg max-[877px]:w-40"
          key={product.id}
        >
          <div className="mb-4">
            <Link to={"/detail/" + product.id}>
              <img
                src={product.image}
                alt="Img not found"
                className="rounded-lg w-64 hover:scale-105 transition duration-500"
              />
            </Link>
          </div>
          <p className="text-sm font-semibold text-slate-500 max-[877px]:text-xs">
            <span className="text-sm font-bold text-black max-[877px]:text-xs">
              Name :
            </span>{" "}
            {product.name}
          </p>
          <p className="text-sm font-bold text-sky-600 max-[877px]:text-xs">
            <span className="text-sm font-bold text-black max-[877px]:text-xs">
              Price :{" "}
            </span>
            {currency(product.price)}
          </p>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/edit/" + product.id)}
              className="rounded-lg px-2 py-1 bg-green-500 text-white text-sm font-semibold mx-1  hover:bg-green-600 w-24 transition duration-500 max-[877px]:w-12 max-[877px]:text-xs"
            >
              Edit
            </button>
            <button
              onClick={() => buttonDelete(product.id)}
              className="rounded-lg px-2 py-1 bg-red-500 text-white text-sm font-semibold mx-1 hover:bg-red-600 w-24 transition duration-500 max-[877px]:w-12 max-[877px]:text-xs"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardProduct;
