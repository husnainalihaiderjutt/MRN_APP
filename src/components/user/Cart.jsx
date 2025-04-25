import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cart ,decreaseToCartQty , addToCart , removeToCart , clearCart} = useContext(AppContext);
  const [prices,setPrice] = useState(0)
  const [qtys,setqty] = useState(0)
  const navigate =  useNavigate()
  useEffect(()=>
    {
       let price = 0;
       let qty = 0
       if(cart?.items)
       {
        for(let i=0 ; i<cart.items.length;i++)
        {
          qty += cart.items[i].qty 
          price += cart.items[i].price 
        }
        setPrice(price)
        setqty(qty)
       }
    },[cart])
    

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }


  return (
    <div className="container mt-5">
      <h2 className="mb-4">🛍️ Your Cart</h2>

      <div className="row">
        {cart.items.map((item, index) => (
          <div className="col-md-6 mb-4" key={index}>
            <div className="card p-3 shadow-sm">
              <div className="d-flex align-items-center">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  className="me-3"
                />
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-1">Price: Rs {item.price}</p>
                  <p className="mb-2">Quantity: {item.qty}</p>

                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => decreaseToCartQty(item.productId,1)}
                    >
                      Decrease
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={()=>addToCart(item.productId, item.title, item.price/item.qty,1, item.imgSrc)}
                    >
                      Increase
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to remove this item from the cart?")) {
                          removeToCart(item.productId);
                        }
                      }}                      
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <h4 style={{fontWeight:"bold"}}>Total: Rs {prices}</h4>
      <h4 style={{fontWeight:"bold"}}>Quantity:  {qtys}</h4>
      <button className="btn btn-success mt-3" onClick={()=>navigate("/address")}>Proceed to Checkout</button>
      <button className="btn btn-danger mt-3 mx-3" onClick={()=>clearCart()}>Clear Cart</button>
    </div>
  );
};

export default Cart;
