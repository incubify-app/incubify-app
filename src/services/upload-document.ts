import axiosClient from '../config/axiosClient';
import { Document } from '../types/document';

interface UploadDocumentParams {
	file: File;
	name: string;
	content: string;
	mime_type: string;
	size: number;
}

/**
 * Uploads a document for a specific company
 * @param companyId - The ID of the company to upload the document for
 * @param params - Object containing file and name
 * @returns Promise containing the uploaded document data
 */
export const uploadDocument = async (
	companyId: string,
	params: UploadDocumentParams
): Promise<Document> => {
	try {
		const formData = new FormData();
		formData.append('file', params.file);
		formData.append('name', params.name);
		formData.append('content', params.content);
		formData.append('mime_type', params.mime_type);
		formData.append('size', params.size.toString());
		formData.append('company_id', companyId);

		const response = await axiosClient.post<Document>(`/documents`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data;
	} catch (error) {
		console.error('Error uploading document:', error);
		throw error;
	}
};
