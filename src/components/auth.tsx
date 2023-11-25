"use client"

import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";


const Auth = () => {
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <div className="flex justify-between m-2">
      {isLoggedIn ? (
        <>
          <div className="text-white p-1 bg-blue-500 rounded-md">{user.email}</div>
          <button onClick={() => auth.signOut()} className="text-red-500 outline rounded-md p-[4px] hover:bg-red-500 hover:text-white outline-2 outline-red-500">
            Logout
          </button>
        </>
      ) : (
        <button
          className="bg-blue-500 text-white py-1 px-2 rounded"
          onClick={handleAuth}
        >
          Login with Google
        </button>
      )}
    </div>
  );
};

export default Auth;
