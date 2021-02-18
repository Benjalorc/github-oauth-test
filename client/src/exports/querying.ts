import axios from 'axios';

const token = localStorage.getItem("token");
const headers = {
  Authorization: (token ? `Bearer ${token}` : undefined),
}

const instance = axios.create({
  headers: JSON.parse(JSON.stringify(headers))
});

export default instance;