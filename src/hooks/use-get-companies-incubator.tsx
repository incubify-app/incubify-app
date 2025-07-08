import { getAllCompaniesByIncubatorId } from '@/services/get-companies-by-incubator';
import { Incubator } from '@/types/incubator';
import { useQuery } from '@tanstack/react-query';

export function useGetCompaniesIncubator({
	incubatorId,
	enabled,
}: {
	incubatorId: Incubator['id'];
	enabled?: boolean;
}) {
	const { data, error, isLoading } = useQuery({
		queryKey: ['companies', incubatorId],
		queryFn: async () => getAllCompaniesByIncubatorId(incubatorId),
		refetchOnMount: false,
		refetchInterval: 1000 * 60 * 2, // 2 minute
		staleTime: 1000 * 60 * 2, // 2 minutes
		retry: 2,
		enabled: enabled ?? true,
	});

	const companiesMap = new Map(data?.map(company => [company.id, company]) || []);

	return {
		data,
		map: companiesMap,
		error,
		isLoading,
	};
}
