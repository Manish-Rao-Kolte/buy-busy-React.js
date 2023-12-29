import React from "react";
import { useProductValue } from "../../../context/productContext";
import ProductCard from "../../../Components/product-card/ProductCard";
import styles from "./cart.module.css";
import { useOrdersValue } from "../../../context/OrdersContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const { cart, cartTotal } = useProductValue();
  const { createOrder, loading } = useOrdersValue();

  return (
    <>
      {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}

      {cart.length === 0 ? (
        <h1>Cart is Empty!!</h1>
      ) : (
        <div style={{ display: "flex" }}>
          <div className={styles.cartTotalContainer}>
            <div>Total : &#8377; {cartTotal.toFixed(2)}/-</div>
            <button
              disabled={loading}
              className={styles.purchaseBtn}
              onClick={() => createOrder(cart)}
            >
              {" "}
              Purchase{" "}
            </button>
          </div>
          <div className={styles.cartContainer}>
            <div className={styles.cartList}>
              {cart.length !== 0 &&
                cart.map((item) => {
                  return (
                    <ProductCard
                      prod={item.prod}
                      qty={item.qty}
                      incart={true}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
