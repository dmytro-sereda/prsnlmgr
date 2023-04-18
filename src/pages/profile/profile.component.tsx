import { Icon } from "@iconify/react";
import { onValue, ref, update } from "firebase/database";
import React, { useEffect, useState } from "react";
import { db } from "src/firebase";
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
  selectUserEntity,
} from "src/redux/user/user.selectors";
import { useAppDispatch, useAppSelector } from "src/utils/hooks";
import { colors } from "src/utils/variables";
import {
  CancelNameButton,
  EditNameButton,
  EmailSectionContainer,
  EmailText,
  IsVerifiedText,
  NameContainer,
  NameInput,
  NameInputContainer,
  SaveNameButton,
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

    // Display popup
    dispatch(
      updatePopup({
        isError: false,
        isPopupActive: true,
        message: "✅ Password has been updated",
      })
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
      },
    });

    setIsNameBeingUpdated(false);
  };

  const handleVerifyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("NEEDS TO SEND VERIFICATION EMAIL");
  };

  useEffect(() => {
    const starCountRef = ref(db, `/users/${user?.userID}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data);
        dispatch(updateFullName(data.fullName));
      } else {
        // dispatch(updateEntries([]));
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
            />
            <SaveNameButton onClick={handleSaveUpdatedName}>
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
          <NameContainer>
            {fullName ? <p>{fullName}</p> : <p>Unknown</p>}
            <EditNameButton
              onClick={() => {
                setIsNameBeingUpdated(true);
              }}
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
          <EmailText>{user?.email}</EmailText>
          <VerificationMessageContainer>
            {user?.emailVerified ? (
              <>
                <Icon
                  icon="ion:checkmark-done-circle-outline"
                  width="20"
                  color="#00AF46"
                />
                <IsVerifiedText isVerified={user ? user.emailVerified : false}>
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
                <IsVerifiedText isVerified={user ? user.emailVerified : false}>
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
        <form onSubmit={handleSubmitUpdatePassword}>
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
              <ErrorMessage>{passwordErrors.newPassword}</ErrorMessage>
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
              <ErrorMessage>{passwordErrors.confirmNewPassword}</ErrorMessage>
            )}
          </InputContainer>
          <PrimaryButton>Update</PrimaryButton>
        </form>
      </UpdatePasswordSectionContainer>
    </>
  );
};

export default ProfilePage;
