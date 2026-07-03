import api from '.';

export const fetchProducts = (params = {}) => api.get('products', { params });
export const fetchCategories = () => api.get('categories');
export const fetchBrands = () => api.get('brands');
export const fetchCart = () => api.get('cart');
export const checkoutCart = (payload) => api.post('checkout', payload);
export const fetchAdminOverview = () => api.get('admin/overview');
export const fetchAdminSalesReport = (payload) => api.post('admin/reports/sales', payload);
