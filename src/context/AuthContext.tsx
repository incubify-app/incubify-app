
import { createContext, useContext, useState, ReactNode } from 'react';
import { User, RegisterData } from '../types/auth';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, startupName: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Simulated login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // For demo purposes, we'll accept any non-empty email/password
    if (email && password) {
      try {
        // Get stored user data if available
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Find user with matching email/password
        const foundUser = users.find((u: any) => u.email === email);
        
        if (foundUser) {
          // In a real app, we'd verify the password here
          const mockUser: User = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            avatar: "https://i.pravatar.cc/150?img=32",
            startupName: foundUser.startupName || "InnovaTech",
            startupStage: foundUser.startupStage || 3
          };
          
          setUser(mockUser);
          
          toast({
            title: "Login bem-sucedido",
            description: `Bem-vindo de volta, ${mockUser.name}!`,
          });
          
          return true;
        } else {
          toast({
            title: "Falha no login",
            description: "Email ou senha inválidos",
            variant: "destructive",
          });
          
          return false;
        }
      } catch (error) {
        toast({
          title: "Erro no login",
          description: "Ocorreu um erro ao fazer login",
          variant: "destructive",
        });
        
        return false;
      }
    }
    
    toast({
      title: "Falha no login",
      description: "Email ou senha inválidos",
      variant: "destructive",
    });
    
    return false;
  };

  // Register function
  const register = async (name: string, email: string, password: string, startupName: string): Promise<boolean> => {
    if (name && email && password && startupName) {
      try {
        // Get existing users or create empty array
        const storedUsers = localStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];
        
        // Check if email already exists
        const emailExists = users.some((user: any) => user.email === email);
        
        if (emailExists) {
          toast({
            title: "Falha no registro",
            description: "Este email já está em uso",
            variant: "destructive",
          });
          
          return false;
        }
        
        // Create new user
        const newUser = {
          id: users.length + 1,
          name,
          email,
          password, // In a real app, this would be hashed
          avatar: "https://i.pravatar.cc/150?img=32",
          startupName,
          startupStage: 1
        };
        
        // Save user
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Log user in
        const userForState: User = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
          startupName: newUser.startupName,
          startupStage: newUser.startupStage
        };
        
        setUser(userForState);
        
        toast({
          title: "Registro concluído",
          description: `Bem-vindo, ${name}!`,
        });
        
        return true;
      } catch (error) {
        toast({
          title: "Erro no registro",
          description: "Ocorreu um erro ao registrar",
          variant: "destructive",
        });
        
        return false;
      }
    }
    
    toast({
      title: "Falha no registro",
      description: "Preencha todos os campos",
      variant: "destructive",
    });
    
    return false;
  };

  const logout = () => {
    setUser(null);
    toast({
      title: "Logout realizado",
      description: "Você saiu com sucesso",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
