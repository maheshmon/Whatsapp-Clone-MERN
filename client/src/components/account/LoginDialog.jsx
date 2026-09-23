import { useContext } from "react";

import { Dialog, Box, Typography, List, ListItem, styled, Button } from "@mui/material";

import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../service/api";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Component = styled(Box)`
  display: flex;
`;

const QRCode = styled("img")({
  height: "264px",
  width: "264px",
  margin: "56px 0 0 147px",
});

const Title = styled(Typography)`
  font-size: 26px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const Container = styled(Box)`
  padding: 56px 0px 56px 56px;
`;

const dialogstyle = {
  height: "96%",
  marginTop: "12%",
  //   width: '60%',
  width: "1000px",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);

  const decodeToken = (token) => {
    try {
      if (typeof jwt_decode === "function") return jwt_decode(token);
      if (jwt_decode && typeof jwt_decode.default === "function") return jwt_decode.default(token);
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return JSON.parse(atob(token.split(".")[1]));
    }
  };

  const onLoginSuccess = async (res) => {
    let decoded;
    try {
      if (res?.credential) {
        decoded = decodeToken(res.credential);
      } else {
        decoded = res;
      }
      setAccount(decoded);
      await addUser(decoded);
    } catch (err) {
      console.error("Error decoding login token:", err);
    }
  };

  const onLoginError = (err) => {
    console.log(err);
  };
  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>Use WhatsApp on your computer</Title>
          <StyledList>
            <ListItem>1. Open WhatsApp on your phone</ListItem>
            <ListItem>
              2. Tap Menu or Settings and select Linked Devices
            </ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the QR code
            </ListItem>
          </StyledList>
        </Container>

        <Box style={{ position: "relative" }}>
          <QRCode src={qrCodeImage} alt="QR Code" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              width: "40%",
              transform: "translateX(108%) translateY(-25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />

            <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#00a884",
                  "&:hover": { backgroundColor: "#008f6f" },
                  textTransform: "none",
                }}
                onClick={() =>
                  onLoginSuccess({
                    sub: "demo-user-1",
                    name: "Demo User (Alice)",
                    email: "alice@example.com",
                    picture:
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                  })
                }
              >
                Sign in as Alice (User 1)
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#00a884",
                  borderColor: "#00a884",
                  "&:hover": { borderColor: "#008f6f" },
                  textTransform: "none",
                }}
                onClick={() =>
                  onLoginSuccess({
                    sub: "demo-user-2",
                    name: "Demo User (Bob)",
                    email: "bob@example.com",
                    picture:
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                  })
                }
              >
                Sign in as Bob (User 2)
              </Button>
            </Box>
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
