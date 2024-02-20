import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../reducers/productSlice.js";
import { fetchCurrentUser } from "../reducers/userSlice.js";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const dispacth = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("acces_token");

  useEffect(() => {
    dispacth(fetchCurrentUser(token)).catch(() => {
      navigate("/login");
    });
  }, [token]);

  const sbmtCreateProduct = async (e) => {
    e.preventDefault();
    if (name !== "" && price !== "" && quantity !== "" && description !== "") {
      const formData = new FormData();
      if (!selectedFile) {
        alert("Image cannot be empty");
        return;
      }

      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("file", selectedFile, selectedFile.name);

      dispacth(addProduct(formData))
        .then(() => {
          alert("Create Product Success");
          navigate("/product");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Check again, data cannot be empty");
    }
  };

  return (
    <div className="flex justify-center my-14">
      <div className="border-2 p-8 rounded-lg shadow-lg max-[877px]:w-64">
        <p className="text-center mb-4 text-xl font-bold text-sky-600 max-[877px]:text-lg">
          Add Product
        </p>
        <form onSubmit={sbmtCreateProduct}>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label>Name</label>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 rounded-lg mt-1 p-1 w-72  max-[877px]:w-48"
                type="text"
                placeholder="Name ..."
              />
            </div>
          </div>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label>Description</label>
            <div>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-2 rounded-lg mt-1 p-1 w-72 max-[877px]:w-48"
                type="text"
                placeholder="Description ..."
              />
            </div>
          </div>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label htmlFor="">Price</label>
            <div>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border-2 rounded-lg mt-1 p-1 w-72 max-[877px]:w-48"
                type="number"
                placeholder="Price ..."
              />
            </div>
          </div>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label htmlFor="">Quantity</label>
            <div>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border-2 rounded-lg mt-1 p-1 w-72 max-[877px]:w-48"
                type="number"
                placeholder="Quantity ..."
              />
            </div>
          </div>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label htmlFor="">Image Product</label>
            <div>
              <input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className=" hover:cursor-pointer mt-1 p-1"
                type="file"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <button
              type="submit"
              className="w-36 rounded-lg px-2 py-2 bg-green-500 text-white text-sm font-semibold mx-1 mt-2 hover:bg-green-600 hover:scale-105 transition-all duration-500"
            >
              Save
            </button>
            <button
              className="w-36 rounded-lg px-2 py-2 bg-sky-600 text-white text-sm font-semibold mx-1 mt-2 hover:bg-sky-700 hover:scale-105 transition-all duration-500"
              onClick={() => navigate("/product")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
