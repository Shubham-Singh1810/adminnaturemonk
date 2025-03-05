import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import productService from "../services/productService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
function AddProduct() {
  const productServ = new productService();
  const navigate = useNavigate();
  const params = useParams();
  const [loader, setLoader] = useState(false);
  const [prev, setPrev] = useState("");
  const [value, setValue] = useState({
    productHeroImg: "",
    title: "",
    subTitle: "",
    price: "",
    category: "",
    subCategory: [],
    discription: "",
    quantity: "",
    discountedPrice:""
  });
  const ValidateSchema = Yup.object().shape({
    productHeroImg: Yup.string(),
    title: Yup.string().required("This field is required"),
    subTitle: Yup.string().required("This field is required"),
    price: Yup.string().required("This field is required"),
    category: Yup.string().required("This field is required"),
    subCategory: Yup.array().of(Yup.string().oneOf(["Story", "Best Seller", "Deal Of the Day"])),
    discription: Yup.string().required("This field is required"),
    quantity: Yup.string().required("This field is required"),
    discountedPrice: Yup.string().required("This field is required"),
  });
  const onSubmit = async (values, { resetForm }) => {
    setLoader(true);
    const formData = new FormData();
    formData.append("productHeroImg", values.productHeroImg);
    formData.append("title", values.title);
    formData.append("subTitle", values.subTitle);
    formData.append("price", values.price);
    formData.append("discription", values.discription);
    formData.append("quantity", values.quantity);
    formData.append("category", values.category);
    formData.append("subCategory", values.subCategory);
    formData.append("discountedPrice", values.discountedPrice);
    try {
      let response;
      if (params.id) {
        const formData = new FormData();
        if (values.productHeroImg) {
          formData.append("productHeroImg", values.productHeroImg);
        }
        
        formData.append("title", values.title);
        formData.append("subTitle", values.subTitle);
        formData.append("price", values.price);
        formData.append("discription", values.discription);
        formData.append("quantity", values.quantity);
        formData.append("category", values.category);
        formData.append("subCategory", values.subCategory);
        formData.append("discountedPrice", values.discountedPrice);
        formData.append("_id", params.id);
        response = await productServ.update(formData);
      } else {
        const formData = new FormData();
        formData.append("productHeroImg", values.productHeroImg);
        // formData.append("video", values.video);
        formData.append("title", values.title);
        formData.append("subTitle", values.subTitle);
        formData.append("price", values.price);
        formData.append("discription", values.discription);
        formData.append("quantity", values.quantity);
        formData.append("category", values.category);
        formData.append("discountedPrice", values.discountedPrice);
        formData.append("subCategory", values.subCategory);
        response = await productServ.create(formData);
      }
      setLoader(false);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/addProductStep2/" + response.data.data._id);
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
  const getProductDetails = async () => {
    try {
      let response = await productServ.getProduct(params.id);
      const subCategoryString = response.data.data.subCategory;
      const subCategoryArray = subCategoryString.split(",").map(item => item.trim());
      setPrev(response.data.data.productHeroImg);
      setValue({
        title: response.data.data.title,
        subTitle: response.data.data.subTitle,
        price: response.data.data.price,
        category: response.data.data.category,
        subCategory: subCategoryArray,
        discription: response.data.data.discription,
        quantity: response.data.data.quantity,
        discountedPrice: response.data.data.discountedPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params.id) {
      getProductDetails();
    }
  }, []);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    const { subCategory } = formik.values;
  
    if (checked) {
      formik.setFieldValue("subCategory", [...subCategory, value]);
    } else {
      formik.setFieldValue("subCategory", subCategory.filter((v) => v !== value));
    }
  };
  
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
                onClick={() => navigate("/products")}
                style={{ height: "40px" }}
                src="https://thumbs.dreamstime.com/b/back-icoxn-vector-sign-symbol-isolated-white-background-logo-concept-your-web-mobile-app-design-133760283.jpg"
              />
            </div>
            <h3 className="my-auto ms-3 monoText">{params.id ? "Edit " : "Add "}Product</h3>
          </div>
          <h3 className="my-auto me-3">Step 1</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="row my-4 mx-2">
            <div className="col-sm-3 col-12 text-center">
              <img
                className="img-fluid"
                src={
                  prev == "" ? "https://tse4.mm.bing.net/th?id=OIP.W-wYL7ez4yjEljf1QKxsbAHaHa&pid=Api&P=0&h=180" : prev
                }
                style={{ height: "150px" }}
              />
              <input
                type="file"
                className="form-control mt-3 "
                name="productHeroImg"
                onChange={(e) => {
                  formik.setFieldValue("productHeroImg", e.currentTarget.files[0]);
                  setPrev(URL.createObjectURL(e.target.files[0]));
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.productHeroImg && formik.errors.productHeroImg ? (
                <div className="formik-errors text-danger ">{formik.errors.productHeroImg}</div>
              ) : null}
            </div>
            <div className="col-sm-9 col-12 py-2 px-0 ms-1 row ">
              <div className="col-sm-6 py-2  col-12 ">
                <label>Title</label>
                <input
                  className="form-control "
                  name="title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div className="formik-errors text-danger ">{formik.errors.title}</div>
                ) : null}
              </div>
              <div className="col-sm-6 py-2  col-12">
                <label>Sub Title</label>
                <input
                  className="form-control"
                  name="subTitle"
                  value={formik.values.subTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.subTitle && formik.errors.subTitle ? (
                  <div className="formik-errors text-danger ">{formik.errors.subTitle}</div>
                ) : null}
              </div>
              <div className="col-sm-6 py-2  col-12">
                <label>Category</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="category"
                  onChange={formik.handleChange}
                  value={formik.values.category}
                >
                  {formik.touched.category && formik.errors.category ? (
                    <div className="formik-errors text-danger ">{formik.errors.category}</div>
                  ) : null}
                  <option selected>Select Category</option>
                  <option value="Oil">Oil</option>
                  <option value="Ghee">Ghee</option>
                  <option value="Dehydrated">Dehydrated</option>
                  <option value="SuperFood">Super Food</option>
                  <option value="A2Milk">A2 Milk</option>
                  <option value="Jaggery">Jaggery</option>
                  <option value="Pulses">Pulses</option>
                </select>
              </div>
              <div className="col-sm-6 py-2  col-6">
                <label>Price</label>
                <input
                  className="form-control"
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price ? (
                  <div className="formik-errors text-danger ">{formik.errors.price}</div>
                ) : null}
              </div>
              <div className="col-sm-6 py-2  col-6">
                <label>Discounted Price</label>
                <input
                  className="form-control"
                  name="discountedPrice"
                  type="number"
                  value={formik.values.discountedPrice}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.discountedPrice && formik.errors.discountedPrice ? (
                  <div className="formik-errors text-danger ">{formik.errors.discountedPrice}</div>
                ) : null}
              </div>
              <div className="col-sm-6 py-2  col-6">
                <label>Quantity</label>
                <input
                  className="form-control"
                  name="quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className="formik-errors text-danger ">{formik.errors.quantity}</div>
                ) : null}
              </div>
              <div className="col-sm-12 py-2 col-12">
  <label>Special Appearance</label>
  <div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name="subCategory"
        value="Story"
        checked={formik.values.subCategory.includes("Story")}
        onChange={handleCheckboxChange}
      />
      <label className="form-check-label">Story</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name="subCategory"
        value="Best Seller"
        checked={formik.values.subCategory.includes("Best Seller")}
        onChange={handleCheckboxChange}
      />
      <label className="form-check-label">Best Seller</label>
    </div>
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name="subCategory"
        value="Deal Of the Day"
        checked={formik.values.subCategory.includes("Deal Of the Day")}
        onChange={handleCheckboxChange}
      />
      <label className="form-check-label">Deal Of the Day</label>
    </div>
  </div>
</div>

            </div>
            
            <div className="col-12 col-md-12 ">
              <label>Discription</label>
              <textarea
                className="form-control"
                rows="4"
                name="discription"
                value={formik.values.discription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.discription && formik.errors.discription ? (
                <div className="formik-errors text-danger ">{formik.errors.discription}</div>
              ) : null}
            </div>
            <div className="col-12 mt-4">
              {loader ? (
                <button class="btn btn-primary w-100" type="button" disabled>
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Saving...
                </button>
              ) : (
                <button type="submit" className="btn btn-primary w-100 ">
                  {params.id ? "Update & Continue" : "Save & Continue"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AddProduct;
