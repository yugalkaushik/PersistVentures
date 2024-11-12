import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api/admin/dashboard', // Use the local proxy endpoint
});

export const fetchDashboardData = async () => {
  const response = await apiClient.get('/');
  return response.data.dashboard;
};
