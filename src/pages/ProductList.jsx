import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsByFilter } from "../reducers/productSlice.js";
import CardProduct from "../components/CardProduct.jsx";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "../reducers/userSlice.js";
import { Menu, MenuButton, MenuList, Button, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

function ProductList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState({
    name: "",
    orderBy: "asc",
    sortBy: "price",
    page: 1,
  });

  const productList = useSelector((state) => state.products.productsList);
  const totalPages = useSelector((state) => state.products.totalPages);

  const token = localStorage.getItem("acces_token");

  useEffect(() => {
    dispatch(fetchCurrentUser(token)).catch((_) => {
      navigate("/login");
    });

    if (totalPages < query.page) {
      setQuery({ ...query, page: totalPages });
    }

    dispatch(getAllProductsByFilter(query));
  }, [query]);

  const getSortName = () => {
    if (query.sortBy === "name" && query.orderBy === "asc") return "A-Z";
    if (query.sortBy === "name" && query.orderBy === "desc") return "Z-A";
    if (query.sortBy === "price" && query.orderBy === "asc")
      return "Lowest Price";
    if (query.sortBy === "price" && query.orderBy === "desc")
      return "Highest Price";

    return "A-Z";
  };

  const firstOrder =
    query.page === totalPages
      ? totalPages - 2
      : query.page - 1 < 1
      ? 1
      : query.page - 1;
  const secondOrder = firstOrder + 1;
  const lastOrder = secondOrder + 1;

  let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  pages = totalPages > 4 ? [firstOrder, secondOrder, lastOrder] : pages;

  return (
    <div className="my-5 flex flex-row max-[877px]:flex-col ">
      <div className="flex flex-col p-10  max-[877px]:mx-auto">
        <div className="border-2 px-12 py-3 p-5 rounded-lg shadow-md max-[877px]:text-xs">
          <p className="border-b-4 py-1 mt-2 text-lg font-bold text-sky-600 max-[877px]:text-sm">
            Find Product
          </p>
          <div className="mt-5">
            <p className="text-sm font-semibold text-slate-600 max-[877px]:text-xs">
              Product Name
            </p>
            <input
              type="text"
              className="border-2 mt-1 mb-3 text-sm p-1 rounded-lg font-semibold max-[877px]:text-xs"
              placeholder="Type here ..."
              onChange={(e) => setQuery({ ...query, name: e.target.value })}
            />
          </div>
          <p className="border-b-4 py-1 text-lg font-bold text-sky-600 max-[877px]:text-sm">
            Sort Product
          </p>
          <div className=" my-4">
            <Menu>
              <MenuButton
                as={Button}
                className="border-2 text-left px-3 py-2 w-[131px] rounded-lg text-sm font-semibold text-slate-600 max-[877px]:text-xs"
                rightIcon={<ChevronDownIcon />}
              >
                {getSortName()}
              </MenuButton>
              <MenuList className="bg-slate-50 w-[131px] rounded-lg px-3 py-2 text-sm font-semibold border-2 max-[877px]:text-xs">
                <MenuItem
                  className="mb-2 px-2 hover:scale-105 hover:bg-slate-200 rounded-lg transition duration-300 hover:text-sky-600"
                  onClick={() =>
                    setQuery({ ...query, orderBy: "asc", sortBy: "price" })
                  }
                >
                  Lowest Price
                </MenuItem>
                <MenuItem
                  className="mb-2 px-2 hover:scale-105 hover:bg-slate-200 rounded-lg transition duration-300 hover:text-sky-600"
                  onClick={() =>
                    setQuery({ ...query, orderBy: "desc", sortBy: "price" })
                  }
                >
                  Highest Price
                </MenuItem>
                <MenuItem
                  className="mb-2 px-2 hover:scale-105 hover:bg-slate-200 rounded-lg transition duration-300 hover:text-sky-600"
                  onClick={() =>
                    setQuery({ ...query, orderBy: "asc", sortBy: "name" })
                  }
                >
                  A-Z
                </MenuItem>
                <MenuItem
                  className=" hover:scale-105 transition duration-300 hover:text-sky-600 hover:bg-slate-200 rounded-lg px-2"
                  onClick={() =>
                    setQuery({ ...query, orderBy: "desc", sortBy: "name" })
                  }
                >
                  Z-A
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
          <p className="border-b-4 py-1 text-lg font-bold text-sky-600 max-[877px]:text-sm">
            Create product
          </p>
          <div className="my-5">
            <button
              className="bg-sky-600 px-5 py-2 text-white font-semibold rounded-lg hover:cursor-pointer hover:bg-sky-700 hover:scale-90 transition duration-500"
              onClick={() => navigate("/add")}
            >
              Add product
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto">
        {productList.length !== 0 ? (
          <>
            <div>
              <CardProduct />
            </div>
          </>
        ) : (
          <div className="font-bold mt-32 text-2xl mx-auto max-[877px]:w-64 max-[877px]:text-lg">
            <div className=" rounded-xl shadow-lg  ">
              <p className="text-center mx-14 p-10 my-4 text-slate-400">
                Product Not Found ......
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-row justify-center gap-1 mb-5">
          {productList.length !== 0 ? (
            <>
              <div
                className={
                  (query.page === 1
                    ? "bg-slate-600 "
                    : "bg-sky-600 hover:cursor-pointer hover:scale-105 transition duration-500 hover:bg-sky-700 ") +
                  " text-white font-bold rounded-full px-2"
                }
                onClick={() =>
                  setQuery({
                    ...query,
                    page: query.page === 1 ? 1 : query.page - 1,
                  })
                }
              >
                {"<"}
              </div>
              <div className=" text-slate-600 flex flex-row">
                {pages.map((page, i) => (
                  <div
                    className=" text-slate-600 px-2 border-2 mx-1 rounded-full border-slate-600 hover:cursor-pointer"
                    onClick={() => setQuery({ ...query, page })}
                    key={i}
                  >
                    {page === query.page ? (
                      <b className="text-sky-600">{page}</b>
                    ) : (
                      page
                    )}
                  </div>
                ))}
                {totalPages > 4 && pages[pages.length - 1] !== totalPages ? (
                  <p>...</p>
                ) : (
                  <></>
                )}
                {totalPages > 4 && pages[pages.length - 1] !== totalPages ? (
                  <div
                    className=" text-slate-600 px-2 border-2 mx-1 rounded-full border-slate-600 hover:cursor-pointer"
                    onClick={() => setQuery({ ...query, page: totalPages })}
                  >
                    {totalPages}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className={
                  (query.page === totalPages
                    ? "bg-slate-600 "
                    : "bg-sky-600 hover:cursor-pointer hover:scale-105 transition duration-500 hover:bg-sky-700 ") +
                  " text-white font-bold rounded-full px-2"
                }
                onClick={() =>
                  setQuery({
                    ...query,
                    page:
                      query.page === totalPages ? totalPages : query.page + 1,
                  })
                }
              >
                {">"}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
