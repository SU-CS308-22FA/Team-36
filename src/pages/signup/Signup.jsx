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
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
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
        "name": name,
        "role": role
      });

      /*if (role == "Club") {
        await setDoc(doc(db, "users", res.user.uid), {
          "email": email,
          "password": password,
          "Club Name": name
        });  
      }
      else if (role == "Player") {
        await setDoc(doc(db, "users", res.user.uid), {
          "email": email,
          "password": password,
          "Player Name": name
        });
      }*/

      
      console.log("User: " + res.user.uid + " added")
      console.log("Data added")
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="signup">
        <div>
          <div className="title">SignUp</div>
          <form onSubmit={handleAdd}>
            <div className="roleChoice">Role:
              <input
                type="radio"
                value="Federation Representative"
                name="role"
                id="federation representative"
                onChange={(e) => setRole(e.target.value)}
                /> <label>Federation Representative</label>
                <input
                type="radio"
                value="Club"
                name="role"
                id="club"
                onChange={(e) => setRole(e.target.value)}
                /> <label>Club</label>
                <input
                type="radio"
                value="Player"
                name="role"
                id="player"
                onChange={(e) => setRole(e.target.value)}
                /> <label>Player</label>
              </div>
            <input
              type="email"
              // value={user.email}
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              // required
              onChange={(e) => setName(e.target.value)}
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
