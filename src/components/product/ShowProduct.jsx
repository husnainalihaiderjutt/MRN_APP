import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { Link } from "react-router-dom";

const ShowProduct = () => {
  const { filteredData, addToCart, reload } = useContext(AppContext);
  const [products, setProducts] = useState(filteredData);

  useEffect(() => {
    setProducts(filteredData);
  }, [filteredData, reload]);

  return (
    <div className="container py-4">
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card shadow-sm h-100">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imgSrc}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain", padding: "10px" }}
                />
              </Link>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">
                  {product.description || "No description available."}
                </p>
                <p className="card-text fw-bold">Price: ${product.price}</p>
                <div className="mt-auto d-flex justify-content-between gap-2 flex-wrap">
                  <button className="btn btn-primary flex-grow-1">{product.price}</button>
                  <button
                    onClick={() =>
                      addToCart(
                        product._id,
                        product.title,
                        product.price,
                        1,
                        product.imgSrc
                      )
                    }
                    className="btn btn-warning flex-grow-1"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
