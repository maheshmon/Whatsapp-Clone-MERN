import { useContext } from "react";
import { Dialog, Box, styled } from "@mui/material";

import { AccountContext } from "../../context/AccountProvider";

// components
import Menu from "./menu/Menu";
import EmptyChat from "./chat/EmptyChat";
import ChatBox from "./chat/ChatBox";

const Component = styled(Box)`
  display: flex;
  height: 100%;
  width: 100%;
`;

const LeftComponent = styled(Box)`
  width: 420px;
  min-width: 350px;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const RightComponent = styled(Box)`
  flex: 1;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid #f8bbd0;
  display: flex;
  flex-direction: column;
  background-color: #fff0f5;
`;

const dialogstyle = {
  height: "calc(100% - 38px)",
  width: "calc(100% - 38px)",
  maxWidth: "1600px",
  maxHeight: "100%",
  margin: "19px auto",
  borderRadius: "14px",
  boxShadow: "0 12px 36px rgba(233, 30, 99, 0.18)",
  border: "1px solid #f8bbd0",
  overflow: "hidden",
};

const ChatDialog = () => {
  const { person } = useContext(AccountContext);

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogstyle }}
      hideBackdrop={true}
      maxWidth={false}
    >
      <Component>
        {/* Left component: Conversations Menu & Search */}
        <LeftComponent>
          <Menu />
        </LeftComponent>

        {/* Right component: Active Chat or Empty Screen */}
        <RightComponent>
          {person && Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </RightComponent>
      </Component>
    </Dialog>
  );
};

export default ChatDialog;
