import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import AuthForm from "../../components/auth-form/auth-form.component";
import { AuthPageContainer, Heading2 } from "../../global";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks";
import { updatePopup } from "../../redux/helpers/helpers.reducer";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleFormSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    credentials: { email: string; password: string }
  ) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        navigate("/");
      })
      .catch((error) => {
        // const errorCode = error.code;
        dispatch(
          updatePopup({
            isError: true,
            isPopupActive: true,
            message: "Incorrect email or password, please try again",
          })
        );
      });
  };

  return (
    <AuthPageContainer>
      <Heading2>Log in</Heading2>

      <AuthForm type="login" handleFormSubmit={handleFormSubmit} />
    </AuthPageContainer>
  );
};

export default LoginPage;
