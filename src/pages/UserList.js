import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function UserList() {
  const navigate = useNavigate();
  const userServ = new userService();
  const [loader, setLoader] = useState(true);
  const [category, setCategory] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [pageArr, setPageArr] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const[rangeValue, setRangeValue] = useState(1)
  const paginationHandler = (totalCount) => {
    let totalPage = Math.round(totalCount / 10);
    let arr = [];
    for (let i = 0; i < totalPage; i++) {
      arr[i] = i + 1;
    }
    setPageArr(arr);
  };
  const getUserList = async () => {
    try {
      let query = {
        title: {
          $regex: ".*" + searchKey + ".*",
        },
        category: {
          $regex: ".*" + category + ".*",
        },
      };
      let pageItem = pageNo * 10 - 10;
      let response = await userServ.getUserList();
      console.log(response);
      setList(response?.data.data);
      setCount(response?.data.count);
      setLoader(false);
      paginationHandler(response?.data.count);
    } catch (error) {}
  };

  useEffect(() => {
    getUserList();
  }, [category, searchKey, pageNo]);
  return (
    <div className="gradientColr">
      <div className="row m-lg-4  bg-light rounded shadow-lg" style={{ border: "1px solid rgba(125, 129, 144, 0.15)" }}>
        <div className="row m-3 ">
          <div className="col-12 p-1 d-flex justify-content-between">
            <h3 className="monoText">Users: 1 </h3>
            <div className="col-4 px-3">
              <input
                className="form-control"
                placeholder="Search User by Name"
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
              />
            </div>
          </div>
        </div>
        <hr className="mb-0" />
        <div className="productTable">
          {!loader ? (
            <table class="table table-striped ">
              <thead>
                <tr>
                  <th scope="col" className="py-3">
                    Profile
                  </th>
                  <th scope="col" className="py-3">
                    Role
                  </th>
                  <th scope="col" className="py-3">
                    Phone Number
                  </th>

                  <th scope="col" className="py-3 text-center">
                    Address Line
                  </th>
                  <th scope="col" className="py-3 text-center"></th>
                  <th scope="col" className="py-3 text-center">
                    Pincode
                  </th>
                  <th scope="col" className="py-3 text-center">
                    State
                  </th>
                  <th scope="col" className="py-3 text-center">
                    City
                  </th>
                  <th scope="col" className="py-3 text-center">
                    Active Since
                  </th>
                  <th scope="col" className="py-3 text-center">
                    Status
                  </th>
                </tr>
              </thead>
              {list?.length == 0 ? (
                <div className="text-center">
                  <img
                    className="text-center my-5"
                    src="https://tse3.mm.bing.net/th?id=OIP.6WUgQ56YZ-ZKcWT-4KSKAQAAAA&pid=Api&P=0&h=180"
                    style={{ height: "40vh" }}
                  />
                </div>
              ) : (
                <tbody>
                  {list?.map((v, i) => {
                    return (
                      <tr>
                        <td>
                          <div className="d-flex">
                            <div className="me-2">
                              <img
                                style={{ height: "60px", width: "60px", borderRadius: "50%" }}
                                src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png"
                                className="img-fluid gradientColrHead p-1"
                              />
                            </div>
                            <div className="mt-1">
                              {v?.fullName} <br /> {v?.email}
                            </div>
                          </div>
                        </td>
                        <td className="align-middle">{v?.role} </td>
                        <td className="align-middle">{7762042085} </td>
                        <td className="align-middle text-center">{v?.address}</td>
                        <td className="align-middle text-center"></td>
                        <td className="align-middle text-center">{v?.pincode}</td>
                        <td className="align-middle text-center">{v?.state}</td>
                        <td className="align-middle text-center">{v?.city}</td>
                        <td className="align-middle text-center"> {moment(v.createdAt).format("DD/MM/YYYY")}</td>
                        <td className="align-middle text-center">
                         {rangeValue==0 ? <span className="text-danger">Blocked</span> : <span className="text-primary px-2">Active</span> } <br />
                          <input type="range" style={{ width: "40px" }} max={1} min={0} value={rangeValue} onChange={(e)=>setRangeValue(e.target.value)}/>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          ) : (
            <div style={{ height: "60vh" }} className="d-flex justify-content-center align-items-center">
              <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status"></div>
            </div>
          )}
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {pageArr.length > 1 &&
                  pageArr?.map((v, i) => {
                    return (
                      <li className="page-item">
                        <a className="page-link" onClick={() => setPageNo(v)}>
                          {v}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default UserList;
