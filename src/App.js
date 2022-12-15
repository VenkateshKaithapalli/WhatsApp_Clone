import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./SideBar/Sidebar";
import Login from "./Login/Login";
import { useStateValue } from "./StateProvider";

function App() {
	const [{user},dispatch]=useStateValue();
  return (
    <div className="app">
		{ !user ?<Login/>
		:
      (<div className="app_body">
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/rooms/:roomId" element={<Chat />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </Router>
      </div>
	  )
}
    </div>
  );
}

export default App;
