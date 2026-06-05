// src/utils/auth.js
export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('type');
export const getFirstName = () => localStorage.getItem('firstName');

export const isLoggedIn = () => Boolean(getToken());

export const isAdmin = () => getRole() === 'admin';
export const isEditor = () => getRole() === 'editor';
export const isViewer = () => getRole() === 'viewer';

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('type');
  localStorage.removeItem('firstName');
};