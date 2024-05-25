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
export default class notificationService {
  async getNotificationList(payload) {
    try {
      let response = await axios.get(API_BASE_URL + "notification/getNotification", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
  async delete(id) {
    try {
      let response = await axios.delete(API_BASE_URL + "notification/" + id, config);
      return response;
    } catch (error) {
      throw error;
    }
  } 
  async update(payload) {
    try {
      let response = await axios.put(API_BASE_URL + "notification/update", payload, config);
      return response;
    } catch (error) {
      throw error;
    }
  }
}
