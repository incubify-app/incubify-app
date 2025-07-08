import axiosClient from '@/config/axiosClient';
import { Incubator } from '@/types/incubator';

export async function getCompanyIncubator(companyId: string): Promise<Incubator[]> {
	try {
		const response = await axiosClient.get<Incubator[]>(
			`/incubators/company/${companyId}/my-incubator`
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching company incubators:', error);
		throw error;
	}
}
