import React, { useEffect, useState } from "react";
import "./Sidebar.css";
// import SettingsIcon from "@mui/icons-material/Settings";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Avatar, IconButton } from "@mui/material";
import SidebarChart from "./SidebarChart";
import db from "../firebase";
import { useStateValue } from "../StateProvider";
const Sidebar = () => {
  const [rooms, setRooms] = useState([]);

  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubcribe = db.collection("rooms").onSnapshot((snapshort) =>
      setRooms(
        snapshort.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubcribe();
    };
  }, []);
  console.log(user.photoURL);
  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL}/>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            {" "}
            <ChatIcon />
          </IconButton>

          <IconButton>
            {" "}
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChart addnewChart />
        {rooms.map((room) => (
          <SidebarChart key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
