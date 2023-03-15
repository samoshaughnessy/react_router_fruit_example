import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login_Signup_Form() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user);
      // add in context to get user information
      navigate("/fruits/form");
    });
  };

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password).then((user) => {
      console.log(user);
      // add in context to get user information
      navigate("/fruits/list");
    });
  };

  return (
    <div>
      <label>Email</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
