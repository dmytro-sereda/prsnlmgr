import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header.component";
import GlobaStyle, {
  ApplicationContainer,
  ApplicationRightSideContainer,
} from "./global";
import LoginPage from "./pages/login/login.component";
import SignupPage from "./pages/signup/signup.component";
import { auth } from "./firebase";
import CreateEntryPage from "./pages/create-entry/create-entry.component";
import Sidebar from "./components/sidebar/sidebar.component";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import { selectUserEntity } from "./redux/user/user.selectors";
import { updateUserObject } from "./redux/user/user.reducer";
import ProtectedRoute from "./components/protected-route/protected-route.component";
import Popup from "./components/popup/popup.component";
import { selectIsPopupActive } from "./redux/helpers/helpers.selector";

const App: React.FC = () => {
  const currentUser = useAppSelector(selectUserEntity);
  const isPopupActive = useAppSelector(selectIsPopupActive);
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // dispatch(updateUserObject(user));
      if (user) {
        dispatch(
          updateUserObject({ userID: user.uid, email: user.email || "" })
        );
      } else {
        dispatch(updateUserObject(null));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <GlobaStyle />
      {isPopupActive && <Popup />}
      <ApplicationContainer>
        {currentUser && <Sidebar />}
        <ApplicationRightSideContainer>
          <Header />
          <Routes>
            <Route
              path="/createEntry"
              element={
                <ProtectedRoute
                  user={currentUser}
                  redirectTo="/login"
                  type="app"
                >
                  <CreateEntryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/entries"
              element={
                <ProtectedRoute
                  user={currentUser}
                  redirectTo="/login"
                  type="app"
                >
                  <div>Entries</div>
                </ProtectedRoute>
              }
            />
            <Route
              path="login"
              element={
                <ProtectedRoute
                  redirectTo="/createEntry"
                  user={currentUser}
                  type="auth"
                >
                  <LoginPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="signup"
              element={
                <ProtectedRoute
                  redirectTo="/createEntry"
                  user={currentUser}
                  type="auth"
                >
                  <SignupPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/createEntry" replace />} />
          </Routes>
        </ApplicationRightSideContainer>
      </ApplicationContainer>
    </div>
  );
};

export default App;
