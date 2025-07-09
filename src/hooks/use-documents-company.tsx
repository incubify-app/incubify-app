import { useQuery } from '@tanstack/react-query';
import { getDocuments } from '../services/get-documents';
import { Document } from '@/types/document';

/**
 * React Query hook to fetch documents
 * @returns Query result containing documents data, loading state, and error
 */
export const useDocumentsByCompany = () => {
	return useQuery<Document[]>({
		queryKey: ['documents'],
		queryFn: () => getDocuments(),
		staleTime: 5 * 60 * 1000,
	});
};
