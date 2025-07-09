import { getAllIncubators } from '@/services/get-all-incubators';
import { useQuery } from '@tanstack/react-query';

export function useGetIncubators() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['incubators'],
		queryFn: async () => {
			return getAllIncubators();
		},
		refetchInterval: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,
		refetchOnMount: false,
		retry: 2,
		retryDelay: 1000,
		staleTime: 1000 * 60 * 60 * 24,
	});

	const incubatorsMap = new Map(data?.map(incubator => [incubator.id, incubator]) || []);

	return {
		data,
		map: incubatorsMap,
		error,
		isLoading,
	};
}
