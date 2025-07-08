import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadDocument } from '../services/upload-document';

/**
 * React Query hook to upload a document for a company
 * @returns Mutation object for uploading a document
 */
export interface UploadDocumentParams {
	file: File;
	name: string;
	content: string;
	mime_type: string;
	size: number;
}

export const useUploadDocument = (companyId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (params: UploadDocumentParams) => uploadDocument(companyId, params),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['documents', companyId] });
		},
	});
};
