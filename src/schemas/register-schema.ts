import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(1, 'Nome da empresa é obrigatório'),
	contactName: z.string().min(1, 'Nome do contato é obrigatório'),
	address: z.string().min(1, 'Endereço é obrigatório'),
	phone: z.string().optional().default(''),
	identification: z.string().min(1, 'CPF/CNPJ é obrigatório'),
	identificationType: z.enum(['pf', 'pj'] as const).default('pj'),
	role: z.enum(['startup', 'management'] as const).default('startup'),
	login: z.string().min(1, 'Login é obrigatório'),
	password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
	email: z.string().email('Email inválido'),
	entrepreneursProfile: z.string().min(1, 'Perfil dos empreendedores é obrigatório'),
	proposalCharacterization: z.string().min(1, 'Caracterização da proposta é obrigatória'),
	financialPlan: z.string().min(1, 'Plano financeiro é obrigatório'),
	market: z.string().min(1, 'Análise de mercado é obrigatória'),
	needs: z.string().min(1, 'Necessidades do projeto são obrigatórias'),
	teamDetails: z.string().min(1, 'Detalhes da equipe são obrigatórios'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
