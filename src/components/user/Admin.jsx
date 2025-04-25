import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminProductPanel = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    qty: "",
    imgSrc: "",
  });
  const Url = "https://mernapp-production-b839.up.railway.app/api";

  const getProducts = async () => {
    const res = await axios.get(`${Url}/product/getProduct`);
    setProducts(res.data.products);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    await axios.post(`${Url}/product/addProduct`, form);
    setForm({ title: "", description: "", price: "", category: "", qty: "", imgSrc: "" });
    getProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`${Url}/product/${id}`);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container p-5">
      <h1 className="display-4 mb-5">Admin Product Panel</h1>

      <div className="row mb-4">
        {["title", "description", "price", "category", "qty", "imgSrc"].map((field) => (
          <div className="col-md-2" key={field}>
            <input
              type="text"
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="form-control mb-2"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleAddProduct}
        className="btn btn-primary mb-4"
      >
        Add Product
      </button>

      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <img src={p.imgSrc} alt={p.title} className="card-img-top" style={{ height: '200px', objectFit: 'contain' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text font-weight-bold">Price: ${p.price}</p>
                <p className="card-text">Stock: {p.qty}</p>
                <p className="card-text">Category: {p.category}</p>

                <div className="d-flex justify-content-between mt-auto">
                  {/* EDIT will be wired up later */}
                  <button className="btn btn-warning">Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
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

export default AdminProductPanel;
