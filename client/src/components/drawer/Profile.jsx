import { useContext } from "react";
import { Box, styled, Typography, Button } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";

import { AccountContext } from "../../context/AccountProvider";
import { defaultProfilePicture } from "../../constants/data";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
  padding: 24px 0 16px;
  background-color: #fff0f5;
`;

const Image = styled("img")({
  width: 170,
  height: 170,
  borderRadius: "50%",
  objectFit: "cover",
  boxShadow: "0 6px 18px rgba(233, 30, 99, 0.18)",
  border: "3px solid #f48fb1",
});

const BoxWrapper = styled(Box)`
  background: #ffffff;
  padding: 14px 28px;
  box-shadow: 0 1px 3px rgba(233, 30, 99, 0.06);
  border-bottom: 1px solid #fce4ec;
  & > :first-of-type {
    font-size: 13px;
    color: #ad1457;
    font-weight: 600;
    margin-bottom: 6px;
  }
  & > :last-child {
    color: #4a1525;
    font-size: 15px;
  }
`;

const DescriptionContainer = styled(Box)`
  padding: 14px 28px 24px;
  & > p {
    font-size: 13px;
    color: #880e4f;
    opacity: 0.75;
    line-height: 18px;
  }
`;

const Profile = () => {
  const { account, logout } = useContext(AccountContext);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "#fff0f5" }}>
      <ImageContainer>
        <Image src={account?.picture || defaultProfilePicture} alt="dp" />
      </ImageContainer>

      <BoxWrapper>
        <Typography>Your name</Typography>
        <Typography sx={{ fontWeight: 600 }}>{account?.name || "WhatsApp User"}</Typography>
      </BoxWrapper>

      <DescriptionContainer>
        <Typography>
          This is not your username or pin. This name will be visible to your WhatsApp contacts.
        </Typography>
      </DescriptionContainer>

      {account?.email && (
        <BoxWrapper sx={{ mb: 2 }}>
          <Typography>Email</Typography>
          <Typography sx={{ fontSize: 14 }}>{account.email}</Typography>
        </BoxWrapper>
      )}

      <BoxWrapper>
        <Typography>About</Typography>
        <Typography>Available</Typography>
      </BoxWrapper>

      <Box sx={{ mt: "auto", p: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            py: 1,
            fontWeight: 600,
            borderColor: "#e91e63",
            color: "#e91e63",
            "&:hover": {
              backgroundColor: "#fce4ec",
              borderColor: "#d81b60",
            },
          }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
