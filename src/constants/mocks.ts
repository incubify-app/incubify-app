// Definição dos tipos de dados para o Kanban
export interface EmpresaIncubada {
	id: string;
	nome: string;
	descricao: string;
	responsavel: string;
	data: string;
	logo?: string;
	incubadoraId: string; // Referência à incubadora
	stepId: string; // Step atual da empresa
}

export interface Incubadora {
	id: string;
	nome: string;
	descricao: string;
	logo?: string;
}

export interface KanbanStep {
	id: string;
	titulo: string;
	color: string;
	canMoveBack: boolean; // Indica se empresas podem voltar para o step anterior
}

// Steps globais do processo de incubação
export const kanbanSteps: KanbanStep[] = [
	{
		id: 'entrada',
		titulo: 'Entrada',
		color: '#2196f3',
		canMoveBack: false, // Primeiro step, não pode voltar
	},
	{
		id: 'step1',
		titulo: 'Análise Inicial',
		color: '#03a9f4',
		canMoveBack: true,
	},
	{
		id: 'step2',
		titulo: 'Desenvolvimento',
		color: '#00bcd4',
		canMoveBack: true,
	},
	{
		id: 'step3',
		titulo: 'Validação',
		color: '#0288d1',
		canMoveBack: true,
	},
	{
		id: 'step4',
		titulo: 'Aceleração',
		color: '#4fc3f7',
		canMoveBack: true,
	},
	{
		id: 'step5',
		titulo: 'Graduação',
		color: '#81d4fa',
		canMoveBack: true,
	},
	{
		id: 'recusado',
		titulo: 'Recusado',
		color: '#f44336',
		canMoveBack: false, // Último step, não pode voltar
	},
];

// Definição das incubadoras
export const incubadoras: Incubadora[] = [
	{
		id: 'inc1',
		nome: 'TechHub',
		descricao: 'Incubadora focada em tecnologias digitais',
		logo: 'https://i.pravatar.cc/150?img=30',
	},
	{
		id: 'inc2',
		nome: 'BioNova',
		descricao: 'Especializada em biotecnologia e saúde',
		logo: 'https://i.pravatar.cc/150?img=31',
	},
	{
		id: 'inc3',
		nome: 'GreenStart',
		descricao: 'Incubadora para soluções sustentáveis',
		logo: 'https://i.pravatar.cc/150?img=32',
	},
	{
		id: 'inc4',
		nome: 'FinCubator',
		descricao: 'Focada em fintechs e soluções financeiras',
		logo: 'https://i.pravatar.cc/150?img=33',
	},
	{
		id: 'inc5',
		nome: 'EduInova',
		descricao: 'Incubadora de startups educacionais',
		logo: 'https://i.pravatar.cc/150?img=34',
	},
];

// Empresas incubadas (5 por incubadora, em diferentes steps)
export const empresasIncubadas: EmpresaIncubada[] = [
	// TechHub - inc1
	{
		id: 'emp1',
		nome: 'InnovaTech',
		descricao: 'Plataforma de automação para pequenas empresas',
		responsavel: 'Ana Silva',
		data: '2025-04-15',
		logo: 'https://i.pravatar.cc/150?img=10',
		incubadoraId: 'inc1',
		stepId: 'entrada',
	},
	{
		id: 'emp2',
		nome: 'DataInsights',
		descricao: 'Análise de dados para decisões estratégicas',
		responsavel: 'Roberto Alves',
		data: '2025-04-10',
		logo: 'https://i.pravatar.cc/150?img=13',
		incubadoraId: 'inc1',
		stepId: 'step2',
	},
	{
		id: 'emp3',
		nome: 'CloudSecure',
		descricao: 'Segurança para ambientes em nuvem',
		responsavel: 'Rafael Torres',
		data: '2025-03-25',
		logo: 'https://i.pravatar.cc/150?img=19',
		incubadoraId: 'inc1',
		stepId: 'step4',
	},
	{
		id: 'emp4',
		nome: 'AIVision',
		descricao: 'Soluções de visão computacional',
		responsavel: 'Carla Mendes',
		data: '2025-03-18',
		logo: 'https://i.pravatar.cc/150?img=23',
		incubadoraId: 'inc1',
		stepId: 'step3',
	},
	{
		id: 'emp5',
		nome: 'VRExperience',
		descricao: 'Experiências em realidade virtual',
		responsavel: 'Gustavo Soares',
		data: '2025-03-10',
		logo: 'https://i.pravatar.cc/150?img=21',
		incubadoraId: 'inc1',
		stepId: 'recusado',
	},
	
	// BioNova - inc2
	{
		id: 'emp6',
		nome: 'HealthConnect',
		descricao: 'Aplicativo de telemedicina para áreas rurais',
		responsavel: 'Marina Costa',
		data: '2025-04-20',
		logo: 'https://i.pravatar.cc/150?img=12',
		incubadoraId: 'inc2',
		stepId: 'step1',
	},
	{
		id: 'emp7',
		nome: 'BioScan',
		descricao: 'Diagnósticos por imagem com IA',
		responsavel: 'Lucas Ferreira',
		data: '2025-04-02',
		logo: 'https://i.pravatar.cc/150?img=24',
		incubadoraId: 'inc2',
		stepId: 'step3',
	},
	{
		id: 'emp8',
		nome: 'MedTech',
		descricao: 'Dispositivos médicos conectados',
		responsavel: 'Juliana Santos',
		data: '2025-03-29',
		logo: 'https://i.pravatar.cc/150?img=25',
		incubadoraId: 'inc2',
		stepId: 'entrada',
	},
	{
		id: 'emp9',
		nome: 'GenomeLab',
		descricao: 'Análise genômica acessível',
		responsavel: 'Ricardo Oliveira',
		data: '2025-03-15',
		logo: 'https://i.pravatar.cc/150?img=26',
		incubadoraId: 'inc2',
		stepId: 'step5',
	},
	{
		id: 'emp10',
		nome: 'PharmaInova',
		descricao: 'Desenvolvimento de fármacos digitais',
		responsavel: 'Cristina Almeida',
		data: '2025-03-08',
		logo: 'https://i.pravatar.cc/150?img=27',
		incubadoraId: 'inc2',
		stepId: 'step2',
	},
	
	// Continuar para as outras incubadoras...
	// GreenStart - inc3
	{
		id: 'emp11',
		nome: 'EcoSolutions',
		descricao: 'Soluções sustentáveis para cidades inteligentes',
		responsavel: 'Carlos Mendes',
		data: '2025-04-18',
		logo: 'https://i.pravatar.cc/150?img=11',
		incubadoraId: 'inc3',
		stepId: 'step2',
	},
	{
		id: 'emp12',
		nome: 'SolarTech',
		descricao: 'Tecnologias de energia solar avançadas',
		responsavel: 'Mariana Lima',
		data: '2025-04-05',
		logo: 'https://i.pravatar.cc/150?img=28',
		incubadoraId: 'inc3',
		stepId: 'step4',
	},
	{
		id: 'emp13',
		nome: 'GreenBuild',
		descricao: 'Materiais sustentáveis para construção',
		responsavel: 'Eduardo Santos',
		data: '2025-03-25',
		logo: 'https://i.pravatar.cc/150?img=29',
		incubadoraId: 'inc3',
		stepId: 'step5',
	},
	{
		id: 'emp14',
		nome: 'WaterCycle',
		descricao: 'Soluções para tratamento de água',
		responsavel: 'Patricia Cruz',
		data: '2025-03-17',
		logo: 'https://i.pravatar.cc/150?img=35',
		incubadoraId: 'inc3',
		stepId: 'entrada',
	},
	{
		id: 'emp15',
		nome: 'RecycleHub',
		descricao: 'Plataforma de gestão de resíduos',
		responsavel: 'Henrique Souza',
		data: '2025-03-10',
		logo: 'https://i.pravatar.cc/150?img=36',
		incubadoraId: 'inc3',
		stepId: 'recusado',
	},
	
	// FinCubator - inc4
	{
		id: 'emp16',
		nome: 'FinNext',
		descricao: 'Soluções financeiras digitais',
		responsavel: 'Juliana Ramos',
		data: '2025-04-12',
		logo: 'https://i.pravatar.cc/150?img=14',
		incubadoraId: 'inc4',
		stepId: 'step3',
	},
	{
		id: 'emp17',
		nome: 'PaySmart',
		descricao: 'Processamento de pagamentos instantâneos',
		responsavel: 'Gabriel Costa',
		data: '2025-04-01',
		logo: 'https://i.pravatar.cc/150?img=37',
		incubadoraId: 'inc4',
		stepId: 'step1',
	},
	{
		id: 'emp18',
		nome: 'CryptoSolutions',
		descricao: 'Soluções baseadas em blockchain',
		responsavel: 'Daniela Moreira',
		data: '2025-03-12',
		logo: 'https://i.pravatar.cc/150?img=22',
		incubadoraId: 'inc4',
		stepId: 'recusado',
	},
	{
		id: 'emp19',
		nome: 'InsurTech',
		descricao: 'Tecnologia para seguradoras',
		responsavel: 'Paulo Martins',
		data: '2025-03-20',
		logo: 'https://i.pravatar.cc/150?img=38',
		incubadoraId: 'inc4',
		stepId: 'step5',
	},
	{
		id: 'emp20',
		nome: 'InvestAI',
		descricao: 'IA para análise de investimentos',
		responsavel: 'Amanda Freitas',
		data: '2025-03-08',
		logo: 'https://i.pravatar.cc/150?img=39',
		incubadoraId: 'inc4',
		stepId: 'step2',
	},
	
	// EduInova - inc5
	{
		id: 'emp21',
		nome: 'EduTech',
		descricao: 'Plataforma de educação digital',
		responsavel: 'Paula Santos',
		data: '2025-04-08',
		logo: 'https://i.pravatar.cc/150?img=16',
		incubadoraId: 'inc5',
		stepId: 'step4',
	},
	{
		id: 'emp22',
		nome: 'LearnPlay',
		descricao: 'Jogos educativos interativos',
		responsavel: 'Fernando Silva',
		data: '2025-04-05',
		logo: 'https://i.pravatar.cc/150?img=40',
		incubadoraId: 'inc5',
		stepId: 'entrada',
	},
	{
		id: 'emp23',
		nome: 'TeacherBot',
		descricao: 'Assistentes virtuais para professores',
		responsavel: 'Beatriz Lima',
		data: '2025-03-22',
		logo: 'https://i.pravatar.cc/150?img=41',
		incubadoraId: 'inc5',
		stepId: 'step3',
	},
	{
		id: 'emp24',
		nome: 'SkillsUp',
		descricao: 'Plataforma de capacitação profissional',
		responsavel: 'Rodrigo Melo',
		data: '2025-03-15',
		logo: 'https://i.pravatar.cc/150?img=42',
		incubadoraId: 'inc5',
		stepId: 'step2',
	},
	{
		id: 'emp25',
		nome: 'LangTech',
		descricao: 'Aprendizado de idiomas com IA',
		responsavel: 'Camila Vieira',
		data: '2025-03-05',
		logo: 'https://i.pravatar.cc/150?img=43',
		incubadoraId: 'inc5',
		stepId: 'step1',
	},
];
