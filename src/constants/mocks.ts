
// Definição dos tipos de dados para o Kanban
export interface EmpresaIncubada {
  id: string;
  nome: string;
  descricao: string;
  responsavel: string;
  data: string;
  logo?: string;
}

export interface KanbanStep {
  id: string;
  titulo: string;
  color: string;
  empresas: EmpresaIncubada[];
}

// Dados mocados para o Kanban
export const kanbanSteps: KanbanStep[] = [
  {
    id: "entrada",
    titulo: "Entrada",
    color: "#2196f3", // Light blue
    empresas: [
      {
        id: "empresa1",
        nome: "InnovaTech",
        descricao: "Plataforma de automação para pequenas empresas",
        responsavel: "Ana Silva",
        data: "2025-04-15",
        logo: "https://i.pravatar.cc/150?img=10"
      },
      {
        id: "empresa2",
        nome: "EcoSolutions",
        descricao: "Soluções sustentáveis para cidades inteligentes",
        responsavel: "Carlos Mendes",
        data: "2025-04-18",
        logo: "https://i.pravatar.cc/150?img=11"
      },
      {
        id: "empresa3",
        nome: "HealthConnect",
        descricao: "Aplicativo de telemedicina para áreas rurais",
        responsavel: "Marina Costa",
        data: "2025-04-20",
        logo: "https://i.pravatar.cc/150?img=12"
      }
    ]
  },
  {
    id: "step1",
    titulo: "Step 1",
    color: "#03a9f4", // Lighter blue
    empresas: [
      {
        id: "empresa4",
        nome: "DataInsights",
        descricao: "Análise de dados para decisões estratégicas",
        responsavel: "Roberto Alves",
        data: "2025-04-10",
        logo: "https://i.pravatar.cc/150?img=13"
      },
      {
        id: "empresa5",
        nome: "FinNext",
        descricao: "Soluções financeiras digitais",
        responsavel: "Juliana Ramos",
        data: "2025-04-12",
        logo: "https://i.pravatar.cc/150?img=14"
      }
    ]
  },
  {
    id: "step2",
    titulo: "Step 2",
    color: "#00bcd4", // Cyan blue
    empresas: [
      {
        id: "empresa6",
        nome: "AgroSmart",
        descricao: "Tecnologia para agricultura de precisão",
        responsavel: "Marcos Oliveira",
        data: "2025-04-05",
        logo: "https://i.pravatar.cc/150?img=15"
      },
      {
        id: "empresa7",
        nome: "EduTech",
        descricao: "Plataforma de educação digital",
        responsavel: "Paula Santos",
        data: "2025-04-08",
        logo: "https://i.pravatar.cc/150?img=16"
      }
    ]
  },
  {
    id: "step3",
    titulo: "Step 3",
    color: "#0288d1", // Dark blue
    empresas: [
      {
        id: "empresa8",
        nome: "LogiTech",
        descricao: "Soluções de logística inteligente",
        responsavel: "Thiago Lima",
        data: "2025-03-28",
        logo: "https://i.pravatar.cc/150?img=17"
      }
    ]
  },
  {
    id: "step4",
    titulo: "Step 4",
    color: "#4fc3f7", // Sky blue
    empresas: [
      {
        id: "empresa9",
        nome: "RetailAI",
        descricao: "Inteligência artificial para varejo",
        responsavel: "Camila Ferreira",
        data: "2025-03-20",
        logo: "https://i.pravatar.cc/150?img=18"
      },
      {
        id: "empresa10",
        nome: "CloudSecure",
        descricao: "Segurança para ambientes em nuvem",
        responsavel: "Rafael Torres",
        data: "2025-03-25",
        logo: "https://i.pravatar.cc/150?img=19"
      }
    ]
  },
  {
    id: "step5",
    titulo: "Step 5",
    color: "#81d4fa", // Light sky blue
    empresas: [
      {
        id: "empresa11",
        nome: "UrbanMobility",
        descricao: "Soluções de mobilidade urbana",
        responsavel: "Fernanda Castro",
        data: "2025-03-15",
        logo: "https://i.pravatar.cc/150?img=20"
      }
    ]
  },
  {
    id: "recusado",
    titulo: "Recusado",
    color: "#f44336", // Red (keeping this as red for rejected items)
    empresas: [
      {
        id: "empresa12",
        nome: "VRExperience",
        descricao: "Experiências em realidade virtual",
        responsavel: "Gustavo Soares",
        data: "2025-03-10",
        logo: "https://i.pravatar.cc/150?img=21"
      },
      {
        id: "empresa13",
        nome: "CryptoSolutions",
        descricao: "Soluções baseadas em blockchain",
        responsavel: "Daniela Moreira",
        data: "2025-03-12",
        logo: "https://i.pravatar.cc/150?img=22"
      }
    ]
  }
];