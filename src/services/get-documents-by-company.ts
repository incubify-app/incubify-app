import axiosClient from '../config/axiosClient';
import { Document } from '../types/document';

/**
 * Fetches documents for a specific company
 * @param companyId - The ID of the company to fetch documents for
 * @returns Promise containing the documents data
 */
export const getDocumentsByCompany = async (companyId: string): Promise<Document[]> => {
	try {
		const response = await axiosClient.get<Document[]>(`documents/company/${companyId}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching documents for company:', error);
		throw error;
	}
};
