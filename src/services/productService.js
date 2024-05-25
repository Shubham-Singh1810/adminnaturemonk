import axios from "axios";
const API_BASE_URL = "https://servernaturemonk.vercel.app/";
// const API_BASE_URL = "http://localhost:5000/";
const token = localStorage.getItem("token") ? localStorage.getItem("token")  : "no-token";
const config = {
  headers: {
    content: "multipart/form-data",
    Authorization: "Bearer " + token,
  },
};
export default class productService {
  async getProductList(payload) {
    try {
      let response = await axios.post(API_BASE_URL + "product/getProducts", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async create(payload) {
    try {
      let response = await axios.post(API_BASE_URL + "product/create", payload);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async getProduct(id) {
    try {
      let response = await axios.get(API_BASE_URL + "product/getProduct/" + id, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async update(payload) {
    try {
      let response = await axios.put(API_BASE_URL + "product/update", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateProductGallery(payload) {
    try {
      let response = await axios.put(API_BASE_URL + "product/updateProductGallery", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deletePicInGallery(payload) {
    try {
      let response = await axios.put(API_BASE_URL + "product/deletePicInGallery", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async updateProductVideo(payload) {
    try {
      let response = await axios.put(API_BASE_URL + "product/updateProductVideo", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async deleteVideoInGallery(payload) {
    try {
      let response = await axios.put(API_BASE_URL + "product/deleteVideoInGallery", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      let response = await axios.delete(API_BASE_URL + "product/" + id, config);
      return response;
    } catch (error) {
      throw error;
    }
  } 
}
