import axios from 'axios';
const corsAnyWhere: string = 'https://cors-anywhere.herokuapp.com/';

const api = axios.create({
    baseURL: corsAnyWhere + 'http://5c4b2a47aa8ee500142b4887.mockapi.io/api/v1/dragon'
});

export default api;