import axios from 'axios';
import Cookies from 'js-cookie';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

axiosClient.interceptors.request.use(
	config => {
		const token = Cookies.get('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

export default axiosClient;
