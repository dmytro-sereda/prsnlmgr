import { Icon } from "@iconify/react";
import React from "react";
import { colors } from "src/utils/variables";
// import { PageContainer } from "src/global";

const ProfilePage: React.FC = () => {
  return (
    <>
      <div>
        <span>
          <Icon
            icon="mdi:user-circle"
            width="100"
            color={colors.primaryColor}
          />
        </span>
        <div>
          <p>Unknown</p>
          <button>
            <Icon
              icon="ic:baseline-edit"
              width="19"
              color={colors.primaryColor}
            />
          </button>
        </div>
      </div>
      ;
    </>
  );
};

export default ProfilePage;
