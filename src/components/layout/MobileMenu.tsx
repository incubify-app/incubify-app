
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/context/AuthContext";
import {
  FileText,
  Gauge,
  HelpCircle,
  Home,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Perfil/Dados",
    href: "/perfil",
    icon: User,
  },
  {
    title: "Grau de Evolução",
    href: "/evolucao",
    icon: Gauge,
  },
  {
    title: "Documentos",
    href: "/documentos",
    icon: FileText,
  },
  {
    title: "Suporte Técnico",
    href: "/suporte",
    icon: HelpCircle,
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
];

export function MobileMenu() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/43e9a23a-d595-4e9b-93a3-6d1b2787a77c.png" 
              alt="Incubify Logo" 
              className="h-7 w-auto" 
            />
            <h2 className="text-lg font-semibold text-white">Incubify</h2>
          </div>
        </div>
      </div>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-4">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150?img=32"}
            alt="Avatar"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.startupName}</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs text-gray-400">Progresso da Startup</p>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(user?.startupStage || 0) * 20}%` }} 
            />
          </div>
          <p className="text-xs text-gray-400">Estágio {user?.startupStage || 0}/5</p>
        </div>
      </div>
      <ScrollArea className="flex-1 border-t border-sidebar-border">
        <div className="px-2 py-4">
          <nav className="grid items-start gap-1">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:bg-sidebar-accent ${
                    isActive ? "bg-sidebar-accent" : "transparent"
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                <span className="text-sm">{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={logout}
          className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-gray-100 transition-all hover:bg-sidebar-accent"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Sair</span>
        </button>
      </div>
    </div>
  );
}
