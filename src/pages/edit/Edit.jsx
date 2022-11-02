import { useContext, useState, useEffect } from "react";
import "./edit.scss";
import { auth, db } from "../../firebase";
import { updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext"
import { doc, updateDoc } from "firebase/firestore";

const Edit = () => {

    const user = auth.currentUser;
    const [matchError, setMatchError] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [club, setClub] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const { dispatch } = useContext(AuthContext)

    const handleEdit = (e) => {
        e.preventDefault();
        if (confirmPass == password) {
            const credential = EmailAuthProvider.credential(user.email, oldPassword)
            reauthenticateWithCredential(user, credential).then(async () => {
                console.log(user.email + " logged")
                const newPassword = password;
                updatePassword(user, newPassword).then(() => {
                    // Update successful.
                    console.log("Updated")
                    // navigate("/login")
                }).catch((error) => {
                    // An error ocurred
                    // ...
                    console.log(error)
                    console.log("in error")
                });
                if (email != user.email) {
                    updateEmail(user, email).then(() => {
                        console.log("Email is updated");
                        // navigate("/login")
                    }).catch((error) => {
                        console.log("Email not updated :(")
                        console.log(user)
                        console.log(error)
                    });
                }
                await updateDoc(doc(db, "users", user.uid), {
                    "email": email,
                    "password": password,
                    "Club Name": club
                });
                dispatch({ type: "LOGOUT", payload: null })
            }).catch((error) => {
                console.log("Error: " + error)
            })
        } else {
            setMatchError(true);
        }
    }

    return (
        <div className="login">
            <div>
                <div className="title">Update Profile</div>
                <form onSubmit={handleEdit}>
                    <input
                        type="email"
                        // value={user.email}
                        defaultValue={user.email}
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
                        placeholder="old password"
                        required
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        // required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="confirm password"
                        required={password.length != 0}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                    <button type="submit">Edit</button>
                    {matchError && <span>Passwords don't match!</span>}
                </form>
            </div>
        </div>
    );
};

export default Edit;
