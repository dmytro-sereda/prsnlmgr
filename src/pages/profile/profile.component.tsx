import { Icon } from "@iconify/react";
import {
  deleteUser,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { auth, db } from "src/firebase";
import {
  ErrorMessage,
  Heading3,
  Input,
  InputContainer,
  Label,
  PrimaryButton,
} from "src/global";
import { updatePopup } from "src/redux/helpers/helpers.reducer";
import { updateFullName } from "src/redux/user/user.reducer";
import {
  selectFullName,
  selectHasCompletedGuide,
  selectUserEntity,
} from "src/redux/user/user.selectors";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { colors } from "src/utils/variables";
import {
  CancelNameButton,
  DangerZoneContainer,
  DeleteAccountButton,
  EditNameButton,
  EmailSectionContainer,
  EmailText,
  IsVerifiedText,
  NameContainer,
  NameInput,
  NameInputContainer,
  SaveNameButton,
  UpdatePasswordForm,
  UpdatePasswordSectionContainer,
  UserInformationContainer,
  VerificationContainer,
  VerificationMessageContainer,
} from "./profile.styles";
// import { PageContainer } from "src/global";

const ProfilePage: React.FC = () => {
  // LOCAL STATE
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<{
    newPassword?: string;
    confirmNewPassword?: string;
  }>({});
  const [isNameBeingUpdated, setIsNameBeingUpdated] = useState(false);

  // GLOBAL STATE
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserEntity);
  const fullName = useAppSelector(selectFullName);
  const hasCompletedGuide = useAppSelector(selectHasCompletedGuide);
  const userInstance = auth.currentUser;
  const authUser = auth.currentUser;

  const handleSubmitUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate the length of the password
    if (newPassword.trim().length < 8) {
      // Display error
      setPasswordErrors({
        newPassword: "Password must be at least 8 characters long",
      });

      // Display popup
      dispatch(
        updatePopup({
          isError: true,
          isPopupActive: true,
          message: "💥 Please fix the errors above",
        })
      );

      return;
    }

    // Validate both passwords matching
    if (confirmPassword !== newPassword) {
      setPasswordErrors({ confirmNewPassword: "Passwords must match" });

      // Display popup
      dispatch(
        updatePopup({
          isError: true,
          isPopupActive: true,
          message: "💥 Please fix the errors above",
        })
      );

      return;
    }

    // Update password
    setPasswordErrors({});
    updatePassword(userInstance!, newPassword)
      .then(() => {
        // Display popup
        dispatch(
          updatePopup({
            isError: false,
            isPopupActive: true,
            message: "✅ Password has been updated",
          })
        );
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) =>
        dispatch(
          updatePopup({
            isError: true,
            isPopupActive: true,
            message: "💥 Something went wrong, please try again",
          })
        )
      );
  };

  const handleSaveUpdatedName = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Validate the name is not empty
    if (newName.trim().length === 0) {
      return;
    }

    // Update the record
    update(ref(db), {
      [`users/${user?.userID}/`]: {
        fullName: newName,
        hasCompletedGuide,
      },
    });

    setNewName("");
    setIsNameBeingUpdated(false);
  };

  const handleVerifyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendEmailVerification(userInstance!);
  };

  const handleDeleteAccount = (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This will permanently remove it from the system."
    );

    if (!confirmation) return;

    // Delete records
    update(ref(db), {
      [`entries/${user?.userID}/`]: null,
    });

    // Delete user instance
    update(ref(db), {
      [`users/${user?.userID}/`]: null,
    });

    // Delete account
    deleteUser(authUser!).catch((err) =>
      dispatch(
        updatePopup({
          isError: true,
          isPopupActive: true,
          message: err.message,
        })
      )
    );
  };

  useEffect(() => {
    const starCountRef = ref(db, `/users/${user?.userID}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        dispatch(updateFullName(data.fullName));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <UserInformationContainer>
        <span>
          <Icon
            icon="mdi:user-circle"
            width="100"
            color={colors.primaryColor}
          />
        </span>
        {isNameBeingUpdated ? (
          <NameInputContainer>
            <NameInput
              type="text"
              name="name"
              id="name"
              value={newName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewName(e.currentTarget.value);
              }}
              data-cy="editNameInput"
            />
            <SaveNameButton
              data-cy="saveNameButton"
              onClick={handleSaveUpdatedName}
            >
              Save
            </SaveNameButton>
            <CancelNameButton
              onClick={() => {
                setIsNameBeingUpdated(false);
                setNewName("");
              }}
            >
              Cancel
            </CancelNameButton>
          </NameInputContainer>
        ) : (
          <NameContainer data-cy="userName">
            {fullName ? <p>{fullName}</p> : <p>Unknown</p>}
            <EditNameButton
              onClick={() => {
                setIsNameBeingUpdated(true);
              }}
              data-cy="editNameButton"
            >
              <Icon
                icon="ic:baseline-edit"
                width="19"
                color={colors.primaryColor}
              />
            </EditNameButton>
          </NameContainer>
        )}
      </UserInformationContainer>
      <EmailSectionContainer>
        <p className="label">Email:</p>

        <VerificationContainer>
          <EmailText
            data-cy="emailText"
            isVerified={user ? user.emailVerified : false}
          >
            {user?.email}
          </EmailText>
          <VerificationMessageContainer>
            {user?.emailVerified ? (
              <>
                <Icon
                  icon="ion:checkmark-done-circle-outline"
                  width="20"
                  color="#00AF46"
                />
                <IsVerifiedText
                  data-cy="isVerifiedText"
                  isVerified={user ? user.emailVerified : false}
                >
                  Verified
                </IsVerifiedText>
              </>
            ) : (
              <>
                <Icon
                  icon="material-symbols:warning-outline-rounded"
                  width="20"
                  color={colors.dangerColor}
                />
                <IsVerifiedText
                  data-cy="isVerifiedText"
                  isVerified={user ? user.emailVerified : false}
                >
                  Not Verified
                </IsVerifiedText>
              </>
            )}
          </VerificationMessageContainer>
        </VerificationContainer>
        {!user?.emailVerified && (
          <button onClick={handleVerifyEmail}>Verify</button>
        )}
      </EmailSectionContainer>
      <UpdatePasswordSectionContainer>
        <Heading3>Update Password</Heading3>
        <br />
        <UpdatePasswordForm onSubmit={handleSubmitUpdatePassword}>
          <InputContainer>
            <Label htmlFor="newPassword">New password:</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewPassword(e.currentTarget.value);
              }}
              value={newPassword}
              type="password"
              name="newPassword"
              id="newPassword"
              isError={passwordErrors.newPassword}
            />
            {passwordErrors.newPassword && (
              <ErrorMessage data-cy="newPasswordError">
                {passwordErrors.newPassword}
              </ErrorMessage>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor="confirmNewPassword">Confirm new password:</Label>
            <Input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setConfirmPassword(e.currentTarget.value);
              }}
              value={confirmPassword}
              type="password"
              name="confirmNewPassword"
              id="confirmNewPassword"
              isError={passwordErrors.confirmNewPassword}
            />
            {passwordErrors.confirmNewPassword && (
              <ErrorMessage data-cy="confirmNewPasswordError">
                {passwordErrors.confirmNewPassword}
              </ErrorMessage>
            )}
          </InputContainer>
          <PrimaryButton>Update</PrimaryButton>
        </UpdatePasswordForm>
      </UpdatePasswordSectionContainer>

      <DangerZoneContainer>
        <Heading3>Danger Zone</Heading3>
        <DeleteAccountButton
          data-cy="deleteButton"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </DeleteAccountButton>
      </DangerZoneContainer>
    </>
  );
};

export default ProfilePage;
