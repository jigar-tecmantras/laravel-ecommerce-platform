import api from '.';

export const loginRequest = (credentials) => api.post('auth/login', credentials);
export const registerRequest = (payload) => api.post('auth/register', payload);
export const logoutRequest = () => api.post('auth/logout');
