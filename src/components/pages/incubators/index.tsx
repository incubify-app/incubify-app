import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetIncubators } from '@/hooks/use-get-incubators';
import { IncubatorCompanies } from './components/incubator-companies';

export function Incubators() {
	const { user } = useAuth();
	const { data, isLoading } = useGetIncubators({ enabled: true });
	console.log(data);

	return (
		<div className='space-y-8'>
			{/* Company Profile Section */}
			{user && user.role === 'startup' && (
				<div className='space-y-6'>
					<div>
						<h2 className='text-3xl font-bold tracking-tight'>Perfil da Empresa</h2>
						<p className='text-muted-foreground'>Informações detalhadas sobre sua empresa</p>
					</div>

					<Card>
						<CardHeader>
							<CardTitle>{user.name}</CardTitle>
							<CardDescription>
								<Badge variant={user.role === 'startup' ? 'default' : 'outline'}>
									{user.role === 'startup' ? 'Startup' : 'Gerenciamento'}
								</Badge>
							</CardDescription>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue='basic-info' className='w-full'>
								<TabsList>
									<TabsTrigger value='basic-info'>Informações Básicas</TabsTrigger>
									<TabsTrigger value='company-info'>Detalhes da Empresa</TabsTrigger>
									<TabsTrigger value='project-info'>Projeto</TabsTrigger>
								</TabsList>

								<TabsContent value='basic-info' className='space-y-4 mt-4'>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
										<div>
											<h3 className='text-sm font-medium text-muted-foreground'>Contato</h3>
											<p className='text-base'>{user.contactName}</p>
										</div>
										<div>
											<h3 className='text-sm font-medium text-muted-foreground'>Email</h3>
											<p className='text-base'>{user.email}</p>
										</div>
										<div>
											<h3 className='text-sm font-medium text-muted-foreground'>Telefone</h3>
											<p className='text-base'>{user.phone || 'Não informado'}</p>
										</div>
										<div>
											<h3 className='text-sm font-medium text-muted-foreground'>Identificação</h3>
											<p className='text-base'>
												{user.identificationType === 'pj' ? 'CNPJ: ' : 'CPF: '}
												{user.identification}
											</p>
										</div>
										<div>
											<h3 className='text-sm font-medium text-muted-foreground'>Endereço</h3>
											<p className='text-base'>{user.address}</p>
										</div>
										<div>
											<h3 className='text-sm font-medium text-muted-foreground'>
												Data de Registro
											</h3>
											<p className='text-base'>{new Date(user.createdAt).toLocaleDateString()}</p>
										</div>
									</div>
								</TabsContent>

								<TabsContent value='company-info' className='space-y-4 mt-4'>
									<div>
										<h3 className='text-sm font-medium text-muted-foreground'>
											Perfil dos Empreendedores
										</h3>
										<p className='mt-1 text-sm'>{user.entrepreneursProfile}</p>
									</div>
									<div>
										<h3 className='text-sm font-medium text-muted-foreground'>
											Detalhes da Equipe
										</h3>
										<p className='mt-1 text-sm'>{user.teamDetails}</p>
									</div>
									<div>
										<h3 className='text-sm font-medium text-muted-foreground'>
											Análise de Mercado
										</h3>
										<p className='mt-1 text-sm'>{user.market}</p>
									</div>
								</TabsContent>

								<TabsContent value='project-info' className='space-y-4 mt-4'>
									<div>
										<h3 className='text-sm font-medium text-muted-foreground'>
											Caracterização da Proposta
										</h3>
										<p className='mt-1 text-sm'>{user.proposalCharacterization}</p>
									</div>
									<div>
										<h3 className='text-sm font-medium text-muted-foreground'>Plano Financeiro</h3>
										<p className='mt-1 text-sm'>{user.financialPlan}</p>
									</div>
									<div>
										<h3 className='text-sm font-medium text-muted-foreground'>Necessidades</h3>
										<p className='mt-1 text-sm'>{user.needs}</p>
									</div>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			)}

			{/* Incubadoras Section */}
			<div className='space-y-6'>
				<div>
					<h2 className='text-3xl font-bold tracking-tight'>Incubadoras de Startups</h2>
					<p className='text-muted-foreground'>
						Conheça as principais incubadoras e suas startups em desenvolvimento.
					</p>
				</div>

				<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
					{isLoading && !data ? (
						<div className='col-span-3 text-center text-muted-foreground'>Carregando...</div>
					) : (
						data?.map(incubadora => (
							<Card key={incubadora.id} className='overflow-hidden'>
								<div className='h-32 bg-muted flex items-center justify-center p-4'>
									{/* <img
									src={incubadora.logo}
									alt={`${incubadora.name} logo`}
									className='h-full object-cover rounded-md'
								/> */}
								</div>
								<CardHeader className='pb-2'>
									<div className='flex items-start justify-between'>
										<CardTitle>{incubadora.name}</CardTitle>
									</div>
								</CardHeader>
								<CardContent>
									<div className='grid gap-2'>
										<div className='flex items-center justify-between text-sm'>
											<span className='text-muted-foreground'>Criada em:</span>
											<span>
												{new Date(incubadora.created_at).toLocaleDateString('pt-BR', {
													weekday: 'short',
													year: 'numeric',
													month: 'long',
													day: 'numeric',
													hour: '2-digit',
													minute: '2-digit',
												})}
											</span>
										</div>
										<div className='text-sm'>
											<p className='text-muted-foreground mb-1'>Empresas incubadas:</p>
											<div className='grid grid-cols-1 gap-1.5 mt-1'>
												<IncubatorCompanies incubatorId={incubadora.id} />
											</div>
										</div>
										<div className='mt-4'>
											<button className='w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors'>
												Ver detalhes
											</button>
										</div>
									</div>
								</CardContent>
							</Card>
						))
					)}
				</div>
			</div>
		</div>
	);
}
