import { Routes, Route, Navigate } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import DetailProduct from "./pages/DetailProduct";

function App() {
  return (
    <div>
      <div>
        <Navbar />
        <div>
          <Routes>
            <Route path="/product" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/edit/:id" element={<EditProduct />} />
            <Route path="/detail/:id" element={<DetailProduct />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
