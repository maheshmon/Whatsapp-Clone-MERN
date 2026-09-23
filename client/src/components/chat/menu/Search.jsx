import { useState } from "react";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { InputBase, Box, styled, IconButton } from "@mui/material";

const Component = styled(Box)`
  background: #ffffff;
  height: 48px;
  border-bottom: 1px solid #fce4ec;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

const Wrapper = styled(Box)`
  background-color: #fdf2f4;
  position: relative;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #f8bbd0;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  &:focus-within {
    background-color: #ffffff;
    border-color: #e91e63;
    box-shadow: 0 0 0 2px rgba(233, 30, 99, 0.15);
  }
`;

const Icon = styled(Box)`
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: #ad1457;
`;

const InputField = styled(InputBase)`
  width: 100%;
  height: 36px;
  font-size: 14px;
  color: #4a1525;
  & input::placeholder {
    color: #ad1457;
    opacity: 0.6;
  }
`;

const Search = ({ setText }) => {
  const [val, setVal] = useState("");

  const handleChange = (e) => {
    setVal(e.target.value);
    setText(e.target.value);
  };

  const handleClear = () => {
    setVal("");
    setText("");
  };

  return (
    <Component>
      <Wrapper>
        <Icon>
          <SearchIcon sx={{ fontSize: 19 }} />
        </Icon>
        <InputField
          placeholder="Search or start a new chat"
          value={val}
          onChange={handleChange}
        />
        {val && (
          <IconButton size="small" onClick={handleClear} sx={{ mr: 0.5, p: 0.5, color: "#ad1457" }}>
            <ClearIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Wrapper>
    </Component>
  );
};

export default Search;
