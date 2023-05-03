import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/header.component";
import GlobaStyle, {
  ApplicationContainer,
  ApplicationRightSideContainer,
} from "./global";
import LoginPage from "./pages/login/login.component";
import SignupPage from "./pages/signup/signup.component";
import { auth, db } from "./firebase";
import CreateEntryPage from "./pages/create-entry/create-entry.component";
import Sidebar from "./components/sidebar/sidebar.component";
import { useAppDispatch, useAppSelector } from "./utils/hooks";
import {
  selectHasCompletedGuide,
  selectUserEntity,
} from "./redux/user/user.selectors";
import {
  updateEntries,
  updateUserObject,
  updateHasCompletedGuide,
} from "./redux/user/user.reducer";
import ProtectedRoute from "./components/protected-route/protected-route.component";
import Popup from "./components/popup/popup.component";
import {
  selectIsMenuOpen,
  selectIsPopupActive,
} from "./redux/helpers/helpers.selector";
import { updateIsPopupActive } from "./redux/helpers/helpers.reducer";
import ViewEntriesPage from "./pages/view-entries/view-entries.component";
import AnalyticsPage from "./pages/analytics/analytics.component";
import { onValue, ref } from "firebase/database";
import { EntryEntity } from "./utils/interfaces";
import ProfilePage from "./pages/profile/profile.component";
import Guide from "./components/guide/guide.component";

const App: React.FC = () => {
  const currentUser = useAppSelector(selectUserEntity);
  const isPopupActive = useAppSelector(selectIsPopupActive);
  const isMenuOpen = useAppSelector(selectIsMenuOpen);
  const hasCompletedGuide = useAppSelector(selectHasCompletedGuide);

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      // dispatch(updateUserObject(user));
      if (user) {
        dispatch(
          updateUserObject({
            userID: user.uid,
            email: user.email || "",
            emailVerified: user.emailVerified,
          })
        );
      } else {
        dispatch(updateUserObject(null));
      }
    });
    // eslint-disable-next-line
  }, []);

  // Remove popup after 3s
  useEffect(() => {
    if (isPopupActive) {
      setTimeout(() => {
        dispatch(updateIsPopupActive(false));
      }, 3000);
    }
    // eslint-disable-next-line
  }, [isPopupActive]);

  // Load entries and update global state
  useEffect(() => {
    if (currentUser) {
      // Get entries
      const userRef = ref(db, `/entries/${currentUser?.userID}`);
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const entriesArray: [] | EntryEntity[] = Object.values(data);
          dispatch(updateEntries(entriesArray));
        } else {
          dispatch(updateEntries([]));
        }
      });

      // Get guide info
      const guideRef = ref(db, `/users/${currentUser?.userID}`);
      onValue(guideRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.hasCompletedGuide) {
          dispatch(updateHasCompletedGuide(data.hasCompletedGuide));
        } else {
          dispatch(updateHasCompletedGuide(false));
        }
      });
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div className="App">
      <GlobaStyle />
      {isPopupActive && <Popup />}
      <ApplicationContainer>
        {currentUser && (
          <>
            {!hasCompletedGuide && <Guide />}
            <Sidebar isOpen={isMenuOpen} />
          </>
        )}
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
                  <ViewEntriesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute
                  user={currentUser}
                  redirectTo="/login"
                  type="app"
                >
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  user={currentUser}
                  redirectTo="/login"
                  type="app"
                >
                  <ProfilePage />
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
