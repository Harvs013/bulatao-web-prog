// src/services/ArticleService.js
import axios from 'axios';
import constants from '../constant';

const API = axios.create({
  baseURL: `${constants.HOST}/api/articles`,
});

export const fetchArticles = () => API.get('/');
export const createArticle = (article) => API.post('/', article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);