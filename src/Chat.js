import { Avatar, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase/compat/app";
import { useStateValue } from "./StateProvider";
const Chat = () => {
  const [{ user }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
    }

    db.collection("rooms")
      .doc(roomId)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMsg = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="chart">
      <div className="chart_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
        <div className="chart_info">
          <h2>{roomName}</h2>
          <p>
			last seen{' '}
			{
				new Date(
					messages[messages.length-1]?.timestamp?.toDate()
				).toUTCString()
			}
		  </p>
        </div>
        <div className="chart_headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            {" "}
            <AttachFileOutlinedIcon />
          </IconButton>

          <IconButton>
            {" "}
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chart_body">
        {messages.map((msg) => (
          <p className={`chart_msg ${msg.name===user.displayName && "chat_receiver"}`}>
            <span className="chat_name">{msg.name}</span>
            {msg.message}
            <span className="chat_time">
              {new Date(msg.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chart_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMsg} type="submit">
            Send Msg
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
