import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "https://localhost:44325/api",
});

export default clienteAxios;
