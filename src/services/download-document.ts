import axiosClient from '../config/axiosClient';
import { Document } from '../types/document';

/**
 * Downloads a document
 * @param documentId - The ID of the document to download
 * @returns Promise with document info and content as blob
 */
export interface DocumentDownloadResponse {
	blob: Blob;
	document: Document;
}

export const downloadDocument = async (documentId: string): Promise<DocumentDownloadResponse> => {
	try {
		// First get document metadata
		const documentResponse = await axiosClient.get<Document>(`/documents/${documentId}`);

		// Then get document content
		const contentResponse = await axiosClient.get(`/documents/${documentId}/download`, {
			responseType: 'blob',
		});

		return {
			blob: contentResponse.data,
			document: documentResponse.data,
		};
	} catch (error) {
		console.error('Error downloading document:', error);
		throw error;
	}
};
