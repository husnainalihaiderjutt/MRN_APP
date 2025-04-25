import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../context/AppContext";


const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const Url = "https://mernapp-production-b839.up.railway.app/api";
  const [product, setProduct ] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${Url}/product/${id}`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });
      setProduct(api.data.products);
    };
    if (id) fetchProduct();
  }, [id]);
  return (<>
    <div
      className="container text-center my-5"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <div className="left">
        <img
          src={product?.imgSrc}
          alt=""
          style={{ width: "250px", height: "250px" ,borderRadius:"10px",border:"5px solid black"}}
        />
      </div>
      <div className="right">
        <h1>{product?.title}</h1>
        <p>{product?.description}</p>
        <h1>{product?.price}</h1>
        <div className="my-3">
          <button className="btn btn-danger mx-3" style={{fontWeight:"bold"}}>Buy Now</button>
          <button className="btn btn-warning" style={{fontWeight:"bold"}} onClick={() =>
  addToCart(
    product._id,
    product.title,
    product.price,
    1,
    product.imgSrc
  )}>Add to Cart</button>
        </div>
      </div>
    </div>
      <RelatedProduct Category={product?.category}></RelatedProduct>
      </>
  );
};

export default ProductDetail;
