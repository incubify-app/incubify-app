import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(1, 'Nome da empresa é obrigatório'),
	contact_name: z.string().min(1, 'Nome do contato é obrigatório'),
	address: z.string().min(1, 'Endereço é obrigatório'),
	phone: z.string().optional().default(''),
	identification: z.string().min(1, 'CPF/CNPJ é obrigatório'),
	identification_type: z.enum(['pf', 'pj'] as const).default('pj'),
	role: z.enum(['startup', 'management'] as const).default('startup'),
	login: z.string().min(1, 'Login é obrigatório'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
	email: z.string().email('Email inválido'),
	entrepreneurs_profile: z.string().min(1, 'Perfil dos empreendedores é obrigatório'),
	proposal_characterization: z.string().min(1, 'Caracterização da proposta é obrigatória'),
	financial_plan: z.string().min(1, 'Plano financeiro é obrigatório'),
	market: z.string().min(1, 'Análise de mercado é obrigatória'),
	needs: z.string().min(1, 'Necessidades do projeto são obrigatórias'),
	team_details: z.string().min(1, 'Detalhes da equipe são obrigatórios'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
