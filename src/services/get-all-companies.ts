import { axiosClient } from '@/config';
import { Company } from '@/types/company';

export async function getAllCompanies(): Promise<Company[]> {
	try {
		const response = await axiosClient.get<Company[]>('companies');
		return response.data;
	} catch (error) {
		console.error('Error fetching companies:', error);
		throw error;
	}
}
