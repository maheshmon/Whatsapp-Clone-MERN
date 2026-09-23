import { useContext } from "react";
import { AppBar, Toolbar, styled, Box, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import { AccountContext } from "../context/AccountProvider";

// components
import LoginDialog from "./account/LoginDialog";
import ChatDialog from "./chat/ChatDialog";

const Component = styled(Box)`
  height: 100vh;
  background-color: #fdf2f4;
  overflow: hidden;
  position: relative;
`;

const Header = styled(AppBar)`
  height: 128px;
  background: linear-gradient(135deg, #f48fb1 0%, #ec407a 50%, #e91e63 100%);
  box-shadow: 0 4px 16px rgba(233, 30, 99, 0.2);
  display: flex;
  justify-content: flex-start;
  padding: 12px 24px;
`;

const LoginHeader = styled(AppBar)`
  height: 220px;
  background: linear-gradient(135deg, #f48fb1 0%, #ec407a 50%, #e91e63 100%);
  box-shadow: 0 4px 20px rgba(233, 30, 99, 0.25);
  display: flex;
  justify-content: flex-start;
  padding: 20px 48px;
`;

const Brand = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
`;

const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    <Component>
      {account ? (
        <>
          <Header>
            <Toolbar disableGutters>
              <Brand>
                <WhatsAppIcon sx={{ fontSize: 32 }} />
                <Typography sx={{ fontSize: 16, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                  WhatsApp Web
                </Typography>
              </Brand>
            </Toolbar>
          </Header>
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>
            <Toolbar disableGutters>
              <Brand>
                <WhatsAppIcon sx={{ fontSize: 36 }} />
                <Typography sx={{ fontSize: 18, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>
                  WhatsApp Web
                </Typography>
              </Brand>
            </Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;
