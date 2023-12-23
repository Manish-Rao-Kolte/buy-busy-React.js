import { createContext, useContext, useState, useEffect } from "react";
import { getDoc, setDoc, doc, onSnapshot } from "firebase/firestore";

import { auth } from "../config/firebaseInit";
import { db } from "../config/firebaseInit";

const productContext = createContext();

export const useProductValue = () => {
    const value = useContext(productContext);
    return value;
}

const CustomeProductContext = ({ children }) => {

    const [data, setData] = useState([]);


    useEffect(() => {
        getDoc(doc(db, "products", "list"))
        .then(snap => setData(snap.data().data));
    }, [])

    return (
        <productContext.Provider value={{data, setData}}>
            {children}
        </productContext.Provider>
    )
}

export default CustomeProductContext;