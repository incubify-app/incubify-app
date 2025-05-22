import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kanbanSteps, KanbanStep, EmpresaIncubada } from "@/constants/mocks";

// Componente para cada cartão de empresa
const EmpresaCard = ({ empresa }: { empresa: EmpresaIncubada }) => {
  return (
    <Card className="mb-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          {empresa.logo && (
            <img
              src={empresa.logo}
              alt={empresa.nome}
              className="w-10 h-10 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h4 className="font-medium text-sm">{empresa.nome}</h4>
            <p className="text-xs text-blue-600 line-clamp-2">{empresa.descricao}</p>
          </div>
        </div>
        <div className="mt-2 flex justify-between items-center text-xs text-blue-600">
          <span>Resp: {empresa.responsavel}</span>
          <span>{new Date(empresa.data).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Componente para cada coluna do Kanban
const KanbanColumn = ({
  step,
  onDragStart,
  onDrop,
  onDragOver,
}: {
  step: KanbanStep;
  onDragStart: (e: React.DragEvent, empresaId: string, sourceStepId: string) => void;
  onDrop: (e: React.DragEvent, targetStepId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
}) => {
  return (
    <div 
      className="min-w-[280px] flex-1 bg-blue-50 rounded-md p-3"
      onDrop={(e) => onDrop(e, step.id)}
      onDragOver={onDragOver}
    >
      <div className="flex items-center gap-2">
        <div 
          className="w-3 h-3 rounded-full" 
          style={{ backgroundColor: step.color }}
        />
        <h3 className="font-medium text-sm">
          {step.titulo} <span className="ml-1 text-blue-500">({step.empresas.length})</span>
        </h3>
      </div>
      <div className="mt-3 space-y-2">
        {step.empresas.map((empresa) => (
          <div 
            key={empresa.id} 
            draggable 
            onDragStart={(e) => onDragStart(e, empresa.id, step.id)}
          >
            <EmpresaCard empresa={empresa} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Kanban() {
  const [steps, setSteps] = useState<KanbanStep[]>(kanbanSteps);
  const [draggedItem, setDraggedItem] = useState<{
    empresaId: string;
    sourceStepId: string;
  } | null>(null);

  // Funções para lidar com o drag and drop
  const handleDragStart = (
    e: React.DragEvent,
    empresaId: string,
    sourceStepId: string
  ) => {
    setDraggedItem({ empresaId, sourceStepId });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStepId: string) => {
    e.preventDefault();

    if (!draggedItem) return;

    const { empresaId, sourceStepId } = draggedItem;

    // Se estiver arrastando para a mesma coluna, não faz nada
    if (sourceStepId === targetStepId) {
      setDraggedItem(null);
      return;
    }

    // Encontrar a empresa na coluna de origem
    const sourceStep = steps.find((step) => step.id === sourceStepId);
    const targetStep = steps.find((step) => step.id === targetStepId);

    if (!sourceStep || !targetStep) {
      setDraggedItem(null);
      return;
    }

    // Encontra e remove a empresa da coluna de origem
    const empresaIndex = sourceStep.empresas.findIndex((e) => e.id === empresaId);
    if (empresaIndex === -1) {
      setDraggedItem(null);
      return;
    }

    const empresa = sourceStep.empresas[empresaIndex];
    
    // Atualizar o estado
    const updatedSteps = steps.map((step) => {
      // Remove a empresa da coluna de origem
      if (step.id === sourceStepId) {
        return {
          ...step,
          empresas: step.empresas.filter((e) => e.id !== empresaId),
        };
      }
      
      // Adiciona a empresa na coluna de destino
      if (step.id === targetStepId) {
        return {
          ...step,
          empresas: [...step.empresas, empresa],
        };
      }
      
      return step;
    });

    setSteps(updatedSteps);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Kanban de Startups</h2>
        <p className="text-muted-foreground">
          Acompanhe o progresso das startups no processo de incubação.
        </p>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg shadow">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {steps.map((step) => (
            <KanbanColumn
              key={step.id}
              step={step}
              onDragStart={handleDragStart}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            />
          ))}
        </div>
      </div>
    </div>
  );
}