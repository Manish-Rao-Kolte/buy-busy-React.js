import React from "react";
import OrderCard from "../../../Components/order-card/OrderCard";
import { useOrdersValue } from "../../../context/OrdersContext";
import styles from "./order.module.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Order = () => {
  const { orders, loading } = useOrdersValue();

  return (
    <div className={styles.orderContainer}>
      {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {orders.length === 0 && <h2>No Order To Show, Place a new order!</h2>}
      <div className={styles.oderList}>
        {orders.length !== 0 &&
          orders.map((item) => {
            return (
              <OrderCard
                order={item.order}
                date={item.orderDate}
                total={item.total}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Order;
