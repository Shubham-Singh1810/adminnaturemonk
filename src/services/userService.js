import axios from "axios"
const API_BASE_URL = "https://servernaturemonk.vercel.app/";
// const API_BASE_URL = "http://localhost:5000/";
export default class userService {
  async login(payload){
    try {
        let response = await axios.post(API_BASE_URL+"user/login", payload)
        return response
    } catch (error) {
        throw error
    }
  }
  async getMegaResult(payload){
    try {
        let response = await axios.get(API_BASE_URL+"user/getMegaResult", payload)
        return response
    } catch (error) {
        throw error
    }
  }
  async getUserList(){
    try {
        let response = await axios.get(API_BASE_URL+"user/getUsers")
        return response
    } catch (error) {
        throw error
    }
  }
//   async getUser(id){
//     try {
//         let response = await axios.get(API_BASE_URL+"user/getUser/"+id)
//         return response
//     } catch (error) {
//         throw error
//     }
//   }
//    async updateUser(payload){
//     try {
//         let response = await axios.put(API_BASE_URL+"user/updateStatus", payload)
//         return response
//     } catch (error) {
//         throw error
//     }
//   }
}

 