import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import AuthForm from "../../components/auth-form/auth-form.component";
import { Heading2 } from "../../global";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    credentials: { email: string; password: string }
  ) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        navigate("/");
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div>
      <Heading2>Log in</Heading2>

      <AuthForm type="login" handleFormSubmit={handleFormSubmit} />
    </div>
  );
};

export default LoginPage;
