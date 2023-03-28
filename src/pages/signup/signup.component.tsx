import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import React from "react";
import AuthForm from "../../components/auth-form/auth-form.component";
import { AuthPageContainer, Heading2 } from "../../global";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../utils/hooks";
import { updatePopup } from "../../redux/helpers/helpers.reducer";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          dispatch(
            updatePopup({
              isPopupActive: true,
              isError: true,
              message: "User with this email already exists",
            })
          );
        } else {
          dispatch(
            updatePopup({
              isPopupActive: true,
              isError: true,
              message: "Something went wrong, please try again",
            })
          );
        }
      });
  };

  return (
    <AuthPageContainer>
      <Heading2>Sign up</Heading2>
      <AuthForm type="signup" handleFormSubmit={handleFormSubmit} />
    </AuthPageContainer>
  );
};

export default SignupPage;
