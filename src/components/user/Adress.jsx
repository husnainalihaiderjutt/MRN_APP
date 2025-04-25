/** @format */

import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ShippingAddressForm = () => {
  const navigate = useNavigate();
  const { shippingAddress, userAddres } = useContext(AppContext);
  const [shippingAddres, setShippingAddress] = useState({
    fullName: "",
    address: " ",
    city: " ",
    state: " ",
    country: " ",
    pincode: " ",
    phoneNumber: " ",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddres, [name]: value });
  };
  const { fullName, address, city, state, country, pincode, phoneNumber } =
    shippingAddres;

    const useOldAddress = () => {
      if (userAddres) {
        setShippingAddress({
          fullName: userAddres.fullName || "",
          address: userAddres.address || "",
          city: userAddres.city || "",
          state: userAddres.state || "",
          country: userAddres.country || "",
          pincode: userAddres.pincode || "",
          phoneNumber: userAddres.phoneNumber || "",
        });
      }
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await shippingAddress(
        fullName,
        address,
        city,
        state,
        country,
        pincode,
        phoneNumber
      );
      console.log("API response:", result); // Log the full response to check the structure
      if (result && result.success) {
        navigate("/checkout");
      } else {
        console.error(
          "Failed to add address:",
          result?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error in shipping address submission:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="border border-warning rounded p-4 bg-dark text-white">
        <h2 className="text-center mb-4">Shipping Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                required
                name="fullName"
                value={shippingAddres.fullName}
                onChange={handleOnChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                required
                name="country"
                value={shippingAddres.country}
                onChange={handleOnChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                required
                name="state"
                value={shippingAddres.state}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">City</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                required
                name="city"
                value={shippingAddres.city}
                onChange={handleOnChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                required
                name="pincode"
                value={shippingAddres.pincode}
                onChange={handleOnChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control bg-secondary text-white"
                required
                name="phoneNumber"
                value={shippingAddres.phoneNumber}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">AddressLine/Nearby</label>
            <textarea
              className="form-control bg-secondary text-white"
              rows="3"
              required
              name="address"
              value={shippingAddres.address}
              onChange={handleOnChange}
            ></textarea>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary w-50 me-2">
              Submit
            </button>
            {userAddres && (
              <button type="button" className="btn btn-warning w-50 ms-2" onClick={()=> {useOldAddress();  navigate("/checkout")}}>
                Use Old Address
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShippingAddressForm;
