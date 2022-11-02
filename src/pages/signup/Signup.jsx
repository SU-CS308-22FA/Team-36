import "./signup.scss";
import { userInputs } from "../../formSource.js";
import { useState } from "react";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import user from "./user.png"
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate()

  console.log(data);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,

      });
      navigate(-1)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">

      <div className="newContainer">

        <div className="top">
          <h1>Sign up</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={user}
              alt=""
            />
          </div>
          <div className="right">
            <form onSubmit={handleAdd}>
              {userInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleInput}
                  />
                </div>
              ))}
              <button type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;