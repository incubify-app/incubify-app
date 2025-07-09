import axiosClient from '../config/axiosClient';
import { Document } from '../types/document';

/**
 * Fetches documents
 * @returns Promise containing the documents data
 */
export const getDocuments = async (): Promise<Document[]> => {
	try {
		const response = await axiosClient.get<Document[]>(`documents`);
		return response.data;
	} catch (error) {
		console.error('Error fetching documents for company:', error);
		throw error;
	}
};
