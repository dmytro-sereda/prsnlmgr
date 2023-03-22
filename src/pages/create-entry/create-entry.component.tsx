import React from "react";
import ClaimForm from "../../components/claim-form/claim-form.component";
import { Heading3, PageContainer, RequiredText } from "../../global";

const CreateEntryPage: React.FC = () => {
  return (
    <PageContainer>
      <Heading3>Please fill the form below</Heading3>
      <RequiredText>* Required information</RequiredText>

      <ClaimForm />
    </PageContainer>
  );
};

export default CreateEntryPage;
