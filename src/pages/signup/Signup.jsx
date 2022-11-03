import { useState } from "react";
// import "./edit.scss";
import { useNavigate } from "react-router-dom";
import "./signup.scss";
import PasswordChecklist from "react-password-checklist";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {

  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [club, setClub] = useState("");
  const navigate = useNavigate()
  const [confirmPass, setConfirmPass] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        "email": email,
        "password": password,
        "Club Name": club
      });
      console.log("User: " + res.user.uid + " added")
      console.log("Data added")
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="login">
        <div>
          <div className="title">SignUp</div>
          <form onSubmit={handleAdd}>
            <input
              type="email"
              // value={user.email}
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="club name"
              // required
              onChange={(e) => setClub(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="confirm password"
              required={password.length != 0}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <PasswordChecklist
              rules={["minLength", "specialChar", "number", "capital", "match"]}
              minLength={8}
              value={password}
              valueAgain={confirmPass}
              messages={{
                minLength: "Password has more than 8 characters.",
                specialChar: "Password has special characters.",
                number: "Password has a number.",
                capital: "Password has a capital letter.",
                match: "Passwords match."
              }}
              onChange={(isValid) => { setValid(isValid) }}
            />
            <button disabled={!valid} type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
