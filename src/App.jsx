import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import './index.css'
import AppContext from "./components/context/AppContext";
import ShowProduct from "./components/product/ShowProduct";
import {BrowserRouter as Router , Routes ,Route } from "react-router-dom"
import ProductDetail from "./components/product/ProductDetail";
import Navbar from "./components/user/Navbar";
import SearchProduct from "./components/product/SearchProduct";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { ToastContainer } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from "./components/user/Profile";
import Cart from "./components/user/Cart";
import ShippingAddressForm from "./components/user/Adress";
import Checkout from "./components/user/Checkout";
import AdminProductPanel from "./components/user/Admin";





function App() {
  return (
    <>
    <Router>
    <Navbar></Navbar>
    <ToastContainer /> 
      <Routes>
        <Route path="/" element={<ShowProduct/>}></Route>
        <Route path="/product/:id" element={<ProductDetail/>}></Route>
        <Route path="/product/search/:term" element={<SearchProduct/>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/address" element={<ShippingAddressForm/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/admin" element={<AdminProductPanel/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
