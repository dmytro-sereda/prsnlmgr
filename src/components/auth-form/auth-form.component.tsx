import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, InputContainer, Label, PrimaryButton } from "../../global";
import { AuthFormContainer, SignUpTextContainer } from "./auth-form.styles";

interface Props {
  handleFormSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    credentials: { email: string; password: string }
  ) => void;
  type: "login" | "signup";
}

const AuthForm: React.FC<Props> = ({ handleFormSubmit, type }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <AuthFormContainer
      onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
        handleFormSubmit(e, credentials)
      }
    >
      <InputContainer>
        <Label htmlFor="email">Email:</Label>
        <Input
          value={credentials.email}
          onChange={handleInputChange}
          name="email"
          type="text"
          id="email"
          autoComplete="username"
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor="password">Password:</Label>
        <Input
          value={credentials.password}
          onChange={handleInputChange}
          name="password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
      </InputContainer>

      {type === "login" ? (
        <PrimaryButton>Log in</PrimaryButton>
      ) : (
        <PrimaryButton>Sign up</PrimaryButton>
      )}
      <SignUpTextContainer>
        {type === "login" ? (
          <>
            <p>Don't have an account yet?</p>
            <Link to="/signup">Sign up</Link>
          </>
        ) : (
          <>
            <p>Already have an account?</p>
            <Link to="/login">Log in</Link>
          </>
        )}
      </SignUpTextContainer>
    </AuthFormContainer>
  );
};

export default AuthForm;
