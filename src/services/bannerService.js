import axios from "axios";
// const API_BASE_URL = "https://naturemonkbackend.onrender.com/";
const API_BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token") ? localStorage.getItem("token")  : "no-token";
const config = {
  headers: {
    content: "multipart/form-data",
    Authorization: "Bearer " + token,
  },
};
export default class productService {
  async getBannerList(payload) {
    try {
      let response = await axios.post(API_BASE_URL + "banner/getBanners", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async create(payload) {
    try {
      let response = await axios.post(API_BASE_URL + "banner/create", payload);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      let response = await axios.delete(API_BASE_URL + "banner/" + id, config);
      return response;
    } catch (error) {
      throw error;
    }
  } 
}
