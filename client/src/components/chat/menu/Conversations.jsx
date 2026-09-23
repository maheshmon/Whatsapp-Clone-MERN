import React, { useContext, useEffect, useState } from "react";
import { getUsers } from "../../../service/api";
import { AccountContext } from "../../../context/AccountProvider";
import { Box, Divider, styled, Typography } from "@mui/material";

// components
import Conversation from "./Conversation";

const Component = styled(Box)`
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 72px;
  background: #fce4ec;
  opacity: 0.9;
`;

const EmptyNotice = styled(Box)`
  padding: 40px 20px;
  text-align: center;
  color: #ad1457;
`;

const Conversations = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let response = await getUsers();
      const filteredData = (response || []).filter((user) =>
        user.name?.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filteredData);
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    if (account?.sub && socket?.current) {
      socket.current.emit("addUsers", account);
      socket.current.on("getUsers", (activeUserList) => {
        setActiveUsers(activeUserList);
      });
    }
  }, [account, socket, setActiveUsers]);

  const otherUsers = users.filter((u) => u.sub !== account?.sub);

  return (
    <Component>
      {otherUsers.length > 0 ? (
        otherUsers.map((user) => (
          <React.Fragment key={user._id || user.sub}>
            <Conversation user={user} />
            <StyledDivider />
          </React.Fragment>
        ))
      ) : (
        <EmptyNotice>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            {text ? "No matching contacts found" : "No other users registered yet"}
          </Typography>
          <Typography sx={{ fontSize: 12, mt: 0.5, color: "#c2185b" }}>
            Open another window or sign up another account to chat!
          </Typography>
        </EmptyNotice>
      )}
    </Component>
  );
};

export default Conversations;
