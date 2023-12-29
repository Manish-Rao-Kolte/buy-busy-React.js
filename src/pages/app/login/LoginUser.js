import Spinner from "react-spinner-material";
import styles from "../../../styles/RegisterUser.module.css";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../../context/authContext";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const LoginUser = () => {
  const { handleSignIn, error, setEmail, setPassword, loading } =
    useAuthValue();

  return (
    <div className={styles.container}>
      {loading && (
        <Backdrop
          sx={{ color: "red", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <form className={styles.formContainer} onSubmit={(e) => handleSignIn(e)}>
        <h2 className={styles.formHeader}>Sign In!</h2>
        <input
          className={styles.formInput}
          type="email"
          placeholder="Enter Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.formInput}
          type="password"
          placeholder="Enter Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p>{error}</p>}
        <button disabled={loading} className={styles.formBtn}>
          {" "}
          Sign In{" "}
        </button>
        <p>
          Don't have an account?{" "}
          <Link className={styles.linkBtn} to="/signup">
            {" "}
            Sign Up{" "}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginUser;
