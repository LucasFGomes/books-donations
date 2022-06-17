import axios from 'axios';

const api = axios.create({
  baseURL: "https://books-donations-api.herokuapp.com"
});

export default api;