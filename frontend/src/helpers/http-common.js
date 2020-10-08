import axios from "axios";

//Define a URL base da origem para consumo do servico
export default axios.create({
  //baseURL: "https://ad2019api.herokuapp.com/pessoas",
  baseURL: "http://localhost:8000/pessoas",
  headers: {
    "Content-type": "application/json",
  },
});