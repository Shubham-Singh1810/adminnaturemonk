import React from "react";

function Navbar({ handleToggle, user, setUser }) {
  return (
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-success">
      {/* Navbar Brand*/}
      <a className="navbar-brand ps-3" href="index.html">
         Nature Monk
      </a>
      {/* Sidebar Toggle*/}
      <button
        className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0"
        id="sidebarToggle"
        onClick={() => handleToggle()}
        href="#!"
      >
        <i className="fas fa-bars text-light" />
      </button>
      {/* Navbar Search*/}
      <form className="d-none d-md-inline-block form-inline ms-auto me-0  my-2 my-md-0">
        {/* <div className="input-group">
          <input
            className="form-control"
            type="text"
            placeholder="Search for..."
            aria-label="Search for..."
            aria-describedby="btnNavbarSearch"
          />
          <button className="btn btn-primary" id="btnNavbarSearch" type="button">
            <i className="fas fa-search" />
          </button>
        </div> */}
      </form>
      {/* Navbar*/}
      {/* <ul className="my-2 me-4">
        {" "}
        <li style={{cursor:"pointer"}}>
          <button
            className="text-danger"
            onClick={() => {
              setUser(null);
              localStorage.removeItem("adminUser");
            }}
          >
           LogOut <i class="fa fa-sign-out"></i> 
          </button>
        </li>
      </ul> */}
      <button className="btn btn-danger my-2 me-4" onClick={() => {
              setUser(null);
              localStorage.removeItem("adminUser");
            }}>
      LogOut <i class="fa fa-sign-out"></i> 
      </button>
    </nav>
  );
}

export default Navbar;
