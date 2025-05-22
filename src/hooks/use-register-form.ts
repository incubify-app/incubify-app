import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormValues } from '@/schemas/register-schema';

export const useRegisterForm = () => {
	const form = useForm<RegisterFormValues>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: '',
			contactName: '',
			address: '',
			phone: '',
			identification: '',
			identificationType: 'pj',
			role: 'startup',
			login: '',
			password: '',
			email: '',
			entrepreneursProfile: '',
			proposalCharacterization: '',
			financialPlan: '',
			market: '',
			needs: '',
			teamDetails: '',
		},
		mode: 'onBlur',
	});

	return form;
};
