import styles from '../../../styles/RegisterUser.module.css'
import { Link } from 'react-router-dom';
import { useAuthValue } from '../../../context/authContext';

const LoginUser = () => {
    const { handleSignIn, error, setEmail, setPassword } = useAuthValue();
    return (
        <>
            <form className={styles.formContainer} onSubmit={(e) => handleSignIn(e)}>
                <h2 className={styles.formHeader}>Sign In!</h2>
                <input className={styles.formInput} type="email" placeholder='Enter Email' required onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.formInput} type="password" placeholder='Enter Password' required onChange={(e) => setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                <button className={styles.formBtn}> Sign In </button>
                <p>Don't have an account? {" "}<Link className={styles.linkBtn} to='/signup'> Sign Up </Link></p>
            </form>
        </>
    )
}

export default LoginUser;