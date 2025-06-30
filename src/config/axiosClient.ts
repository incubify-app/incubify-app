import axios from 'axios';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
	headers: {
		Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImMwMDE4ZTU2LWRiYjgtNGM5Zi1hNjE4LTBmNjRkMTJlNDRmMiIsImVtYWlsIjoidGVzdGVAZ21haWwuY29tIn0.MwL6DmTkNz5J4qY5PwUygzl_VWoqDzYdQ3kBdeHwr5g`
	}
});

export default axiosClient;
