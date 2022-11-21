import { useContext, useState } from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"
import { doc, getDoc, DocumentSnapshot, DocumentReference} from "firebase/firestore";
import { db } from "../../firebase";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [role, setRole] = useState("")
  const navigate = useNavigate()

  const { dispatch } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user })
        //console.log("I am here1");

        var thisuser = getDoc(doc(db, "users", user.uid));
        var role = (String) ((await thisuser).get("role"));
        //console.log(role +" I am here2");
        if (role == "Federation Representative") {
          navigate("/fedhome");
        }
        else if(role == "Club"){
          navigate("/clubhome");
        }
        else if(role == "Player"){
          navigate("/playerhome");
        }
        else{
          navigate("/");
        }

      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  };

  const sendToSignup = () => {
    navigate("/Signup")
  }

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
          <button type="sign-up" onClick={sendToSignup}>Sign up</button>
          {error && <span>Wrong email or password!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;
