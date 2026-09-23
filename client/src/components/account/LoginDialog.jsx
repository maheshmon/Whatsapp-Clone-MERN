import { useContext, useState } from "react";
import {
  Dialog,
  Box,
  Typography,
  List,
  ListItem,
  styled,
  Button,
  TextField,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
} from "@mui/material";

import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser, registerUser, loginUser } from "../../service/api";

import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Component = styled(Box)`
  display: flex;
  height: 100%;
  min-height: 520px;
`;

const QRCode = styled("img")({
  height: "240px",
  width: "240px",
  margin: "40px 0 0 100px",
});

const Title = styled(Typography)`
  font-size: 24px;
  color: #3b4a54;
  font-weight: 500;
  margin-bottom: 20px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 12px;
    font-size: 16px;
    line-height: 26px;
    color: #4a4a4a;
  }
`;

const LeftContainer = styled(Box)`
  flex: 1.2;
  padding: 40px;
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled(Box)`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  border-left: 1px solid #f0f2f5;
`;

const dialogstyle = {
  height: "90%",
  marginTop: "5%",
  width: "950px",
  maxWidth: "95%",
  maxHeight: "650px",
  borderRadius: "8px",
  boxShadow: "0 17px 50px 0 rgba(11,20,26,.19), 0 12px 15px 0 rgba(11,20,26,.24)",
  overflow: "hidden",
};

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);
  const [activeTab, setActiveTab] = useState(0); // 0: Sign In, 1: Sign Up, 2: QR & Google

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Sign up form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [regPicture, setRegPicture] = useState("");
  const [regError, setRegError] = useState("");
  const [regLoading, setRegLoading] = useState(false);

  const decodeToken = (token) => {
    try {
      if (typeof jwt_decode === "function") return jwt_decode(token);
      if (jwt_decode && typeof jwt_decode.default === "function")
        return jwt_decode.default(token);
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return JSON.parse(atob(token.split(".")[1]));
    }
  };

  const onGoogleSuccess = async (res) => {
    try {
      const decoded = decodeToken(res.credential);
      setAccount(decoded);
      await addUser(decoded);
    } catch (err) {
      console.error("Error with Google login:", err);
    }
  };

  const onDemoLogin = async (user) => {
    setAccount(user);
    await addUser(user);
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please enter both email and password.");
      return;
    }

    try {
      setLoginLoading(true);
      const user = await loginUser({ email: loginEmail, password: loginPassword });
      setAccount(user);
    } catch (err) {
      setLoginError(err.message || "Failed to sign in. Please verify your credentials.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleManualRegister = async (e) => {
    e.preventDefault();
    setRegError("");

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setRegError("Please fill in all required fields (Name, Email, Password).");
      return;
    }

    if (regPassword.length < 6) {
      setRegError("Password must be at least 6 characters.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError("Passwords do not match.");
      return;
    }

    try {
      setRegLoading(true);
      const user = await registerUser({
        name: regName.trim(),
        email: regEmail.trim(),
        password: regPassword,
        picture: regPicture.trim() || undefined,
      });
      setAccount(user);
    } catch (err) {
      setRegError(err.message || "Registration failed. Please try a different email.");
    } finally {
      setRegLoading(false);
    }
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogstyle }} hideBackdrop={true}>
      <Component>
        {/* Left Side: Auth Forms & Instructions */}
        <LeftContainer>
          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              textColor="primary"
              indicatorColor="primary"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: 15,
                },
                "& .Mui-selected": {
                  color: "#00a884",
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#00a884",
                },
              }}
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
              <Tab label="QR Code / Google" />
            </Tabs>
          </Box>

          {/* TAB 0: SIGN IN */}
          {activeTab === 0 && (
            <Box component="form" onSubmit={handleManualLogin} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Title>Sign In to WhatsApp</Title>

              {loginError && <Alert severity="error">{loginError}</Alert>}

              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loginLoading}
                sx={{
                  backgroundColor: "#00a884",
                  "&:hover": { backgroundColor: "#008f6f" },
                  textTransform: "none",
                  py: 1,
                  fontSize: 15,
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                {loginLoading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>

              <Typography variant="body2" sx={{ color: "#667781", textAlign: "center", mt: 1 }}>
                Don't have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => setActiveTab(1)}
                  sx={{ color: "#00a884", textTransform: "none", p: 0, fontWeight: 600 }}
                >
                  Create an account
                </Button>
              </Typography>
            </Box>
          )}

          {/* TAB 1: SIGN UP */}
          {activeTab === 1 && (
            <Box component="form" onSubmit={handleManualRegister} sx={{ display: "flex", flexDirection: "column", gap: 1.8 }}>
              <Title>Create an Account</Title>

              {regError && <Alert severity="error">{regError}</Alert>}

              <TextField
                label="Full Name"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />

              <TextField
                label="Email Address"
                type="email"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />

              <TextField
                label="Password (min 6 characters)"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />

              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                size="small"
                required
                value={regConfirmPassword}
                onChange={(e) => setRegConfirmPassword(e.target.value)}
              />

              <TextField
                label="Profile Picture URL (Optional)"
                variant="outlined"
                fullWidth
                size="small"
                placeholder="https://example.com/avatar.png"
                value={regPicture}
                onChange={(e) => setRegPicture(e.target.value)}
              />

              <Button
                type="submit"
                variant="contained"
                disabled={regLoading}
                sx={{
                  backgroundColor: "#00a884",
                  "&:hover": { backgroundColor: "#008f6f" },
                  textTransform: "none",
                  py: 1,
                  fontSize: 15,
                  fontWeight: 600,
                  mt: 1,
                }}
              >
                {regLoading ? <CircularProgress size={24} color="inherit" /> : "Sign Up & Enter Chat"}
              </Button>

              <Typography variant="body2" sx={{ color: "#667781", textAlign: "center", mt: 0.5 }}>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => setActiveTab(0)}
                  sx={{ color: "#00a884", textTransform: "none", p: 0, fontWeight: 600 }}
                >
                  Sign In
                </Button>
              </Typography>
            </Box>
          )}

          {/* TAB 2: QR & GOOGLE */}
          {activeTab === 2 && (
            <Box>
              <Title>Use WhatsApp on your computer</Title>
              <StyledList>
                <ListItem>1. Open WhatsApp on your phone</ListItem>
                <ListItem>2. Tap Menu or Settings and select Linked Devices</ListItem>
                <ListItem>3. Point your phone to this screen to capture the QR code</ListItem>
              </StyledList>
            </Box>
          )}
        </LeftContainer>

        {/* Right Side: QR Code, Google Login & Demo Quick Logins */}
        <RightContainer>
          <Box sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              src={qrCodeImage}
              alt="QR Code"
              style={{ width: "220px", height: "220px", borderRadius: "8px", border: "1px solid #e9edef" }}
            />

            <Box sx={{ mt: 2.5, width: "100%", maxWidth: "240px", display: "flex", flexDirection: "column", gap: 1 }}>
              <GoogleLogin onSuccess={onGoogleSuccess} onError={(err) => console.log(err)} />

              <Typography variant="caption" sx={{ color: "#8696a0", mt: 1, mb: 0.5 }}>
                ── Or Quick Test Accounts ──
              </Typography>

              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#00a884",
                  borderColor: "#00a884",
                  "&:hover": { borderColor: "#008f6f", backgroundColor: "#f0fbf8" },
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={() =>
                  onDemoLogin({
                    sub: "demo-user-1",
                    name: "Alice (Demo)",
                    email: "alice@example.com",
                    picture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
                  })
                }
              >
                Sign in as Alice
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  color: "#00a884",
                  borderColor: "#00a884",
                  "&:hover": { borderColor: "#008f6f", backgroundColor: "#f0fbf8" },
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={() =>
                  onDemoLogin({
                    sub: "demo-user-2",
                    name: "Bob (Demo)",
                    email: "bob@example.com",
                    picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
                  })
                }
              >
                Sign in as Bob
              </Button>
            </Box>
          </Box>
        </RightContainer>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
