import { createContext, useContext, useState } from "react";
//importing methods from firebase authenticaton for sign up, sign in , sign out.
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseInit";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const authContext = createContext();

export const useAuthValue = () => {
  const value = useContext(authContext);
  return value;
};

//custome auth context created here.
const CustomeAuthContext = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //function to register new user.
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (res) => {
          setUserId(res.user.uid);
          updateProfile(res.user, {
            displayName: name,
          });
        }
      );
      toast.success("Account Created Successfully!!");
      setName("");
      setEmail("");
      setPassword("");
      setAuthenticated(true);
      navigate("/user");
    } catch (error) {
      toast.error("Error In Account Creation!!");
    }
    setLoading(false);
  };

  //function for existing user sign in.
  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        setUserId(res.user.uid);
      });
      toast.success("Signed In Successfully!!");
      setEmail("");
      setPassword("");
      setAuthenticated(true);
      navigate("/user");
    } catch (error) {
      toast.error("Problem Occured In Login!!");
    }
    setLoading(false);
  };

  //function for user to sign out.
  const handleSignOut = async () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setAuthenticated(false);
        setUserId(null);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error In Signing Out!!");
      });
    setLoading(false);
    toast.success("Signed Out Successfully!!");
  };

  return (
    <authContext.Provider
      value={{
        name,
        email,
        password,
        error,
        setName,
        setEmail,
        setPassword,
        handleSignUp,
        handleSignIn,
        handleSignOut,
        authenticated,
        userId,
        loading,
        setLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default CustomeAuthContext;
