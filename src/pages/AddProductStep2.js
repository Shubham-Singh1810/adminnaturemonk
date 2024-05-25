import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productService from "../services/productService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProductStep2() {
  const params = useParams();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [fileType, setFileType] = useState("");
  const [imgPrev, setImgPrev] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [fileSubmit, setFileSubmit] = useState("");
  const productServ = new productService();
  const [res, setRes] = useState("");
  const handleChange = (file) => {
    setFileType(file.type.split("/")[0]);
    setFileSubmit(file);
    if (file.type.split("/")[0] == "image") {
      setVideoPrev("");
      setImgPrev(URL.createObjectURL(file));
    } else if (file.type.split("/")[0] == "video") {
      setVideoPrev(URL.createObjectURL(file));
      setImgPrev("");
    } else {
      alert("please choose image or video file only");
    }
  };
  const handleSubmit = async () => {
    setLoader(true);
    try {
      if (fileType == "image") {
        const formData = new FormData();
        formData.append("_id", params.id);
        formData.append("productGallery", fileSubmit);
        let response = await productServ.updateProductGallery(formData);
        toast.success(response.data.message);
      } else {
        const formData = new FormData();
        formData.append("_id", params.id);
        formData.append("video", fileSubmit);
        let response = await productServ.updateProductVideo(formData);
        toast.success(response.data.message);
      }
      getProductDetails();
      setImgPrev("");
      setVideoPrev("");
      setFileSubmit("");
      setLoader(false);
      setFileType("");
    } catch (error) {
      toast.error(error);
      setLoader(false);
    }
  };
  const getProductDetails = async () => {
    try {
      let response = await productServ.getProduct(params.id);
      setRes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteImgHandler = async (v) => {
    if (window.confirm("are you sure you want to delete the Img ") == true) {
      try {
        let response = await productServ.deletePicInGallery({_id: params.id, productGalleryImg : v });
        toast.success("Image Removed Successfully")
        getProductDetails()
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error("Something went wrong")
    }
  };
  const deleteVideoHandler = async (v) => {
    if (window.confirm("are you sure you want to delete the Video ") == true) {
      try {
        let response = await productServ.deleteVideoInGallery({_id: params.id, productGalleryVideo : v });
        toast.success("Video Removed Successfully")
        getProductDetails()
      } catch (error) {
        console.log(error)
      }
    } else {
      toast.error("Something went wrong")
    }
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <div style={{ background: "whitesmoke" }}>
      <div className="row m-lg-4 bg-light rounded shadow-lg" style={{ border: "1px solid rgba(125, 129, 144, 0.15)" }}>
        <div
          className="col-12  d-flex justify-content-between"
          style={{ borderBottom: "1px solid rgba(125, 129, 144, 0.15)" }}
        >
          <div className="d-flex">
            <div className="ps-1 py-3 pe-3" style={{ borderRight: "1px solid rgba(125, 129, 144, 0.15)" }}>
              <img
                onClick={() => navigate("/addProduct/" + params.id)}
                style={{ height: "40px" }}
                src="https://thumbs.dreamstime.com/b/back-icoxn-vector-sign-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133760283.jpg"
              />
            </div>
            <h3 className="my-auto ms-3 monoText">{params.id ? "Edit " : "Add "}Product</h3>
          </div>
          <h3 className="my-auto me-3">
            <span className="mobHide">Step</span> 2
          </h3>
        </div>
        <div className="d-flex justify-content-between">
          <h4 className="m-2" style={{ color: "gray" }}>
            Start Uploading Product Gallery
          </h4>
        </div>

        <div className="row my-3 mx-1">
          <div className="col-lg-2 col-12 text-center p-2">
            {videoPrev != "" ? (
              <video autoPlay style={{ height: "200px", width: "100%" }} controls>
                <source src={videoPrev} />
              </video>
            ) : (
              <img
                src={
                  imgPrev == ""
                    ? "https://cdn.dribbble.com/users/34020/screenshots/3993396/otp_icon_upload.gif"
                    : imgPrev
                }
                className="img-fluid rounded"
                style={{ height: "150px", width: "100%" }}
              />
            )}
            <input className="form-control mt-2" type="file" onChange={(e) => handleChange(e.target.files[0])} />
            <button className={"btn btn-info mt-3  w-100" + (fileType == "" ? " disabled" : "")} onClick={handleSubmit}>
              Add <i className="fa fa-plus"></i>
            </button>
          </div>
          {res?.productGallery?.map((v, i) => {
            return (
              <div className="col-lg-2 col-12 text-center p-3 px-4">
                <img
                  src={v}
                  className="img-fluid rounded"
                  style={{ height: "150px", width: "100%" }}
                  onDoubleClick={() => deleteImgHandler(v)}
                />
              </div>
            );
          })}
          {res?.video?.map((v, i) => {
            return (
              <div className="col-2 text-center p-3 px-4">
                <video
                  autoPlay
                  style={{ height: "150px", width: "100%" }}
                  controls
                  onDoubleClick={() => deleteVideoHandler(v)}
                >
                  <source src={v} />
                </video>
              </div>
            );
          })}
        </div>
        <hr />
        <div className="p-1 pb-3">
          <button className="btn btn-primary  w-100" onClick={() => navigate("/products")}>
            Publish
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProductStep2;
