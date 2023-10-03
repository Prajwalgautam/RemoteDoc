import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });
export const getMessages =(id)=> API.get(`/api/v1/message/${id}`)
export const addMessage =(data)=> API.post(`/api/v1/message`, data)


