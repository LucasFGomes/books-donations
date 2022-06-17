import axios from "axios";

const book = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes",
});

export default book;
