/** @format */

import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [SearchProduct, setSearchProduct] = useState([]);
  const { term } = useParams();

  useEffect(() => {
    if (products?.length > 0) {
      const filtered = products.filter((data) =>
        data.title?.toLowerCase().includes(term?.toLowerCase())
      );
      setSearchProduct(filtered);
    }
  }, [term, products]);

  return (
    <div className="container text-center">
      <h1 style={{ fontWeight: "bold" }}>Search Products</h1>
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row container d-flex justify-content-center align-items-center my-5">
          {SearchProduct.length === 0 ? (
            <p>No Search products found.</p>
          ) : (
            SearchProduct.map((product) => (
              <div
                key={product?._id}
                className="my-3 col-md-4 d-flex justify-content-center align-items-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/product/${product?._id}`}
                    className="d-flex justify-content-center align-items-center p-3"
                  >
                    <img
                      src={product?.imgSrc}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "10px",
                        border: "2px solid yellow",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product?.title}</h5>
                    <p className="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                    <div className="my-3">
                      <button className="btn btn-primary mx-3">
                        {product?.price}
                      </button>
                      <button className="btn btn-warning">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
