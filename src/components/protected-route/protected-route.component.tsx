import React from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Navigate } from "react-router";

interface Props {
  user: FirebaseUser | null;
  children: any;
  redirectTo: string;
  type: "auth" | "app";
}

const ProtectedRoute: React.FC<Props> = ({
  user,
  children,
  redirectTo,
  type,
}) => {
  if ((!user && type === "app") || (user && type === "auth"))
    return <Navigate to={redirectTo} replace />;

  return children;
};

export default ProtectedRoute;
