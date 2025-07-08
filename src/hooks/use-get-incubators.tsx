import { useAuth } from '@/context/AuthContext';
import { getAllIncubators } from '@/services/get-all-incubators';
import { getCompanyIncubator } from '@/services/get-company-incubators';
import { CompanyRole } from '@/types/company';
import { useQuery } from '@tanstack/react-query';

export function useGetIncubators() {
	const {
		user: { id, role },
	} = useAuth();
	const { data, error, isLoading } = useQuery({
		queryKey: ['incubators'],
		queryFn: async () => {
			if (role === CompanyRole.MANAGEMENT) {
				return getAllIncubators();
			}

			return getCompanyIncubator(id);
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
