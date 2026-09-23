import React, { useState } from "react";
import {
  Popover,
  Box,
  Typography,
  InputBase,
  Tabs,
  Tab,
  IconButton,
  styled,
} from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";

const EMOJI_CATEGORIES = [
  {
    name: "Smileys",
    icon: "😀",
    emojis: [
      "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "🥹", "😊",
      "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙",
      "😚", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫",
      "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬",
      "😮‍💨", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕",
      "🤢", "🤮", "🤧", "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳",
      "🥸", "😎", "🤓", "🧐", "😕", "😟", "🙁", "😮", "😯", "😲",
      "😳", "🥺", "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱",
      "😖", "😣", "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠",
      "🤬", "😈", "👿", "💀", "💩", "🤡", "👻", "👽", "🤖", "🎃"
    ],
  },
  {
    name: "Gestures",
    icon: "👋",
    emojis: [
      "👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞",
      "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️",
      "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲",
      "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿", "🦵", "🦶",
      "👂", "🦻", "👃", "🧠", "🫀", "🫁", "🦷", "👀", "👁️", "👅", "👄", "💋"
    ],
  },
  {
    name: "Hearts",
    icon: "❤️",
    emojis: [
      "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
      "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌",
      "💐", "🌸", "💮", "🪷", "🏵️", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱"
    ],
  },
  {
    name: "Celebration",
    icon: "🎉",
    emojis: [
      "🎉", "🎊", "🎈", "🎂", "🍰", "🧁", "🎁", "🎀", "🪄", "🪅",
      "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "⚽", "🏀", "🏈", "⚾",
      "🎾", "🏐", "🎱", "🎮", "🎲", "🧩", "🎭", "🎨", "🎬", "🎤",
      "🎧", "🎼", "🎹", "🥁", "🎷", "🎺", "🎸", "🪕", "🎻", "✨", "🌟", "⭐"
    ],
  },
  {
    name: "Food",
    icon: "🍕",
    emojis: [
      "🍕", "🍔", "🍟", "🌭", "🍿", "🧈", "🍞", "🥐", "🥨", "🧀",
      "🥗", "🥪", "🌮", "🌯", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱",
      "🥟", "🦪", "🍤", "🍙", "🍚", "🍦", "🍧", "🍨", "🍩", "🍪",
      "🍫", "🍬", "🍭", "🍮", "🍯", "☕", "🍵", "🧃", "🥤", "🧋", "🍷", "🍸"
    ],
  },
  {
    name: "Nature",
    icon: "🐱",
    emojis: [
      "🐱", "🐶", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮",
      "🐷", "🐸", "🐵", "🦄", "🦋", "🐝", "🐞", "🐢", "🐬", "🐳",
      "☀️", "🌤️", "⛅", "🌧️", "🌩️", "❄️", "🌈", "🔥", "💧", "🌊", "⚡"
    ],
  },
];

const EmojiButton = styled("button")({
  background: "transparent",
  border: "none",
  fontSize: "24px",
  cursor: "pointer",
  padding: "6px",
  borderRadius: "8px",
  transition: "all 0.15s ease",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "#fce4ec",
    transform: "scale(1.22)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
});

const SearchWrapper = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #fff0f5;
  border-radius: 8px;
  padding: 4px 10px;
  margin: 8px 12px;
  border: 1px solid #f8bbd0;
  &:focus-within {
    border-color: #e91e63;
    background-color: #ffffff;
    box-shadow: 0 0 0 1.5px #f48fb1;
  }
`;

const EmojiPicker = ({ open, anchorEl, onClose, onSelectEmoji }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm("");
  };

  // Filter emojis based on search term across all categories
  const filteredEmojis = searchTerm.trim()
    ? EMOJI_CATEGORIES.flatMap((c) => c.emojis).filter((emoji, index, self) => self.indexOf(emoji) === index)
    : EMOJI_CATEGORIES[activeTab]?.emojis || [];

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      PaperProps={{
        elevation: 6,
        sx: {
          width: 340,
          maxHeight: 380,
          borderRadius: "14px",
          overflow: "hidden",
          border: "1px solid #f8bbd0",
          boxShadow: "0 10px 30px rgba(233, 30, 99, 0.18)",
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header with Search and Close button */}
      <Box sx={{ p: 1, pb: 0, backgroundColor: "#fdf2f4", borderBottom: "1px solid #fce4ec" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 1 }}>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#ad1457" }}>
            Select an Emoji
          </Typography>
          <IconButton size="small" onClick={onClose} sx={{ color: "#ad1457", p: 0.5 }}>
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>

        <SearchWrapper>
          <SearchIcon sx={{ fontSize: 18, color: "#f06292", mr: 1 }} />
          <InputBase
            placeholder="Search emoji..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ fontSize: 13, width: "100%", color: "#4a1525" }}
          />
        </SearchWrapper>

        {/* Category Tabs */}
        {!searchTerm && (
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            sx={{
              minHeight: 36,
              "& .MuiTab-root": {
                minHeight: 36,
                minWidth: 46,
                padding: "4px 8px",
                fontSize: 18,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#e91e63",
                height: 3,
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            {EMOJI_CATEGORIES.map((cat, idx) => (
              <Tab key={idx} label={cat.icon} title={cat.name} />
            ))}
          </Tabs>
        )}
      </Box>

      {/* Emoji Grid */}
      <Box
        sx={{
          p: 1.5,
          overflowY: "auto",
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          alignContent: "start",
          backgroundColor: "#ffffff",
        }}
      >
        {filteredEmojis.map((emoji, idx) => (
          <EmojiButton
            key={idx}
            onClick={() => {
              onSelectEmoji(emoji);
            }}
          >
            {emoji}
          </EmojiButton>
        ))}
      </Box>
    </Popover>
  );
};

export default EmojiPicker;
