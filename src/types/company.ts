export type IdentificationType = 'pf' | 'pj';
export type CompanyRole = 'startup' | 'management';

export interface Company {
	id: string;
	name: string;
	contactName: string;
	address: string;
	phone?: string;
	identification: string;
	identificationType: IdentificationType;
	role: CompanyRole;
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
