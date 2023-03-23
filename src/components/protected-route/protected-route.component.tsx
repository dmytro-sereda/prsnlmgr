import React from "react";
import { Navigate } from "react-router";
import { UserObject } from "../../utils/interfaces";

interface Props {
  user: UserObject;
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
