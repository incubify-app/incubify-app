import { getAllCompanies } from '@/services/get-all-companies';
import { getAllCompaniesByIncubatorId } from '@/services/get-companies-by-incubator';
import { useQuery } from '@tanstack/react-query';

export function useGetCompanies({ incubatorId }: { incubatorId?: string }) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['companies', incubatorId],
		queryFn: async () => {
			switch (incubatorId) {
				case undefined:
					return getAllCompanies();
				default:
					return getAllCompaniesByIncubatorId(incubatorId);
			}
		},
		refetchOnMount: false,
	});

	return {
		data,
		error,
		isLoading,
	};
}
