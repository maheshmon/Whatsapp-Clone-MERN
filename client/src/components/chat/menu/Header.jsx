import { useContext, useState } from "react";
import { Box, styled, Typography, Tooltip, IconButton } from "@mui/material";
import { Chat as MessageIcon, Logout as LogoutIcon } from "@mui/icons-material";

import { AccountContext } from "../../../context/AccountProvider";
import { defaultProfilePicture } from "../../../constants/data";

// components
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../drawer/InfoDrawer";

const Component = styled(Box)`
  height: 52px;
  background: #fce4ec;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f8bbd0;
`;

const UserInfo = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: background 0.2s ease;
  &:hover {
    background-color: rgba(233, 30, 99, 0.08);
  }
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  borderRadius: "50%",
  objectFit: "cover",
  border: "2px solid #f48fb1",
  boxShadow: "0 2px 6px rgba(233, 30, 99, 0.15)",
});

const IconsWrapper = styled(Box)`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { account, logout } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Component>
        <Tooltip title="View Profile" arrow>
          <UserInfo onClick={toggleDrawer}>
            <Image src={account?.picture || defaultProfilePicture} alt="dp" />
            <Box>
              <Typography
                sx={{
                  fontSize: 14.5,
                  fontWeight: 600,
                  color: "#4a1525",
                  lineHeight: 1.2,
                  maxWidth: 140,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {account?.name || "My Profile"}
              </Typography>
            </Box>
          </UserInfo>
        </Tooltip>

        <IconsWrapper>
          <Tooltip title="New Chat" arrow>
            <IconButton size="small" sx={{ color: "#ad1457", "&:hover": { backgroundColor: "#f8bbd0" } }}>
              <MessageIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <HeaderMenu setOpenDrawer={setOpenDrawer} />

          <Tooltip title="Log Out" arrow>
            <IconButton
              size="small"
              onClick={logout}
              sx={{
                color: "#e91e63",
                transition: "background 0.2s",
                "&:hover": { backgroundColor: "#fde8e8" },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </IconsWrapper>
      </Component>

      <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};

export default Header;
