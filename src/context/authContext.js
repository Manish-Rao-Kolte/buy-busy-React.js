import { createContext, useContext, useState } from "react";
//importing methods from firebase authenticaton for sign up, sign in , sign out. 
import {
    signOut, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, updateProfile
} from 'firebase/auth';
import { auth } from "../config/firebaseInit";
import { useNavigate } from "react-router";


const authContext = createContext();

export const useAuthValue = () => {
    const value = useContext(authContext);
    return value;
}

//custome auth context created here.
const CustomeAuthContext = ({ children }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    //function to register new user.
    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
                    setUserId(res.user.uid);
                    updateProfile(res.user, {
                        displayName: name
                    });
                })
            setName('');
            setEmail('');
            setPassword('');
            setAuthenticated(true);
            navigate('/user');
        } catch (error) {
            setError(error.message);
        }
    };

    //function for existing user sign in.
    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            .then(res => setUserId(res.user.uid));
            setEmail('');
            setPassword('');
            setAuthenticated(true);
            navigate('/user')
        } catch (error) {
            setError(error.message);
        }
    };

    //function for user to sign out.
    const handleSignOut = async () => {
        signOut(auth).then(() => {
            setAuthenticated(false);
            setUserId(null);
            setError('');
            navigate('/');
        }).catch((error) => {
            setError(error.message);
        });
    }

    return (
        <authContext.Provider value={{ name, email, password, error, setName, setEmail, setPassword, handleSignUp, handleSignIn, handleSignOut, authenticated, userId }}>
            {children}
        </authContext.Provider>
    )
}

export default CustomeAuthContext;