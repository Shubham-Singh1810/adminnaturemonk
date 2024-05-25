import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bannerService from "../services/bannerService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

function BannerList() {
  const navigate = useNavigate();
  const bannerServ = new bannerService();
  const [loader, setLoader] = useState(true);
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  const getBannerList = async () => {
    try {
      let query = {
        category: {
          $regex: ".*" + category + ".*",
        },
      };
      let response = await bannerServ.getBannerList({ query });
      setList(response?.data.data);
      setCount(response?.data.count);
      setLoader(false);
    } catch (error) {}
  };
  const deleteRecord = async (id) => {
    if (window.confirm("are you sure you want to delete the record") == true) {
      try {
        let response = await bannerServ.delete(id);
        toast.success(response.data.message);
        getBannerList();
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getBannerList();
  }, [category]);
  return (
    <div className="gradientColr">
        <div className="row m-lg-4  bg-light rounded shadow-lg" style={{ border: "1px solid rgba(125, 129, 144, 0.15)" }}>
        <div className="row m-3 ">
          <div className="col-12 p-1 d-flex justify-content-between">
            <h3 className="monoText">Banner List </h3>
            <h5 className="me-3">
              <u>Count </u> : {count}{" "}
            </h5>
          </div>
          <div className="col-md-6 p-1   col-12"></div>
          <div className=" col-md-3 p-1 col-6">
            <select className="form-select w-100" onChange={(e) => setCategory(e.target.value)}>
              <option selected value="">
                Select Category
              </option>
              <option value="Home">Home</option>
              <option value="Masale">Masale</option>
              <option value="Pickels">Pickels</option>
              <option value="Powder">Powder</option>
              <option value="Dairy Product">Dairy Product</option>
              <option value="Oil">Oil</option>
            </select>
          </div>
          <div className=" col-md-3 py-1 pe-3 col-6">
            <button onClick={() => navigate("/addBanner")} className="btn btn-outline-success w-100">
              Create New <i className="ms-1 fa fa-plus"></i>
            </button>
          </div>
        </div>
        <hr className="mb-0" />
        <div className="productTable">
          {!loader ? (
            <table class="table table-striped ">
              <thead>
                <tr>
                  <th scope="col" className="py-3">
                    Banner
                  </th>
                  <th scope="col" className="py-3"></th>
                  <th scope="col" className="py-3 text-center"></th>
                  <th scope="col" className="py-3 text-center">
                    Category
                  </th>
                  <th scope="col" className="py-3 text-center">
                    Created At
                  </th>
                  <th scope="col" className="py-3 text-center">
                    Action
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
                          <img style={{ height: "45px" }} src={v?.bannerImg} className="img-fluid" />
                        </td>
                        <td className="align-middle">{v?.title}</td>
                        <td className="align-middle text-center"></td>
                        <td className="align-middle text-center">{v?.category}</td>
                        <td className="align-middle text-center"> {moment(v.createdAt).format("DD/MM/YYYY")}</td>
                        <td className="align-middle text-center">
                          <i className="fa fa-eye"></i>{" "}
                          <span onClick={() => navigate(`/addProduct/${v._id}`)}>
                            {" "}
                            {/* <i className="fa fa-edit"></i> */}
                          </span>{" "}
                          <span onClick={() => deleteRecord(v._id)}>
                            <i className="fa fa-trash"></i>
                          </span>
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
        </div>
      </div> 
      <ToastContainer />
    </div>
  );
}

export default BannerList;
