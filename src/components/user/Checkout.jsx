import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, decreaseToCartQty, addToCart, removeToCart, clearCart, userAddres } = useContext(AppContext);
  const [prices, setPrice] = useState(0);
  const [qtys, setQty] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    let qty = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price * cart.items[i].qty;
      }
      setPrice(price);
      setQty(qty);
    }
  }, [cart]);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Summary</h2>
      <div className="row">
        <div className="col-lg-8">
          <table className="table table-bordered table-dark text-white">
            <thead>
              <tr>
                <th>Product Img</th>
                <th>Title</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Qty--</th>
                <th>Qty++</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.qty}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => decreaseToCartQty(item.productId, 1)}
                    >
                      ➖
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => addToCart(item.productId, item.title, item.price / item.qty, 1, item.imgSrc)}
                    >
                      ➕
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm("Remove this item?")) {
                          removeToCart(item.productId);
                        }
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2" className="text-center fw-bold">Total</td>
                <td className="fw-bold text-warning">{prices} ₹</td>
                <td className="fw-bold text-info">{qtys}</td>
                <td colSpan="3"></td>
              </tr>
            </tbody>
          </table>
          <div className="mt-3">
            <button className="btn btn-success me-2" onClick={() => navigate("/")}>
              Proceed to Checkout
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="border border-info p-3 bg-dark text-white rounded">
            <h5 className="text-center mb-3">Shipping Address</h5>
            {userAddres ? (
              <ul className="list-unstyled">
                <li><strong>Name:</strong> {userAddres.fullName}</li>
                <li><strong>Phone:</strong> {userAddres.phoneNumber}</li>
                <li><strong>Country:</strong> {userAddres.country}</li>
                <li><strong>State:</strong> {userAddres.state}</li>
                <li><strong>City:</strong> {userAddres.city}</li>
                <li><strong>PinCode:</strong> {userAddres.pincode}</li>
                <li><strong>Near By:</strong> {userAddres.address}</li>
              </ul>
            ) : (
              <p>No shipping address added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
