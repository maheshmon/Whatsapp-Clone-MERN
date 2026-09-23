import { emptyChatImage } from "../../../constants/data";
import { Box, Typography, styled } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Component = styled(Box)`
  background: #fff0f5;
  padding: 40px 20px;
  text-align: center;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-bottom: 6px solid #e91e63;
`;

const Image = styled("img")({
  width: 300,
  maxWidth: "90%",
  objectFit: "contain",
  marginBottom: 24,
  opacity: 0.95,
  filter: "drop-shadow(0 6px 12px rgba(233, 30, 99, 0.15))",
});

const Title = styled(Typography)`
  font-size: 30px;
  font-weight: 400;
  color: #4a1525;
  margin-bottom: 12px;
`;

const SubTitle = styled(Typography)`
  font-size: 14px;
  color: #753447;
  line-height: 22px;
  max-width: 480px;
`;

const EncryptionNote = styled(Box)`
  margin-top: 36px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #ad1457;
  font-size: 13px;
  font-weight: 500;
`;

const EmptyChat = () => {
  return (
    <Component>
      <Image src={emptyChatImage} alt="WhatsApp Web" />
      <Title>WhatsApp Web</Title>
      <SubTitle>
        Send and receive messages in real time without keeping your phone online.
        Select a contact on the left to start a conversation.
      </SubTitle>

      <EncryptionNote>
        <LockIcon sx={{ fontSize: 14, color: "#e91e63" }} />
        <span>End-to-end encrypted</span>
      </EncryptionNote>
    </Component>
  );
};

export default EmptyChat;
