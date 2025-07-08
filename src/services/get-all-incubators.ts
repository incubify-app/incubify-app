import { axiosClient } from '@/config';
import { Incubator } from '@/types/incubator';

export async function getAllIncubators(): Promise<Incubator[]> {
	try {
		const response = await axiosClient.get<Incubator[]>('incubators');
		return response.data;
	} catch (error) {
		console.error('Error fetching incubators:', error);
		throw error;
	}
}
