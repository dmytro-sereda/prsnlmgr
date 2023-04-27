import React, { useState } from "react";
import {
  ButtonsContainer,
  GuideContainer,
  NextStepButton,
  PreviousStepButton,
  Slide,
  SlideDescription,
  SliderContainer,
} from "./guide.styles";
import CreateEntryImage from "../../assets/create-entry.png";
import ProfileImage from "../../assets/profile.jpg";
import ViewEntriesImage from "../../assets/view-entries.jpg";
import AnalyticsImage from "../../assets/analytics.png";
import FrontImage from "../../assets/front.png";
import { ref, update } from "firebase/database";
import { db } from "src/firebase";
import { useAppSelector } from "src/utils/hooks";
import {
  selectFullName,
  selectUserEntity,
} from "src/redux/user/user.selectors";

const Guide: React.FC = () => {
  // LOCAL STATE
  const [currentStep, setCurrentStep] = useState(0);

  // GLOBAL STATE
  const user = useAppSelector(selectUserEntity);
  const fullName = useAppSelector(selectFullName);

  const slides = [
    { text: "Welcome to the PrsnlMgr App", imageURL: FrontImage },
    { text: "Create expense entries", imageURL: CreateEntryImage },
    {
      text: "Customize your profile. All in one place!",
      imageURL: ProfileImage,
    },
    {
      text: "Easily manage your entries",
      imageURL: ViewEntriesImage,
    },
    {
      text: "Dynamic charts provide helpful insights on your expenditures!",
      imageURL: AnalyticsImage,
    },
  ];

  const handleCompleteGuide = (e: React.MouseEvent<HTMLButtonElement>) => {
    update(ref(db), {
      [`users/${user?.userID}/`]: {
        hasCompletedGuide: true,
        fullName,
      },
    });
  };

  return (
    <GuideContainer>
      <SliderContainer>
        {slides.map((s, i) => (
          <Slide position={i - currentStep}>
            <SlideDescription>{s.text}</SlideDescription>
            {s.imageURL && <img src={s.imageURL} alt="Test" />}

            <ButtonsContainer>
              {currentStep !== 0 && (
                <PreviousStepButton
                  disabled={i !== currentStep}
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </PreviousStepButton>
              )}
              {currentStep !== slides.length - 1 ? (
                <NextStepButton
                  disabled={i !== currentStep}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </NextStepButton>
              ) : (
                <NextStepButton
                  onClick={handleCompleteGuide}
                  disabled={i !== currentStep}
                >
                  Done
                </NextStepButton>
              )}
            </ButtonsContainer>
          </Slide>
        ))}
      </SliderContainer>
    </GuideContainer>
  );
};

export default Guide;
