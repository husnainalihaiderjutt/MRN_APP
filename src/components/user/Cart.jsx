import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    decreaseToCartQty,
    addToCart,
    removeToCart,
    clearCart,
  } = useContext(AppContext);

  const [prices, setPrice] = useState(0);
  const [qtys, setQty] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    let qty = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
      setPrice(price);
      setQty(qty);
    }
  }, [cart]);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">🛍️ Your Cart</h2>

      <div className="row">
        {cart.items.map((item, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card p-3 shadow-sm h-100">
              <div className="d-flex flex-column align-items-center text-center">
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                  className="mb-2"
                />
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-1">Price: Rs {item.price}</p>
                  <p className="mb-2">Quantity: {item.qty}</p>

                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => decreaseToCartQty(item.productId, 1)}
                    >
                      Decrease
                    </button>
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        addToCart(
                          item.productId,
                          item.title,
                          item.price / item.qty,
                          1,
                          item.imgSrc
                        )
                      }
                    >
                      Increase
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to remove this item from the cart?"
                          )
                        ) {
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
      <div className="d-flex flex-column align-items-start">
        <h4 className="fw-bold">Total: Rs {prices}</h4>
        <h4 className="fw-bold">Quantity: {qtys}</h4>
        <div className="mt-3">
          <button
            className="btn btn-success me-3"
            onClick={() => navigate("/address")}
          >
            Proceed to Checkout
          </button>
          <button className="btn btn-outline-danger" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
