/** @format */

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const {
    products,
    setFilteredData,
    logout,
    authenticated,
    cart,
    reload,
    useradmin,
  } = useContext(AppContext);
  const location = useLocation();

  const filteredDataCat = (Category) => {
    setFilteredData(
      products.filter(
        (data) => data.category?.toLowerCase() === Category?.toLowerCase()
      )
    );
  };

  useEffect(() => {}, [reload]);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <div className="nav sticky-top" style={{ backgroundColor: "#41146c" }}>
      <div className="container-fluid py-3">
        <div className="row align-items-center gx-3">
          {/* Brand */}
          <div className="col-12 col-lg-auto mb-2 mb-lg-0 text-center text-lg-start">
            <Link to="/" className="text-decoration-none">
              <h2 className="text-white m-0">Mern E Commerce</h2>
            </Link>
          </div>

          {/* Search */}
          <div className="col-12 col-md mb-2 mb-lg-0">
            <form className="d-flex" onSubmit={SubmitHandler}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>

          {/* Right Side Buttons */}
          <div className="col-12 col-lg-auto d-flex justify-content-center justify-content-lg-end flex-wrap gap-2">
            {authenticated ? (
              <>
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                  onClick={() => navigate("/cart")}
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cart?.items?.length || 0}
                  </span>
                </button>
                <Link to="/profile" className="btn btn-info text-dark">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="btn btn-danger"
                >
                  Logout
                </button>
                {useradmin && (
                  <Link to="/admin" className="btn btn-info text-dark">
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-success">
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-success">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

     {/* Categories Bar */}
{location.pathname === "/" && (
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
