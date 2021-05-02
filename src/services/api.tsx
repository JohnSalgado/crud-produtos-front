import axios from 'axios';

const api = axios.create({
  baseURL: 'https://john-crud-produtos.herokuapp.com',
});

export default api;
