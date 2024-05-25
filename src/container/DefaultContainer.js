import React from "react";
import Navbar from "../components/Navbar";
import Sidenav from "../components/Sidenav";
import Footer from "../components/Footer";
import AddProduct from "../pages/AddProduct";

import AllRoute from "../routes/AllRoute";
function DefaultContainer({user, setUser}) {
  const handleToggle = () => {
    const sidebarToggle = document.getElementById("sidebarToggle");
    if (sidebarToggle) {
      document.body.classList.toggle("sb-sidenav-toggled");
      localStorage.setItem("sb|sidebar-toggle", document.body.classList.contains("sb-sidenav-toggled"));
    }
  };
  return (
    <div className="sb-nav-fixed">
      <Navbar handleToggle={handleToggle} user={user} setUser={setUser} />
      <div id="layoutSidenav">
        <Sidenav />
        <div id="layoutSidenav_content">
          <AllRoute/>
            {/* we have to add routes here */}
        
        </div>
      </div>
    </div>
  );
}

export default DefaultContainer;
