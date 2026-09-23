import { Drawer, Box, Typography, styled } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

// components
import Profile from "./Profile";

const Header = styled(Box)`
  background: linear-gradient(135deg, #f48fb1 0%, #ec407a 50%, #e91e63 100%);
  height: 107px;
  color: #ffffff;
  display: flex;
  box-shadow: 0 2px 10px rgba(233, 30, 99, 0.2);
  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 600;
  }
`;

const Component = styled(Box)`
  background: #fff0f5;
  height: 85%;
`;

const Text = styled(Typography)`
  font-size: 18px;
`;

const drawerSyle = {
  left: 20,
  top: 17,
  height: "95%",
  width: "30%",
  minWidth: "320px",
  boxShadow: "0 8px 30px rgba(233, 30, 99, 0.2)",
  borderRadius: "10px",
  overflow: "hidden",
};

const InfoDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: drawerSyle }}
      style={{ zIndex: 1500 }}
    >
      {/* upper part  */}
      <Header>
        <ArrowBack sx={{ cursor: "pointer" }} onClick={() => setOpen(false)} />
        <Text>Profile</Text>
      </Header>

      {/* lower part  */}
      <Component>
        <Profile />
      </Component>
    </Drawer>
  );
};

export default InfoDrawer;
