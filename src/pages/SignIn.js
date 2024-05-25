import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import userService from "../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function SignIn({ setUser }) {
  const[loader, setLoader] = useState(false)
  const userServ = new userService();
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState({
    password: "",
    email: "",
  });
  const ValidateSchema = Yup.object().shape({
    password: Yup.string().required("This field is required"),
    email: Yup.string().required("This field is required").email(),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoader(true)
    try {
      let response = await userServ.login({ role: "admin", password: values.password, email: values.email });
      if (response.data.message == "NatureNonk welcomes You :)") {
        toast.success(response.data.message);
        setUser(localStorage.setItem("adminUser", JSON.stringify(response.data.data)));
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
    setLoader(false)
  };
  const formik = useFormik({
    initialValues: value,
    validateOnBlur: true,
    onSubmit,
    validationSchema: ValidateSchema,
    enableReinitialize: true,
  });
  const loginAsGuest = async()=>{
    try {
      let response = await userServ.login({ role: "admin", password: "password22", email: "hittheshubham1810@gmail.com" });
      if (response.data.message == "You are logged in successfully") {
        toast.success(response.data.message);
        setUser(localStorage.setItem("adminUser", JSON.stringify(response.data.data)));
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }
  return (
    <section className="loginSection">
      <div className="login">
        <div className="loginHeading">
          <form onSubmit={formik.handleSubmit}>
            <h3># Login As Admin</h3>
            <label htmlFor="USERNAME"> EMAIL</label> <br />
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="formik-errors text-danger fontSize15">{formik.errors.email}</div>
            ) : null}
            <br />
            <div className="d-flex justify-content-between">
              <label htmlFor="PASSWORD">PASSWORD</label>{" "}
              <span onClick={() => setShowPassword(!showPassword)}>
                <i className="fa-solid fa-eye " style={{ marginTop: "7px" }}></i>
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="formik-errors text-danger fontSize15">{formik.errors.password}</div>
            ) : null}
            <br />
            {loader ? (
              <button class="btn btn-primary w-100" type="button" disabled>
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading
              </button>
            ) : (
              <button type="submit" className="btn btn-primary btn-sm py-2">
                LOGIN
              </button>
            )}
          </form>
          {/* <hr/> */}
          {/* <p className="text-center mb-0">Login As <u className="text-primary" style={{cursor:"pointer"}} onClick={loginAsGuest}>Guest</u></p> */}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignIn;
