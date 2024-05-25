import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bannerService from "../services/bannerService";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
function AddBanner() {
  const bannerServ = new bannerService();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [prev, setPrev] = useState("");
  const [value, setValue] = useState({
    bannerImg: "",
    category: "",
  });
  const ValidateSchema = Yup.object().shape({
    bannerImg: Yup.string().required("This field is required"),
    category: Yup.string().required("This field is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("bannerImg", values.bannerImg);
    formData.append("category", values.category);
    try {
      let response;

      const formData = new FormData();
      formData.append("bannerImg", values.bannerImg);
      formData.append("category", values.category);
      response = await bannerServ.create(formData);

      setLoader(false);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/banners");
      }, 1000);
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };
  const formik = useFormik({
    initialValues: value,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  return (
    <div
      className=" d-flex justify-content-center  align-items-center"
      style={{ height: "90vh", background: "whitesmoke" }}
    >
      <div className="addBanner rounded shadow-lg bg-light p-4">
        <div className="d-flex justify-content-between">
          <h2>Add Banner</h2>
          <h2 onClick={() => navigate("/banners")}>
            <i className="fa fa-close"></i>
          </h2>
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className=" col-12 mt-3 text-center">
              <img
                className="img-fluid"
                src={
                  prev == "" ? "https://tse4.mm.bing.net/th?id=OIP.W-wYL7ez4yjEljf1QKxsbAHaHa&pid=Api&P=0&h=180" : prev
                }
                style={{ height: "150px", borderRadius: "50%" }}
              />
              <input
                type="file"
                className="form-control mt-3 "
                name="productHeroImg"
                onChange={(e) => {
                  formik.setFieldValue("bannerImg", e.currentTarget.files[0]);
                  setPrev(URL.createObjectURL(e.target.files[0]));
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.bannerImg && formik.errors.bannerImg ? (
                <div className="formik-errors text-danger ">{formik.errors.bannerImg}</div>
              ) : null}
            </div>
            <div className=" col-12 mt-3">
              <label>Category</label>
              <select
                className="form-select"
                name="category"
                onChange={formik.handleChange}
                value={formik.values.category}
                aria-label="Default select example"
              >
                {formik.touched.category && formik.errors.category ? (
                  <div className="formik-errors text-danger ">{formik.errors.category}</div>
                ) : null}
                <option selected>Select Category</option>
                <option value="Home">Home</option>
                <option value="Masale">Masale</option>
                <option value="Pickels">Pickels</option>
                <option value="Powder">Powder</option>
                <option value="Dairy Product">Dairy Product</option>
                <option value="Oil">Oil</option>
              </select>
            </div>
            <div className=" col-12 mt-3">
            {loader ? (
                <button class="btn btn-primary w-100" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Saving...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100 ">
                  Save 
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBanner;
