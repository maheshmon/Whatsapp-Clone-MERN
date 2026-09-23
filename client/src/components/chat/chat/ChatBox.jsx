import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { getConversation } from "../../../service/api.js";

// components
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";

const ChatBox = () => {
  const { person, account } = useContext(AccountContext);
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      if (account?.sub && person?.sub) {
        let data = await getConversation({ senderId: account.sub, receiverId: person.sub });
        setConversation(data);
      }
    };
    getConversationDetails();
  }, [person.sub, account]);

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <ChatHeader person={person} conversation={conversation} />
      <Messages person={person} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;