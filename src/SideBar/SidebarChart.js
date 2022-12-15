import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import "./SidebarChart.css";
const SidebarChart = ({ id, name, addnewChart }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => setMessages(
			snapshot.docs.map((doc)=>doc.data())
		));
    }
  }, [id]);
  const createChart = () => {
    const roomName = prompt("Please Enter Name for Chat :-");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !addnewChart ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChart">
        <Avatar src={`https://avatars.dicebear.com/api/human/:${seed}.svg`} />
        <div className="sidebarChart_info">
          <h2>{name}</h2>

          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChart} className="sidebarChart">
      <h2>Add new Chart</h2>
    </div>
  );
};

export default SidebarChart;
