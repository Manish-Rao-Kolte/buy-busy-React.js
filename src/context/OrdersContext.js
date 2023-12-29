import { createContext, useContext, useState, useEffect } from "react";
import { useProductValue } from "./productContext";
import { useNavigate } from "react-router";
import { auth } from "../config/firebaseInit";
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebaseInit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersContext = createContext();

export const useOrdersValue = () => {
  const value = useContext(OrdersContext);
  return value;
};

const CutomeOrdersContext = ({ children }) => {
  const { handleRemoveCart, loading, setLoading, cartTotal } =
    useProductValue();
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const createOrder = async (cart) => {
    const date = new Date();
    const dd = date.getDate();
    const mm = date.getMonth() + 1;
    const yy = date.getFullYear();

    if (user !== null) {
      setLoading(true);
      const uid = user.uid;
      const ref = collection(db, "usersOrders", uid, "myOrders");
      const snapShot = await getDocs(ref);
      if (!snapShot.empty) {
        const docRef = doc(ref, "orders");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            list: [
              {
                orderDate: yy + "-" + mm + "-" + dd,
                order: cart,
                total: cartTotal,
              },
              ...docSnap.data().list,
            ],
          });
        } else {
          console.log("No such document!");
        }
      } else {
        await setDoc(doc(ref, "orders"), {
          list: [
            { orderDate: `${yy}-${mm}-${dd}`, order: cart, total: cartTotal },
          ],
        });
      }
      let newOrder = cart;
      let order = true;
      if (cart.length !== 0) {
        newOrder.map((item) => {
          handleRemoveCart(item.prod, order);
        });
      }
      navigate(`/user/${user.uid}/orders`);
    } else {
      console.log("You are not logged in!");
    }
    setLoading(false);
    toast.success("Order Placed, Thank You!!");
  };

  useEffect(() => {
    const uid = user && user.uid;
    const ref = user && collection(db, "usersOrders", uid, "myOrders");
    user &&
      onSnapshot(doc(ref, "orders"), (doc) => {
        try {
          setOrders(doc.data().list);
        } catch (err) {
          console.log(err);
        }
      });
    !user && setOrders([]);
  }, [user]);

  return (
    <OrdersContext.Provider
      value={{ orders, createOrder, loading, setLoading }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export default CutomeOrdersContext;
