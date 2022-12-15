import { Button } from "@mui/material";
import React from "react";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import "./Login.css";
const Login = () => {
	const[{},dispatch]=useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
		dispatch({
			type:actionTypes.SET_USER,
			payload:result.user,
		})
	  })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login_container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login_text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn}>Sign in with Google</Button>
      </div>
    </div>
  );
};

export default Login;
