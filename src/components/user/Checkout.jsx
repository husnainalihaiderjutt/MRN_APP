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
      <div className="container mt-5 text-center">
        <h3>Your cart is empty 🛒</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order Summary</h2>
      <div className="row gy-4">
        {/* Product List Section */}
        <div className="col-lg-8">
          {/* Table for large screens */}
          <div className="table-responsive d-none d-md-block">
            <table className="table table-bordered table-dark text-white align-middle">
              <thead>
                <tr>
                  <th>Product Img</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th colSpan={3} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        src={item.imgSrc}
                        alt={item.title}
                        className="img-fluid rounded"
                        style={{ maxWidth: "60px", objectFit: "cover" }}
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.price} ₹</td>
                    <td>{item.qty}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-warning" onClick={() => decreaseToCartQty(item.productId, 1)}>➖</button>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-info" onClick={() => addToCart(item.productId, item.title, item.price / item.qty, 1, item.imgSrc)}>➕</button>
                    </td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-danger" onClick={() => window.confirm("Remove this item?") && removeToCart(item.productId)}>🗑️</button>
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
          </div>

          {/* Cards for small screens */}
          <div className="d-md-none">
            {cart.items.map((item, index) => (
              <div key={index} className="card mb-3 bg-dark text-white">
                <div className="card-body d-flex flex-column flex-sm-row align-items-sm-center">
                  <img
                    src={item.imgSrc}
                    alt={item.title}
                    className="img-thumbnail me-sm-3 mb-2 mb-sm-0"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1">
                    <h6>{item.title}</h6>
                    <p className="mb-1">Price: {item.price} ₹</p>
                    <p className="mb-1">Qty: {item.qty}</p>
                    <div className="d-flex gap-2 mt-2">
                      <button className="btn btn-sm btn-warning" onClick={() => decreaseToCartQty(item.productId, 1)}>➖</button>
                      <button className="btn btn-sm btn-info" onClick={() => addToCart(item.productId, item.title, item.price / item.qty, 1, item.imgSrc)}>➕</button>
                      <button className="btn btn-sm btn-danger" onClick={() => window.confirm("Remove this item?") && removeToCart(item.productId)}>🗑️</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center fw-bold mt-3">
              <p>Total Items: <span className="text-info">{qtys}</span></p>
              <p>Total Price: <span className="text-warning">{prices} ₹</span></p>
            </div>
          </div>

          <div className="mt-3 text-center text-md-start">
            <button className="btn btn-success" onClick={() => navigate("/")}>
              Proceed to Checkout
            </button>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="col-lg-4">
          <div className="p-3 bg-dark text-white border border-info rounded">
            <h5 className="text-center mb-3">Shipping Address</h5>
            {userAddres ? (
              <ul className="list-unstyled small">
                <li><strong>Name:</strong> {userAddres.fullName}</li>
                <li><strong>Phone:</strong> {userAddres.phoneNumber}</li>
                <li><strong>Country:</strong> {userAddres.country}</li>
                <li><strong>State:</strong> {userAddres.state}</li>
                <li><strong>City:</strong> {userAddres.city}</li>
                <li><strong>PinCode:</strong> {userAddres.pincode}</li>
                <li><strong>Near By:</strong> {userAddres.address}</li>
              </ul>
            ) : (
              <p className="text-center">No shipping address added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
