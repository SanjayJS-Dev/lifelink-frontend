import axios from "axios";

const API_URL = "https://lifelinkapi.azurewebsites.net"

const apiService = axios.create({
    baseURL: API_URL
})

export default apiService;