export type IdentificationType = 'pf' | 'pj';
export type CompanyRole = 'startup' | 'management';

export interface User {
	id: string; // Now using UUID
	name: string;
	contactName: string;
	address: string;
	phone?: string;
	identification: string;
	identificationType: IdentificationType;
	role: CompanyRole;
	login: string;
	email: string;
	avatar: string;
	entrepreneursProfile: string;
	proposalCharacterization: string;
	financialPlan: string;
	market: string;
	needs: string;
	teamDetails: string;
	createdAt: string;
}

export interface RegisterData {
	name: string; // Company name
	contactName: string;
	address: string;
	phone?: string;
	identification: string;
	identificationType: IdentificationType;
	role: CompanyRole;
	login: string;
	password: string;
	email: string;
	entrepreneursProfile: string;
	proposalCharacterization: string;
	financialPlan: string;
	market: string;
	needs: string;
	teamDetails: string;
}
