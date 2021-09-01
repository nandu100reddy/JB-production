import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container } from "react-bootstrap";
import Post from "./common/Post";
import ChatMember from "./common/ChatMember";
import Profile from "./Profile";
import "./_Chat.scss";

const Chat = (props) => {
  const [userOpen, setUserOpen] = useState(false);
  const [viewUser, setViewUser] = useState();
  const { activeApplication, currentObject } = props;
  const [selectedObject, setSelectedObject] = useState("");

  useEffect(() => {
    setSelectedObject(currentObject.label);
  }, [currentObject]);
  const handleProfileOpen = (userData) => {
    setSelectedObject("Chat Member");
    setUserOpen(true);
    setViewUser(userData);
  };

  return (
    <>
      <div className="chat">
        <Container fluid className="pt-3">
          {selectedObject == "Chat" ? (
            <Tabs defaultActiveKey="post" id="chat-tab">
              <Tab eventKey="post" title="Post">
                <Post handleProfileOpen={handleProfileOpen} />
              </Tab>
              {/* <Tab eventKey="poll" title="Poll" disabled>
                Poll
              </Tab> */}
              <Tab eventKey="question" title="Question" disabled>
                Question
              </Tab>
            </Tabs>
          ) : selectedObject == "Chat Member" ? (
            userOpen ? (
              <Profile
                viewUser={viewUser}
                handleProfileOpen={handleProfileOpen}
              />
            ) : (
              <ChatMember setUserOpen={setUserOpen} setViewUser={setViewUser} />
            )
          ) : (
            <h1>{selectedObject}</h1>
          )}
        </Container>
      </div>
    </>
  );
};

export default Chat;
