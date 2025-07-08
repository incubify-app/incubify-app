import { Company } from './company';

export interface User extends Company {
	login: string;
}

export type RegisterData = Omit<Company, 'id' | 'createdAt'> & {
	login: string;
};
