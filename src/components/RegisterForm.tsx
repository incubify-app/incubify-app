import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterData } from '@/types/auth';
import { Card, CardContent } from '@/components/ui/card';
import { SubmitHandler } from 'react-hook-form';
import { RegisterFormValues } from '@/schemas/register-schema';
import { useRegisterForm } from '@/hooks/use-register-form';
import { useState } from 'react';
import { Stepper } from '@/components/ui/stepper';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export function RegisterForm() {
	const { register: registerUser } = useAuth();
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);

	const steps = [
		{ title: 'Informações Básicas', description: 'Dados da empresa e contato' },
		{ title: 'Informações da Empresa', description: 'Perfil e equipe' },
		{ title: 'Informações do Projeto', description: 'Detalhes da proposta' },
	];

	const form = useRegisterForm();
	const { formState } = form;
	const { isSubmitting } = formState;

	const handleStepChange = (step: number) => {
		if (step > currentStep) {
			const fieldsToValidate = getFieldsForStep(currentStep);
			form.trigger(fieldsToValidate).then(isValid => {
				if (isValid) {
					setCurrentStep(step);
				}
			});
		} else {
			setCurrentStep(step);
		}
	};

	const getFieldsForStep = (step: number): (keyof RegisterFormValues)[] => {
		switch (step) {
			case 0:
				return [
					'name',
					'contactName',
					'address',
					'identification',
					'identificationType',
					'login',
					'password',
					'email',
				];
			case 1:
				return ['entrepreneursProfile', 'teamDetails', 'market'];
			case 2:
				return ['proposalCharacterization', 'financialPlan', 'needs'];
			default:
				return [];
		}
	};

	const onSubmit: SubmitHandler<RegisterFormValues> = async data => {
		try {
			const registerData: RegisterData = {
				name: data.name,
				contactName: data.contactName,
				address: data.address,
				phone: data.phone || '',
				identification: data.identification,
				identificationType: data.identificationType,
				role: data.role,
				login: data.login,
				password: data.password,
				email: data.email,
				entrepreneursProfile: data.entrepreneursProfile,
				proposalCharacterization: data.proposalCharacterization,
				financialPlan: data.financialPlan,
				market: data.market,
				needs: data.needs,
				teamDetails: data.teamDetails,
			};

			const success = await registerUser(registerData);
			if (success) {
				navigate('/dashboard');
			}
		} catch (error) {
			console.error('Registration error:', error);
		}
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 0:
				return (
					<Card>
						<CardContent className='pt-6'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome da Empresa</FormLabel>
											<FormControl>
												<Input placeholder='Nome da empresa' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='contactName'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome do Contato</FormLabel>
											<FormControl>
												<Input placeholder='Nome completo do contato' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='login'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Login</FormLabel>
											<FormControl>
												<Input placeholder='Nome de usuário para login' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='password'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Senha</FormLabel>
											<FormControl>
												<Input type='password' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type='email' placeholder='exemplo@email.com' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Telefone</FormLabel>
											<FormControl>
												<Input placeholder='(xx) xxxxx-xxxx' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='space-y-2 w-full mt-4'>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Endereço</FormLabel>
											<FormControl>
												<Input placeholder='Endereço completo' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className='mt-4 space-y-2'>
								<FormLabel>Tipo de Identificação</FormLabel>
								<div className='flex space-x-4'>
									<div className='w-1/4'>
										<FormField
											control={form.control}
											name='identificationType'
											render={({ field }) => (
												<FormItem>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder='Selecione o tipo' />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															<SelectItem value='pj'>CNPJ (Pessoa Jurídica)</SelectItem>
															<SelectItem value='pf'>CPF (Pessoa Física)</SelectItem>
														</SelectContent>
													</Select>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<div className='w-3/4'>
										<FormField
											control={form.control}
											name='identification'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															placeholder={
																form.watch('identificationType') === 'pj' ? 'CNPJ' : 'CPF'
															}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			case 1:
				return (
					<Card>
						<CardContent className='pt-6'>
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='entrepreneursProfile'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Perfil dos Empreendedores</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descreva o perfil dos empreendedores'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='teamDetails'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Detalhes da Equipe</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descreva os membros da equipe e suas funções'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='market'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Análise de Mercado</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descreva a análise de mercado'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				);
			case 2:
				return (
					<Card>
						<CardContent className='pt-6'>
							<div className='space-y-4'>
								<FormField
									control={form.control}
									name='proposalCharacterization'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Caracterização da Proposta</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descreva a proposta do seu projeto'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='financialPlan'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Plano Financeiro</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descreva o plano financeiro'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='needs'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Necessidades</FormLabel>
											<FormControl>
												<Textarea
													placeholder='Descreva as necessidades do seu projeto'
													className='min-h-[100px]'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				);
			default:
				return null;
		}
	};

	return (
		<div className='mx-auto max-w-4xl space-y-4'>
			<div className='space-y-2 text-center'>
				<p className='text-gray-500 dark:text-gray-400'>Crie sua conta para acessar a plataforma</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
					<Stepper steps={steps} currentStep={currentStep} />

					<div className='mt-8'>{renderStepContent()}</div>

					<div className='flex justify-between mt-6'>
						<Button
							type='button'
							variant='outline'
							onClick={() => handleStepChange(currentStep - 1)}
							disabled={currentStep === 0}
						>
							Anterior
						</Button>

						{currentStep < steps.length - 1 ? (
							<Button type='button' onClick={() => handleStepChange(currentStep + 1)}>
								Próximo
							</Button>
						) : (
							<Button type='submit' disabled={isSubmitting}>
								{isSubmitting ? 'Registrando...' : 'Registrar'}
							</Button>
						)}
					</div>
				</form>
			</Form>

			<div className='mt-4 text-center text-sm'>
				Já tem uma conta?{' '}
				<Link className='text-primary underline-offset-4 hover:underline' to='/login'>
					Entrar
				</Link>
			</div>
		</div>
	);
}
