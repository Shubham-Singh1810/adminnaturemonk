import "./App.css";
import { useState, useEffect } from "react";
import DefaultContainer from "./container/DefaultContainer";
import SignIn from "./pages/SignIn";
function App() {
  const [user, setUser] = useState();
  const handleToggle = () => {
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled"));
    }
  };
  useEffect(()=>{
     setUser(localStorage.getItem("adminUser") ? JSON.parse(localStorage.getItem("adminUser")): null) 
  },[])
  return (
    <div>
    {user ? <DefaultContainer user={user} setUser={setUser}/> : <SignIn setUser={setUser}/> }
    </div>
  );
}

export default App;
