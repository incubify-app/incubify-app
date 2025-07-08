import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteDocument } from '../services/delete-document';

/**
 * React Query hook to delete a document
 * @returns Mutation object for deleting a document
 */
export const useDeleteDocument = (companyId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (documentId: string) => deleteDocument(documentId),
		onSuccess: () => {
			// Invalidate and refetch the documents query
			queryClient.invalidateQueries({ queryKey: ['documents', companyId] });
		},
	});
};
