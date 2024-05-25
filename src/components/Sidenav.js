import React from "react";
import { useLocation, Link } from "react-router-dom";
function Sidenav() {
  const sideNav = [
    {
      title: "Core",
      navItem: [
        {
          title: "Dashboard",
          path: "/",
          icon: "fas fa-tachometer-alt",
        },
      ],
    },
    {
      title: "Products",
      navItem: [
        {
          title: "Product List",
          path: "/products",
          icon: "fa fa-shopping-cart",
        },
        {
          title: "Add Product",
          path: "/addProduct",
          icon: "fa fa-plus",
        },
      ],
    },
    {
      title: "Orders",
      navItem: [
        {
          title: "Active Order",
          path: "/activeOrder",
          icon: "fas fa-chart-area",
        },
        {
          title: "Delivered Order",
          path: "/deliveredOrder",
          icon: "fas fa-table",
        },
      ],
    },
    {
      title: "Manage",
      navItem: [
        {
          title: "Blog",
          path: "/activeOrder",
          icon: "fa fa-square",
        },
        {
          title: "Story",
          path: "/deliveredOrder",
          icon: "fas fa-pencil-alt",
        },
        {
          title: "User",
          path: "/deliveredOrder",
          icon: "fa fa-user",
        },
      ],
    },
  ];
  return (
    <div id="layoutSidenav_nav">
      <nav className="sb-sidenav accordion sb-sidenav-light bg-success" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
          <div className="nav">
            {sideNav?.map((v, i) => {
              return (
                <>
                  <div className="sb-sidenav-menu-heading text-light">{v?.title}</div>
                  {v?.navItem?.map((v, i) => {
                    return (
                      <Link className="nav-link text-light" to={v?.path}>
                        <div className="sb-nav-link-icon text-light">
                          <i className={v?.icon+ " text-light"} />
                        </div>
                        {v?.title}
                      </Link>
                    );
                  })}
                </>
              );
            })}

            
            
            
            {/* <div className="sb-sidenav-menu-heading">Manage</div> */}
           
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidenav;
