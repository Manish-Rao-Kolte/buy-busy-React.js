import styles from '../../../styles/RegisterUser.module.css'
import { Link } from 'react-router-dom';
import { useAuthValue } from '../../../context/authContext';

const RegisterUser = () => {
    const { error, setName, setEmail, setPassword, handleSignUp } = useAuthValue();

    return (
        <>
            <form className={styles.formContainer} onSubmit={(e) => handleSignUp(e)}>
                <h2 className={styles.formHeader}>Sign Up!</h2>
                <input className={styles.formInput} type="text" placeholder='Enter Name' required onChange={(e) => setName(e.target.value)} />
                <input className={styles.formInput} type="email" placeholder='Enter Email' required onChange={(e) => setEmail(e.target.value)} />
                <input className={styles.formInput} type="password" placeholder='Enter Password' required onChange={(e) => setPassword(e.target.value)} />
                {error && <p>{error}</p>}
                <button type='submit' className={styles.formBtn}> Sign Up </button>
                <p>Already have an account? {" "}<Link className={styles.linkBtn} to='/login'> Sign In </Link></p>
            </form>


        </>
    )
}

export default RegisterUser;