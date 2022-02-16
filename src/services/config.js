import axios from 'axios';

export const http = axios.create({
    //baseURL: 'https://todo-api-joao.herokuapp.com/'
    baseURL: 'https://teste-app-finance.herokuapp.com/'
});