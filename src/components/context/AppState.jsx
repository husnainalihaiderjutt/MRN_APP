/** @format */

import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { toast, Bounce } from "react-toastify"; // Just import toast
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const Url = "https://mernapp-production-b839.up.railway.app/api";
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(null);
  const [authenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [reload, setreload] = useState(false);
  const [userAddres, setUserAddress] = useState("");
  const [useradmin, setUseradmin] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchEverything = async () => {
      try {
        // Fetch products
        const api = await axios.get(`${Url}/product/getProduct`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProducts(api.data.products);
        setFilteredData(api.data.products);
  
        if (token) {
          userToCart();
          getshippingAddress();
  
          const currentUser = await userProfile(); 
          if (currentUser?.email === "halihaider511@gmail.com") {
            setUseradmin(true); 
          } else {
            setUseradmin(false); 
          }
        }
      } catch (err) {
        console.error("Error in fetchEverything", err);
      }
    };
  
    fetchEverything();
  }, [token, reload]);
  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true); 
    }
  }, [token]);

  // Register user
  const register = async ({ name, email, password }) => {
    try {
      const api = await axios.post(
        `${Url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return api.data;
    } catch (error) {
      console.error(error);
      toast("Something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return { success: false };
    }
  };

  // Login user
  const login = async ({ email, password }) => {
    try {
      const api = await axios.post(
        `${Url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token); // Store token in localStorage
      return api.data;
    } catch (error) {
      toast("Something went wrong", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.error(error);
      return { success: false };
    }
  };

  // Logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    setUseradmin(false)
    localStorage.removeItem("token"); // Remove token from localStorage
    toast("Logout Successfully", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  // Fetch user profile
  const userProfile = async () => {
    if (!token) {
      toast("Please log in first", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        theme: "light",
      });
      return null;
    }
  
    try {
      const api = await axios.get(`${Url}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      setUser(api.data.user);
      return api.data.user; // ✅ Return the user for immediate use
    } catch (error) {
      console.error(
        "Error fetching profile:",
        error.response?.data?.message || error.message
      );
      toast("Error fetching profile", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        theme: "light",
      });
      return null;
    }
  };



  //add user cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    if (!token) {
      toast.warn("Please log in to add items to your cart", {
        position: "top-right",
        autoClose: 1000,
      });
      return { success: false, message: "Not authenticated" };
    }
  
    try {
      const api = await axios.post(
        `${Url}/cart/addCart`,
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
  
      setreload(!reload);
  
      toast(api.data.message || "Item added to cart", {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
        transition: Bounce,
      });
  
      return api.data;
    } catch (error) {
      console.error("Add to cart failed:", error);
  
      toast("Failed to add item to cart", {
        position: "top-right",
        autoClose: 1000,
        theme: "dark",
        transition: Bounce,
      });
  
      return { success: false, message: "Error adding to cart" };
    }
  };
  
  
  //get to cart
  const userToCart = async () => {
    const api = await axios.get(`${Url}/cart/userCart`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    setCart(api.data.cart);
  };

    //decrease to cart
    const decreaseToCartQty = async (productId, qty) => {
      const api = await axios.post(`${Url}/cart/--qty`, { productId, qty } ,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      // setCart(api.data.cart);
      setreload(!reload);
      toast(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };
//remove cart by product
    const removeToCart = async (productId) => {
      const api = await axios.delete(`${Url}/cart/removeCart/${productId}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      // setCart(api.data.cart);
      setreload(!reload);
      toast(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };
//clear cart
    const clearCart = async () => {
      const api = await axios.delete(`${Url}/cart/clearCart`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setreload(!reload);
      toast(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    };
// Address post
    const shippingAddress =async(fullName,address,city,state,country,pincode,phoneNumber)=>
    {
       const api = await axios.post(`${Url}/address/userAddressAdd`,{fullName,address,city,state,country,pincode,phoneNumber},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
       )
       toast(api.data.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return api.data; 
    }
    // Address post
    const getshippingAddress =async()=>
      {
         const api = await axios.get(`${Url}/address/getAddress`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
         )
       setUserAddress(api.data.userAddress)
      }
  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        Url,
        token,
        setIsAuthenticated,
        authenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
        reload,
        setreload,
        decreaseToCartQty,
        removeToCart,
        clearCart,
        shippingAddress,
        userAddres,
        useradmin
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
