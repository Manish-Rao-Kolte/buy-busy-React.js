import { createContext, useContext, useState, useEffect } from "react";
import {
  getDoc,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  getDocs,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { auth } from "../config/firebaseInit";
import { db } from "../config/firebaseInit";
import { useAuthValue } from "./authContext";
import { toast } from "react-toastify";

const productContext = createContext();

export const useProductValue = () => {
  const value = useContext(productContext);
  return value;
};

//custome context created.
const CustomeProductContext = ({ children }) => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const { loading, setLoading } = useAuthValue();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [priceFilter, setPriceFilter] = useState(800);
  const [filterTags, setFilterTags] = useState([]);

  //checking current user
  const user = auth.currentUser;

  //handling search function in search bar
  const handleSearchFilter = async (e, checkbox) => {
    const products = data;
    if (checkbox) {
      if (e.target.checked) {
        const data = products.filter(
          (item) => item.category.toLowerCase() === e.target.value.toLowerCase()
        );
        setFilteredData((prev) => [...prev, ...data]);
      } else {
        setFilteredData(
          filteredData.filter(
            (item) =>
              item.category.toLowerCase() !== e.target.value.toLowerCase()
          )
        );
      }
    } else {
      const filter = products.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchTerm.length === 1) {
        setSearchTerm("");
      }
      setFilteredData(filter);
    }
  };

  //adding product to cart for logged in user
  const handleAddCart = async (prod) => {
    if (user !== null) {
      setLoading(true);
      const uid = user.uid;
      const ref = collection(db, "usersCarts", uid, "myCart");
      const snapShot = await getDocs(ref);

      if (!snapShot.empty) {
        const docRef = doc(ref, "cart");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let array = docSnap.data().list;
          const index = docSnap
            .data()
            .list.findIndex((item) => item.prod.id === prod.id);
          if (index === -1) {
            await updateDoc(docRef, {
              list: [...docSnap.data().list, { qty: 1, prod }],
            });
          } else {
            await updateDoc(docRef, {
              list: arrayRemove(array[index]),
            });
            await updateDoc(docRef, {
              list: arrayUnion({ qty: array[index].qty + 1, prod }),
            });
          }
          setCartTotal((prev) => prev + prod.price);
        } else {
          console.log("No such document!");
        }
      } else {
        await setDoc(doc(ref, "cart"), {
          list: [{ qty: 1, prod }],
        });
        setCartTotal((prev) => prev + prod.price);
      }
      toast.success("Product Added To Cart!!");
    } else {
      toast.error("You Are Not Logged In!!");
    }
    setLoading(false);
  };

  //increasing qty on product card in cart
  const handleIncreaseQty = async (prod) => {
    const i = cart.findIndex((item) => item.prod.id === prod.id);
    cart[i] = { qty: cart[i].qty + 1, prod };
    setCart([...cart]);
    setCartTotal((prev) => prev + prod.price);
    if (user !== null) {
      const uid = user.uid;
      const ref = collection(db, "usersCarts", uid, "myCart");
      const snapShot = await getDocs(ref);

      if (!snapShot.empty) {
        const docRef = doc(ref, "cart");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            list: cart,
          });
        }
      }
    }
  };

  //decreasing qty on product card in cart
  const handleDecreaseQty = async (prod) => {
    const i = cart.findIndex((item) => item.prod.id === prod.id);
    if (cart[i].qty !== 1) {
      cart[i] = { qty: cart[i].qty - 1, prod };
      setCart([...cart]);
    } else {
      cart.splice(i, 1);
      setCart([...cart]);
    }
    if (cartTotal - prod.price >= 0) {
      setCartTotal((prev) => prev - prod.price);
    }
    if (user !== null) {
      const uid = user.uid;
      const ref = collection(db, "usersCarts", uid, "myCart");
      const snapShot = await getDocs(ref);

      if (!snapShot.empty) {
        const docRef = doc(ref, "cart");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let array = docSnap.data().list;
          const index = array.findIndex((item) => item.prod.id === prod.id);
          if (array[index].qty !== 1) {
            await updateDoc(docRef, {
              list: cart,
            });
          }
          //removing product from db if qty is less then 1
          else {
            await updateDoc(docRef, {
              list: arrayRemove(array[index]),
            });
          }
        }
      }
    }
  };

  //removing product from db when clicked
  const handleRemoveCart = async (prod, order) => {
    if (user !== null) {
      setLoading(true);
      const uid = user.uid;
      const ref = collection(db, "usersCarts", uid, "myCart");
      const snapShot = await getDocs(ref);

      if (!snapShot.empty) {
        const docRef = doc(ref, "cart");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let array = docSnap.data().list;
          const index = array.findIndex((item) => item.prod.id === prod.id);
          if (cartTotal - array[index].qty * prod.price > 0) {
            setCartTotal((prev) => prev - array[index].qty * prod.price);
          } else {
            setCartTotal(0);
          }
          await updateDoc(docRef, {
            list: arrayRemove(array[index]),
          });
        }
      }
      if (!order) {
        toast.success("Product Removed Successfully!!");
      }
    }
    setLoading(false);
  };

  //getting product data from db on mounting.
  useEffect(() => {
    getDoc(doc(db, "products", "list"))
      .then((snap) => {
        setData(snap.data().data);
      })
      .catch((err) => toast.error("Error Occurred!!"));
  }, []);

  useEffect(() => {
    if (cart !== 0) {
      setCartTotal(0);
      cart.map((item) => {
        setCartTotal((prev) => prev + item.prod.price * item.qty);
      });
    }
  });

  //this is implemented to set cart data when user is changed, so new user cannot see last user's cart details.
  useEffect(() => {
    !user && setLoading(true);
    const uid = user && user.uid;
    const ref = user && collection(db, "usersCarts", uid, "myCart");
    user &&
      onSnapshot(doc(ref, "cart"), (doc) => {
        try {
          setCart(doc.data().list);
        } catch (err) {
          console.log(err);
        }
      });
    !user && setCart([]);
    user && setLoading(false);
  }, [user]);

  return (
    <productContext.Provider
      value={{
        data,
        setData,
        cart,
        handleAddCart,
        handleRemoveCart,
        handleIncreaseQty,
        handleDecreaseQty,
        filteredData,
        searchTerm,
        setSearchTerm,
        handleSearchFilter,
        cartTotal,
        setCartTotal,
        user,
        loading,
        setLoading,
        priceFilter,
        setPriceFilter,
      }}
    >
      {children}
    </productContext.Provider>
  );
};

export default CustomeProductContext;
