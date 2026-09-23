import { useContext, useState } from "react";
import {
  Box,
  Typography,
  styled,
  Badge,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search,
  MoreVert,
  Phone,
  VideoCall,
  DeleteOutline as DeleteIcon,
  Close as CloseIcon,
  DeleteSweep as DeleteSweepIcon,
} from "@mui/icons-material";

import { defaultProfilePicture } from "../../../constants/data";
import { AccountContext } from "../../../context/AccountProvider";
import { clearMessages, clearAllChats } from "../../../service/api";

const Header = styled(Box)`
  height: 52px;
  background: #fce4ec;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f8bbd0;
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  objectFit: "cover",
  borderRadius: "50%",
  border: "2px solid #f48fb1",
});

const Name = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  color: #4a1525;
  line-height: 1.2;
`;

const Status = styled(Typography)(({ isonline }) => ({
  fontSize: "12px",
  color: isonline === "true" ? "#e91e63" : "#ad1457",
  fontWeight: isonline === "true" ? 600 : 400,
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

const RightContainer = styled(Box)`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OnlineBadge = styled(Badge)(({ isonline }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: isonline === "true" ? "#25d366" : "transparent",
    color: "#25d366",
    boxShadow: isonline === "true" ? "0 0 0 2px #fff" : "none",
    width: 10,
    height: 10,
    borderRadius: "50%",
    bottom: 4,
    right: 4,
  },
}));

const ChatHeader = ({ person, conversation }) => {
  const { activeUsers, setPerson, setnewMessageFlag } = useContext(AccountContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const isOnline = activeUsers?.some((user) => user.sub === person.sub);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClearCurrentChat = async () => {
    handleCloseMenu();
    if (conversation?._id) {
      const confirm = window.confirm(`Are you sure you want to clear all messages with ${person.name}?`);
      if (confirm) {
        await clearMessages(conversation._id);
        setnewMessageFlag((prev) => !prev);
      }
    }
  };

  const handleClearAllChats = async () => {
    handleCloseMenu();
    const confirm = window.confirm("Are you sure you want to delete ALL messages across all chats? This cannot be undone.");
    if (confirm) {
      await clearAllChats();
      setnewMessageFlag((prev) => !prev);
    }
  };

  const handleCloseChat = () => {
    handleCloseMenu();
    setPerson({});
  };

  return (
    <Header>
      <Box sx={{ mr: 1.8, display: "flex", alignItems: "center" }}>
        <OnlineBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          isonline={isOnline ? "true" : "false"}
        >
          <Image src={person.picture || defaultProfilePicture} alt={person.name} />
        </OnlineBadge>
      </Box>

      <Box>
        <Name>{person.name}</Name>
        <Status isonline={isOnline ? "true" : "false"}>
          {isOnline ? "● Online" : "offline"}
        </Status>
      </Box>

      <RightContainer>
        <Tooltip title="Voice Call" arrow>
          <IconButton size="small" sx={{ color: "#ad1457", "&:hover": { backgroundColor: "#f8bbd0" } }}>
            <Phone fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Video Call" arrow>
          <IconButton size="small" sx={{ color: "#ad1457", "&:hover": { backgroundColor: "#f8bbd0" } }}>
            <VideoCall fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search in chat" arrow>
          <IconButton size="small" sx={{ color: "#ad1457", "&:hover": { backgroundColor: "#f8bbd0" } }}>
            <Search fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="More options" arrow>
          <IconButton
            size="small"
            onClick={handleOpenMenu}
            sx={{ color: "#ad1457", "&:hover": { backgroundColor: "#f8bbd0" } }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Dropdown Menu for Chat actions */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            elevation: 4,
            sx: {
              minWidth: 190,
              borderRadius: "10px",
              border: "1px solid #f8bbd0",
              boxShadow: "0 6px 20px rgba(233, 30, 99, 0.15)",
              py: 0.5,
            },
          }}
        >
          <MenuItem onClick={handleCloseChat} sx={{ fontSize: 14, color: "#4a1525", py: 1 }}>
            <ListItemIcon sx={{ minWidth: 32, color: "#ad1457" }}>
              <CloseIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Close Chat" primaryTypographyProps={{ fontSize: 14 }} />
          </MenuItem>

          <MenuItem onClick={handleClearCurrentChat} sx={{ fontSize: 14, color: "#e91e63", py: 1 }}>
            <ListItemIcon sx={{ minWidth: 32, color: "#e91e63" }}>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Clear Messages" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
          </MenuItem>

          <Divider sx={{ my: 0.5, borderColor: "#fce4ec" }} />

          <MenuItem onClick={handleClearAllChats} sx={{ fontSize: 14, color: "#d81b60", py: 1 }}>
            <ListItemIcon sx={{ minWidth: 32, color: "#d81b60" }}>
              <DeleteSweepIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Clear All Chats" primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }} />
          </MenuItem>
        </Menu>
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
