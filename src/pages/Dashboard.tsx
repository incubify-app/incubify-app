import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Incubadora {
  id: number;
  nome: string;
  local: string;
  foco: string;
  empresasIncubadas: string[]; // Changed to a list of company names
  logo: string;
}

const incubadoras: Incubadora[] = [
  {
    id: 1,
    nome: "StartupLab São Paulo",
    local: "São Paulo, SP",
    foco: "Tecnologia",
    empresasIncubadas: ["TechCorp", "InnovateX", "FutureSoft"],
    logo: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    nome: "InovaBrasil Rio",
    local: "Rio de Janeiro, RJ",
    foco: "Fintech",
    empresasIncubadas: ["FinBank", "PayFlow", "CreditEase"],
    logo: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    nome: "Minas Valley",
    local: "Belo Horizonte, MG",
    foco: "Biotech",
    empresasIncubadas: ["BioGen", "HealthTech", "LifeSciences"],
    logo: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    nome: "Porto Digital",
    local: "Recife, PE",
    foco: "Tecnologia",
    empresasIncubadas: ["CodeFactory", "DevSolutions", "AppMasters"],
    logo: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    nome: "Conecta Floripa",
    local: "Florianópolis, SC",
    foco: "SaaS",
    empresasIncubadas: ["CloudBase", "SaaSify", "PlatformPro"],
    logo: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    nome: "Curitiba Innovation Hub",
    local: "Curitiba, PR",
    foco: "SmartCity",
    empresasIncubadas: ["UrbanTech", "SmartGrid", "CitySolutions"],
    logo: "https://i.pravatar.cc/150?img=7",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Inscrições Abertas":
      return "bg-green-500";
    case "Em Análise":
      return "bg-yellow-500";
    case "Fechada":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Incubadoras de Startups</h2>
        <p className="text-muted-foreground">
          Conheça as principais incubadoras e suas startups em desenvolvimento.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {incubadoras.map((incubadora) => (
          <Card key={incubadora.id} className="overflow-hidden">
            <div className="h-32 bg-muted flex items-center justify-center p-4">
              <img 
                src={incubadora.logo} 
                alt={`${incubadora.nome} logo`}
                className="h-full object-cover rounded-md"
              />
            </div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle>{incubadora.nome}</CardTitle>
              </div>
              <CardDescription>{incubadora.local}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Foco:</span>
                  <span>{incubadora.foco}</span>
                </div>
                <div className="text-sm">
                  <p className="text-muted-foreground mb-1">Empresas incubadas:</p>
                  <div className="grid grid-cols-1 gap-1.5 mt-1">
                    {incubadora.empresasIncubadas.map((empresa, index) => (
                      <div 
                        key={index} 
                        className="bg-muted/50 px-3 py-1.5 rounded-md flex items-center"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span className="text-sm">{empresa}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors">
                    Ver detalhes
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
