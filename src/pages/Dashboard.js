import { useState, useEffect } from "react";
import userService from "../services/userService";
import notificationService from "../services/notificationService";
import { Link } from "react-router-dom";
function Dashboard() {
  const userServ = new userService();
  const notification = new notificationService();
  const [megaResult, setMegaResult] = useState();
  const [notificationList, setNotificationList] = useState([]);
  const getMegaResult = async () => {
    try {
      let response = await userServ.getMegaResult();
      console.log(response.data);
      setMegaResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getNotifications = async () => {
    try {
      let response = await notification.getNotificationList();
      setNotificationList(response.data.data);
    } catch (error) {}
  };
  const deleteNotification = async (v) => {
    try {
      let response = await notification.delete(v);
      getNotifications();
    } catch (error) {}
  };
  useEffect(() => {
    getMegaResult();
    getNotifications();
  }, []);
  const staticsArr = [
    {
      name: "Active Orders",
      count: megaResult?.user,
      icon: "fa fa-tasks",
    },
    {
      name: "Products",
      count: megaResult?.product,
      icon: "fa fa-shopping-cart",
    },
    {
      name: "Queries",
      count: megaResult?.product,
      icon: "fa fa-phone",
    },
    {
      name: "Reviwes",
      count: megaResult?.product,
      icon: "fa fa-comment",
    },
    {
      name: "Users",
      count: megaResult?.user,
      icon: "fa fa-users",
    },
    {
      name: "Blogs",
      count: megaResult?.user,
      icon: "fa fa-square",
    },
    {
      name: "Stories",
      count: megaResult?.user,
      icon: "fas fa-pencil-alt",
    },
    {
      name: "Orders",
      count: megaResult?.user,
      icon: "fas fa-table",
    },
  ];
  return (
    <div className="">
      <h3 className="mx-sm-5 mx-4 mt-3" style={{ fontFamily: "sans-serif", color: "gray" }}>
        <u> Statistics</u>
      </h3>
      <div className="row m-lg-3 m-1 text-center " style={{ padding: "0px" }}>
        {staticsArr?.map((v, i) => {
          return (
            <div className="col-lg-3 col-md-4  col-sm-6 col-12 monoText  ">
              <div className="m-lg-3 m-md-3 m-1 bg-light p-2 py-3 shadow  border rounded">
                <div className="d-flex justify-content-between px-2 text-secondary">
                  <div>
                  <h5 className="my-auto d-flex align-items-center mb-0">
                    <i className={v?.icon}></i>
                    <span className="ms-2">{v?.name}</span>
                  </h5>
                    
                  </div>
                  <h5 className="mb-2">{v?.count}</h5>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="row">
        <div className="col-lg-8 col-md-12 col-12 row">
          <h3 className="mx-sm-5 mx-4 mt-3" style={{ fontFamily: "sans-serif", color: "gray" }}>
            <u>Shortcuts</u>
          </h3>
          <div className="row m-lg-3 m-1 text-center " style={{ padding: "0px" }}>
            <div className="col-lg-4 col-md-6   col-12 monoText  ">
              <Link to="/addProduct" style={{ textDecoration: "none" }}>
                <div
                  className="m-lg-3 m-md-3 m-1 p-2   shadow-md rounded"
                  style={{ background: "rgba(43, 30, 190, .09)" }}
                >
                  <div className="d-flex justify-content-between px-2">
                    <div className="py-2">
                      <h4>
                        Add Products <i className="fa fa-plus"></i>
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6  col-12 monoText  ">
              <Link to="/users" style={{ textDecoration: "none" }}>
                <div
                  className="m-lg-3 m-md-3 m-1  p-2   shadow-md rounded"
                  style={{ background: "rgba(43, 30, 190, .09)" }}
                >
                  <div className="d-flex justify-content-between px-2">
                    <div className="py-2">
                      <h4>
                        User List <i className="fa fa-users"></i>
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6  col-12 monoText  ">
              <Link to="/banners" style={{ textDecoration: "none" }}>
                <div
                  className="m-lg-3 m-md-3 m-1  p-2   shadow-md rounded"
                  style={{ background: "rgba(43, 30, 190, .09)" }}
                >
                  <div className="d-flex justify-content-between px-2">
                    <div className="py-2">
                      <h4>
                        Banner List <i className="fa fa-post"></i>
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6  col-12 monoText  ">
              <Link to="/activeOrder" style={{ textDecoration: "none" }}>
                <div
                  className="m-lg-3 m-md-3 m-1  p-2   shadow-md rounded"
                  style={{ background: "rgba(43, 30, 190, .09)" }}
                >
                  <div className="d-flex justify-content-between px-2">
                    <div className="py-2">
                      <h4>
                        Active Order <i className="fa fa-post"></i>
                      </h4>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6  col-12 monoText  ">
              <Link to="/deliveredOrder" style={{ textDecoration: "none" }}>
                <div
                  className="m-lg-3 m-md-3 m-1  p-2   shadow-md rounded"
                  style={{ background: "rgba(43, 30, 190, .09)" }}
                >
                  <div className="d-flex justify-content-between px-2">
                    <div className="py-2">
                      <h5>
                        Delivered Order <i className="fa fa-post"></i>
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-lg-4 col-md-6  col-12 monoText  ">
              <Link to="/deliveredOrder" style={{ textDecoration: "none" }}>
                <div
                  className="m-lg-3 m-md-3 m-1  p-2   shadow-md rounded"
                  style={{ background: "rgba(43, 30, 190, .09)" }}
                >
                  <div className="d-flex justify-content-between px-2">
                    <div className="py-2">
                      <h5>
                        Delivered Order <i className="fa fa-post"></i>
                      </h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 col-12 ">
          <div
            className=" mt-3 d-flex justify-content-between mx-2"
            style={{ fontFamily: "sans-serif", color: "gray" }}
          >
            <h3>Notifications</h3>
            <p className="mb-0 text-primary" style={{ textAlign: "right" }}>
              <u>Mark all as read</u>
            </p>
          </div>
          <div className="notificationContainer">
            {notificationList?.map((v, i) => {
              return (
                <div className="d-flex justify-content-between p-3 m-1 readNotifyBg">
                  <p className="mb-0">{v?.message}</p>
                  <p className="mb-0" onClick={() => deleteNotification(v._id)}>
                    <i className="fa fa-trash"></i>
                  </p>
                </div>
              );
            })}
            {notificationList?.length == 0 && <div className="text-center py-4">Nothing to display</div>}
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Dashboard;
