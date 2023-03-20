import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import AuthForm from "../../components/auth-form/auth-form.component";
import { Heading2 } from "../../global";
import { useNavigate } from "react-router";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    credentials: { email: string; password: string }
  ) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    )
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  };

  return (
    <div>
      <Heading2>Sign up</Heading2>
      <AuthForm type="signup" handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default SignupPage;
