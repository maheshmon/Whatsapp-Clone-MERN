import { useState, useContext } from "react";
import { MoreVert, Logout as LogoutIcon, Person as PersonIcon } from "@mui/icons-material";
import { Menu, MenuItem, ListItemIcon, ListItemText, styled, Divider } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 10px 20px;
  color: #4a1525;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #fce4ec;
  }
`;

const LogoutOption = styled(MenuOption)`
  color: #e91e63;
  &:hover {
    background-color: #ffebee;
  }
`;

const HeaderMenu = ({ setOpenDrawer }) => {
  const [open, setOpen] = useState(null);
  const { logout } = useContext(AccountContext);

  const handleClose = () => {
    setOpen(null);
  };

  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };

  const handleLogout = () => {
    handleClose();
    if (logout) {
      logout();
    }
  };

  return (
    <>
      <MoreVert
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          color: "#ad1457",
          borderRadius: "50%",
          padding: "6px",
          transition: "background 0.2s",
          "&:hover": { backgroundColor: "#f8bbd0" },
        }}
      />
      <Menu
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 4,
          sx: {
            minWidth: 170,
            borderRadius: "10px",
            border: "1px solid #f8bbd0",
            boxShadow: "0 6px 20px rgba(233, 30, 99, 0.15)",
            py: 0.5,
          },
        }}
      >
        <MenuOption
          onClick={() => {
            handleClose();
            setOpenDrawer(true);
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: "#ad1457" }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
        </MenuOption>

        <Divider sx={{ my: 0.5, borderColor: "#fce4ec" }} />

        <LogoutOption onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: 32, color: "#e91e63" }}>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Log out" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
        </LogoutOption>
      </Menu>
    </>
  );
};

export default HeaderMenu;
