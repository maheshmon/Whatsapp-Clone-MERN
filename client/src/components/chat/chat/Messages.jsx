import { useContext, useState, useEffect, useRef } from "react";
import { Box, styled } from "@mui/material";

import { AccountContext } from "../../../context/AccountProvider";
import { newMessage, getMessages } from "../../../service/api";

// components
import Footer from "./Footer";
import Message from "./Message";

const Wrapper = styled(Box)`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff0f5;
  background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
  background-size: 400px;
  overflow: hidden;
`;

const Component = styled(Box)`
  flex: 1;
  overflow-y: auto;
  padding: 12px 0;
`;

const Container = styled(Box)`
  padding: 2px 24px;
`;

const Messages = ({ person, conversation }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const [incomingMessage, setIncomingMessage] = useState(null);

  const scrollRef = useRef();

  const { account, socket, newMessageFlag, setnewMessageFlag } = useContext(AccountContext);

  useEffect(() => {
    socket.current?.on("getMessage", (data) => {
      setIncomingMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    const getMessageDetails = async () => {
      if (conversation?._id) {
        let data = await getMessages(conversation._id);
        setMessages(data || []);
      }
    };
    conversation?._id && getMessageDetails();
  }, [person._id, conversation?._id, newMessageFlag]);

  useEffect(() => {
    setTimeout(
      () =>
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        }),
      100
    );
  }, [messages]);

  useEffect(() => {
    if (incomingMessage && conversation?.members?.includes(incomingMessage.senderId)) {
      setMessages((prev) => [...prev, incomingMessage]);
    }
  }, [incomingMessage, conversation]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      if (!value.trim() && !file) return;

      let message = {};
      if (!file) {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      } else {
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }

      socket.current?.emit("sendMessage", message);

      await newMessage(message);

      setValue("");
      setFile("");
      setImage("");
      setnewMessageFlag((prev) => !prev);
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages &&
          messages.map((msg, index) => (
            <Container key={msg._id || `${msg.createdAt}-${index}`} ref={scrollRef}>
              <Message message={msg} />
            </Container>
          ))}
      </Component>
      <Footer
        sendText={sendText}
        setValue={setValue}
        value={value}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </Wrapper>
  );
};

export default Messages;