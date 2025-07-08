import { useQuery } from '@tanstack/react-query';
import {
	getDocumentsByCompany,
} from '../services/get-documents-by-company';
import { Document } from '@/types/document';

/**
 * React Query hook to fetch documents for a specific company
 * @param companyId - The ID of the company to fetch documents for
 * @returns Query result containing documents data, loading state, and error
 */
export const useDocumentsByCompany = (companyId: string) => {
	return useQuery<Document[]>({
		queryKey: ['documents', companyId],
		queryFn: () => getDocumentsByCompany(companyId),
		enabled: !!companyId,
		staleTime: 5 * 60 * 1000,
	});
};
