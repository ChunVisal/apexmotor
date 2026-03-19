// src/main.jsx
import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { FilterProvider } from "./context/FilterContext";
import { SoldProvider } from "./context/SoldContext";
import { HelmetProvider } from "react-helmet-async";
import './utils/i18n';
import ReactGA from "react-ga4";
import Disclaimer from "./pages/Disclaimer";

ReactGA.initialize("G-JN76D1YXY4"); // your GA measurement ID
ReactGA.send("pageview"); 
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <FilterProvider>
                  <SoldProvider>
                    <HelmetProvider>
                      <Disclaimer />
                      <App />
                    </HelmetProvider>
                  </SoldProvider>
                </FilterProvider>
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);
