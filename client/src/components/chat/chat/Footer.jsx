import { useEffect, useState } from "react";
import { Box, InputBase, styled, IconButton, Tooltip } from "@mui/material";
import {
  EmojiEmotionsOutlined,
  AttachFile,
  Mic,
  Send as SendIcon,
} from "@mui/icons-material";

import { uploadFile } from "../../../service/api";
import EmojiPicker from "./EmojiPicker";

const Container = styled(Box)`
  min-height: 58px;
  background: #fce4ec;
  border-top: 1px solid #f8bbd0;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 6px 16px;
  box-sizing: border-box;
  gap: 8px;
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 8px;
  flex: 1;
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(233, 30, 99, 0.08);
  border: 1px solid #f8bbd0;
  transition: all 0.2s;
  &:focus-within {
    border-color: #e91e63;
    box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.15);
  }
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 8px 16px;
  font-size: 14.5px;
  color: #3b1d28;
  & input::placeholder {
    color: #ad1457;
    opacity: 0.6;
  }
`;

const ClipIcon = styled(AttachFile)`
  transform: rotate(40deg);
  color: #ad1457;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background 0.2s;
  &:hover {
    background-color: rgba(233, 30, 99, 0.1);
  }
`;

const Footer = ({ sendText, setValue, value, file, setFile, setImage }) => {
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let response = await uploadFile(data);
        setImage(response.data);
      }
    };
    getImage();
  }, [file, setImage]);

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setValue(e.target.files[0].name);
    }
  };

  const handleManualSend = () => {
    if (value && value.trim()) {
      sendText({ keyCode: 13, which: 13 });
    }
  };

  const handleOpenEmoji = (event) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  const handleCloseEmoji = () => {
    setEmojiAnchorEl(null);
  };

  const handleSelectEmoji = (emoji) => {
    setValue((prev) => prev + emoji);
  };

  return (
    <Container>
      <Tooltip title="Emojis" arrow>
        <IconButton
          size="small"
          onClick={handleOpenEmoji}
          sx={{
            color: emojiAnchorEl ? "#e91e63" : "#ad1457",
            backgroundColor: emojiAnchorEl ? "#f8bbd0" : "transparent",
            "&:hover": { backgroundColor: "#f8bbd0" },
          }}
        >
          <EmojiEmotionsOutlined />
        </IconButton>
      </Tooltip>

      {/* Connected Emoji Picker Component */}
      <EmojiPicker
        open={Boolean(emojiAnchorEl)}
        anchorEl={emojiAnchorEl}
        onClose={handleCloseEmoji}
        onSelectEmoji={handleSelectEmoji}
      />

      <Tooltip title="Attach document or image" arrow>
        <label htmlFor="fileinput">
          <ClipIcon />
        </label>
      </Tooltip>
      <input
        type="file"
        id="fileinput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />

      <Search>
        <InputField
          placeholder="Type a message"
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => sendText(e)}
          value={value}
        />
      </Search>

      {value && value.trim() ? (
        <Tooltip title="Send message" arrow>
          <IconButton
            size="small"
            onClick={handleManualSend}
            sx={{
              backgroundColor: "#e91e63",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#d81b60" },
              p: 1,
              boxShadow: "0 2px 6px rgba(233, 30, 99, 0.3)",
            }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Voice message" arrow>
          <IconButton size="small" sx={{ color: "#ad1457" }}>
            <Mic />
          </IconButton>
        </Tooltip>
      )}
    </Container>
  );
};

export default Footer;
