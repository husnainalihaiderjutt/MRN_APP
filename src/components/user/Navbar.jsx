/** @format */

import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useEffect } from "react";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { products, setFilteredData, logout, authenticated , cart, reload ,useradmin} =
    useContext(AppContext);
  const location = useLocation();

  const filteredDataCat = (Category) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() === Category?.toLowerCase()
      )
    );
  };

  useEffect(() => {
    // Nothing needed here, just to force re-render on reload
  }, [reload]);
  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return; // Prevent navigation if search term is empty
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="nav sticky-top">
      <div className="nav_bar d-flex justify-content-between align-items-center p-3 ">
        <Link to="/" className="left text-decoration-none">
          <h1 style={{ color: "white", textDecoration: "none" }}>
            Mern E Commerce
          </h1>
        </Link>

        <form className="search_bar mx-3 d-flex" onSubmit={SubmitHandler}>
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mx-3">
            Search
          </button>
        </form>

        <div className="right d-flex">
          {authenticated && (
            <>
              <button
                type="button"
                className="btn btn-primary position-relative mx-3"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart?.items?.length || 0}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </button>
              <Link to={"/profile"} className="btn btn-info mx-3">
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="btn btn-danger mx-3"
              >
                Logout
              </button>
              {useradmin && (  <Link to={"/admin"} className="btn btn-info mx-3">
                Admin
              </Link>)}
            
            </>
          )}
          {!authenticated && (
            <>
              <Link to={"/login"} className="btn btn-success mx-1">
                Login
              </Link>
              <Link to={"/register"} className="btn btn-outline-success mx-1">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      {location.pathname == "/" && (
        <div className="sub_bar">
          <div className="items" onClick={() => setFilteredData(products)}>
            No Filter
          </div>
          <div className="items" onClick={() => filteredDataCat("mobile")}>
            Mobiles
          </div>
          <div className="items" onClick={() => filteredDataCat("laptop")}>
            Laptop
          </div>
          <div className="items" onClick={() => filteredDataCat("camera")}>
            Camera's
          </div>
          <div className="items" onClick={() => filteredDataCat("headphone")}>
            HeadPhones
          </div>
        
        </div>
      )}
    </div>
  );
};

export default Navbar;
