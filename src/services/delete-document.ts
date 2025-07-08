import axiosClient from '../config/axiosClient';

/**
 * Deletes a document
 * @param documentId - The ID of the document to delete
 * @returns Promise indicating success
 */
export const deleteDocument = async (documentId: string): Promise<void> => {
	try {
		await axiosClient.delete(`/documents/${documentId}`);
	} catch (error) {
		console.error('Error deleting document:', error);
		throw error;
	}
};
