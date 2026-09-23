import { useContext, useEffect, useState } from "react";
import { Box, Typography, styled, Badge } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { setConversation, getConversation } from "../../../service/api";
import { formatDate } from "../../../utils/common-utils";
import { defaultProfilePicture } from "../../../constants/data";

const Component = styled(Box)(({ isactive }) => ({
  display: "flex",
  height: "56px",
  padding: "10px 14px",
  cursor: "pointer",
  alignItems: "center",
  backgroundColor: isactive === "true" ? "#fce4ec" : "transparent",
  borderLeft: isactive === "true" ? "4px solid #e91e63" : "4px solid transparent",
  transition: "all 0.15s ease",
  "&:hover": {
    backgroundColor: isactive === "true" ? "#fce4ec" : "#fff5f8",
  },
}));

const Image = styled("img")({
  width: 44,
  height: 44,
  borderRadius: "50%",
  objectFit: "cover",
  border: "1.5px solid #f8bbd0",
});

const Container = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Timestamp = styled(Typography)`
  font-size: 11px;
  color: #ad1457;
  font-weight: 500;
`;

const Text = styled(Typography)`
  font-size: 13px;
  color: #753447;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 240px;
`;

const OnlineBadge = styled(Badge)(({ isonline }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: isonline === "true" ? "#25d366" : "transparent",
    color: "#25d366",
    boxShadow: isonline === "true" ? "0 0 0 2px #fff" : "none",
    width: 10,
    height: 10,
    borderRadius: "50%",
    bottom: 5,
    right: 5,
  },
}));

const Conversation = ({ user }) => {
  const { setPerson, person, account, newMessageFlag, activeUsers } = useContext(AccountContext);
  const [message, setMessage] = useState({});

  const isOnline = activeUsers?.some((u) => u.sub === user.sub);
  const isSelected = person?.sub === user.sub;

  useEffect(() => {
    const getConversationDetails = async () => {
      if (account?.sub && user?.sub) {
        const data = await getConversation({ senderId: account.sub, receiverId: user.sub });
        setMessage({ text: data?.message, timestamp: data?.updatedAt });
      }
    };
    getConversationDetails();
  }, [newMessageFlag, account, user]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };

  return (
    <Component isactive={isSelected ? "true" : "false"} onClick={getUser}>
      {/* Avatar with Online Status */}
      <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
        <OnlineBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
          isonline={isOnline ? "true" : "false"}
        >
          <Image src={user.picture || defaultProfilePicture} alt={user.name} />
        </OnlineBadge>
      </Box>

      {/* Right part: Name, Timestamp, Last Message */}
      <Box style={{ width: "100%", overflow: "hidden" }}>
        <Container>
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#4a1525" }}>
            {user.name}
          </Typography>
          {message?.text && (
            <Timestamp>{formatDate(message?.timestamp)}</Timestamp>
          )}
        </Container>
        <Box sx={{ mt: 0.3 }}>
          <Text>
            {message?.text
              ? message.text.includes("localhost")
                ? "📷 Media"
                : message.text
              : "Click to start chatting"}
          </Text>
        </Box>
      </Box>
    </Component>
  );
};

export default Conversation;
