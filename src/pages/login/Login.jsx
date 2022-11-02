import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("I am here")
        dispatch({ type: "LOGIN", payload: user })
        console.log("I am here 2")
        navigate("/")
      })
      .catch((error) => {
        setError(true);
      });
  };


  return (
    <div className="login">
      <div>
        <div className="title">Federation Financial Portal</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="user"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {error && <span>Wrong email or password!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;