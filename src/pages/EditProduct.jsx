import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../reducers/userSlice";
import { editProduct } from "../reducers/productSlice";

function EditProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const token = localStorage.getItem("acces_token");

  useEffect(() => {
    dispatch(fetchCurrentUser(token))
      .then(() => {
        getProductById(id);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [token]);

  const sbmtUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (name !== "" && price !== "" && quantity !== "" && description !== "") {
      if (!selectedFile) {
        return alert("image cannot be empty");
      }

      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("description", description);
      formData.append("file", selectedFile);

      dispatch(editProduct(id, formData));
      alert("Update success");
      navigate("/product");
    } else {
      alert("Check again, data cannot be empty");
    }
  };

  const getProductById = async (id) => {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    setName(response.data.name);
    setDescription(response.data.description);
    setPrice(response.data.price);
    setQuantity(response.data.quantity);
  };

  return (
    <div className=" flex justify-center my-14">
      <div className="border-2 p-8 rounded-lg shadow-lg  max-[877px]:w-64">
        <p className="text-center mb-4 text-xl font-bold text-sky-600">
          Edit Product
        </p>
        <form onSubmit={sbmtUpdateProduct}>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label>Name</label>
            <div>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 rounded-lg mt-1 p-1 w-full "
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
                className="border-2 rounded-lg mt-1 p-1 w-full "
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
                className="border-2 rounded-lg mt-1 p-1 w-full"
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
                className="border-2 rounded-lg mt-1 p-1 w-full"
                type="number"
                placeholder="Quantity ..."
              />
            </div>
          </div>
          <div className="mb-1 text-sm font-semibold max-[877px]:text-xs">
            <label htmlFor="">Image product</label>
            <div>
              <input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className=" rounded-lg mt-1 p-1 w-72"
                type="file"
              />
            </div>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="w-36 mr-1 rounded-lg px-2 py-2 bg-green-500 text-white text-sm font-semibold mx-1 mt-2 hover:bg-green-600 hover:scale-105 transition-all duration-500"
            >
              Update
            </button>
            <button
              className="w-36 ml-1 rounded-lg px-2 py-2 bg-sky-600 text-white text-sm font-semibold mx-1 mt-2 hover:bg-sky-700 hover:scale-105 transition-all duration-500"
              onClick={() => navigate("/product")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
