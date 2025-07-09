export enum IdentificationType {
	PF = 'pf',
	PJ = 'pj',
}

export enum CompanyRole {
	STARTUP = 'startup',
	MANAGEMENT = 'management',
}

export interface Company {
	id: string;
	name: string;
	contact_name: string;
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
