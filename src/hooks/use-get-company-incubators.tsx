import { useQuery } from '@tanstack/react-query';
import { Incubator } from '@/types/incubator';
import { getCompanyIncubator } from '@/services/get-company-incubators';

export function useGetCompanyIncubators(companyId: string) {
	return useQuery<Incubator[]>({
		queryKey: ['companyIncubators', companyId],
		queryFn: () => getCompanyIncubator(companyId),
		enabled: !!companyId,
	});
}
