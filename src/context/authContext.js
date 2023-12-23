import { createContext, useContext, useState } from "react";
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

const CustomeAuthContext = ({ children }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);

    const navigate = useNavigate();


    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((res) => {
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

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
            setAuthenticated(true);
            navigate('/user')
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignOut = async () => {
        signOut(auth).then(() => {
            setAuthenticated(false);
            console.log('Sign out successfull');
            setError('');
            navigate('/');
        }).catch((error) => {
            setError(error.message);
        });
    }

    return (
        <authContext.Provider value={{ name, email, password, error, setName, setEmail, setPassword, handleSignUp, handleSignIn, handleSignOut, authenticated }}>
            {children}
        </authContext.Provider>
    )
}

export default CustomeAuthContext;