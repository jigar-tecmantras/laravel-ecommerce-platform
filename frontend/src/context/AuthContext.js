import { createContext, useEffect, useMemo, useState } from 'react';
import { clearAuthToken, setAuthToken } from '../api';
import { loginRequest, logoutRequest, registerRequest } from '../api/auth';

const STORAGE_TOKEN = 'ecom_token';
const STORAGE_USER = 'ecom_user';

export const AuthContext = createContext(null);

const loadUser = () => {
  try {
    const stored = localStorage.getItem(STORAGE_USER);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Unable to parse stored user', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_TOKEN));
  const [user, setUser] = useState(() => loadUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem(STORAGE_TOKEN, token);
    } else {
      clearAuthToken();
      localStorage.removeItem(STORAGE_TOKEN);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_USER);
    }
  }, [user]);

  const login = async (credentials) => {
    setLoading(true);

    try {
      const response = await loginRequest(credentials);
      const { customer, token: responseToken } = response.data;
      setUser(customer);
      setToken(responseToken);
      return customer;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);

    try {
      const response = await registerRequest(payload);
      const { customer, token: responseToken } = response.data;
      setUser(customer);
      setToken(responseToken);
      return customer;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await logoutRequest();
    } catch (error) {
      console.warn('Logout failed, clearing local session anyway.', error);
    } finally {
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
