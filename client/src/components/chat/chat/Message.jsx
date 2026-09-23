import { useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import GetAppIcon from "@mui/icons-material/GetApp";
import DoneAllIcon from "@mui/icons-material/DoneAll";

import { formatDate, downloadMedia } from "../../../utils/common-utils";
import { AccountContext } from "../../../context/AccountProvider";
import { iconPDF } from "../../../constants/data";

const Own = styled(Box)`
  background: #fce4ec;
  border: 1px solid #f8bbd0;
  max-width: 65%;
  margin-left: auto;
  padding: 6px 9px 6px 12px;
  width: fit-content;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  border-radius: 10px 10px 2px 10px;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(233, 30, 99, 0.08);
  margin-bottom: 5px;
`;

const Wrapper = styled(Box)`
  background: #ffffff;
  border: 1px solid #fce4ec;
  max-width: 65%;
  padding: 6px 9px 6px 12px;
  width: fit-content;
  display: flex;
  align-items: flex-end;
  gap: 8px;
  border-radius: 10px 10px 10px 2px;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(233, 30, 99, 0.06);
  margin-bottom: 5px;
`;

const Text = styled(Typography)`
  font-size: 14.2px;
  color: #3b1d28;
  line-height: 1.4;
`;

const Time = styled(Typography)`
  font-size: 11px;
  color: #ad1457;
  word-break: keep-all;
  white-space: nowrap;
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 3px;
`;

export const Message = ({ message }) => {
  const { account } = useContext(AccountContext);
  const isOwn = account?.sub === message.senderId;

  return (
    <>
      {isOwn ? (
        <Own>
          {message.type === "file" ? (
            <ImageMessage message={message} isOwn={true} />
          ) : (
            <TextMessage message={message} isOwn={true} />
          )}
        </Own>
      ) : (
        <Wrapper>
          {message.type === "file" ? (
            <ImageMessage message={message} isOwn={false} />
          ) : (
            <TextMessage message={message} isOwn={false} />
          )}
        </Wrapper>
      )}
    </>
  );
};

const ImageMessage = ({ message, isOwn }) => {
  return (
    <Box style={{ position: "relative" }}>
      {message?.text?.includes(".pdf") ? (
        <Box style={{ display: "flex", alignItems: "center", gap: 10, padding: 8 }}>
          <img src={iconPDF} alt="pdf" style={{ width: 48 }} />
          <Typography style={{ fontSize: 13, color: "#3b1d28" }}>
            {message.text.split("/").pop()}
          </Typography>
        </Box>
      ) : (
        <img
          style={{ width: "100%", maxHeight: 320, objectFit: "cover", borderRadius: 8 }}
          src={message.text}
          alt={message.text}
        />
      )}
      <Time
        style={{
          position: "absolute",
          bottom: 6,
          right: 8,
          background: "rgba(74, 21, 37, 0.65)",
          color: "#fff",
          padding: "2px 6px",
          borderRadius: 4,
        }}
      >
        <GetAppIcon
          onClick={(e) => downloadMedia(e, message.text)}
          style={{ cursor: "pointer", marginRight: 4 }}
          fontSize="small"
        />
        {formatDate(message.createdAt)}
        {isOwn && <DoneAllIcon sx={{ fontSize: 15, color: "#ff80ab" }} />}
      </Time>
    </Box>
  );
};

const TextMessage = ({ message, isOwn }) => {
  return (
    <>
      <Text>{message.text}</Text>
      <Time>
        {formatDate(message.createdAt)}
        {isOwn && <DoneAllIcon sx={{ fontSize: 16, color: "#e91e63" }} />}
      </Time>
    </>
  );
};

export default Message;