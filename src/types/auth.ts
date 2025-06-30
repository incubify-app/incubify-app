import { Company } from './company';

export type User = Company;

export type RegisterData = Omit<Company, 'id' | 'createdAt'>