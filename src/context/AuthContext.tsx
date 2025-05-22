import { createContext, useContext, useState, ReactNode } from 'react';
import { User, RegisterData, IdentificationType, CompanyRole } from '../types/auth';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (login: string, password: string) => Promise<boolean>;
	register: (registerData: RegisterData) => Promise<boolean>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	//TODO: ADD LOGIN INTEGRATION
	const login = async (login: string, password: string): Promise<boolean> => {
		if (login && password) {
			try {
				if (login === 'admin' && password === 'admin') {
					const mockUser: User = {
						id: crypto.randomUUID(),
						name: 'Admin',
						contactName: 'Admin',
						address: 'Admin',
						phone: 'Admin',
						identification: 'Admin',
						identificationType: 'pf' as IdentificationType,
						role: 'management' as CompanyRole,
						login: 'admin',
						email: 'admin@mail.com',
						avatar: 'https://i.pravatar.cc/150?img=32',
						entrepreneursProfile: 'Admin',
						proposalCharacterization: 'Admin',
						financialPlan: 'Admin',
						market: 'Admin',
						needs: 'Admin',
						teamDetails: 'Admin',
						createdAt: new Date().toISOString(),
					};
					setUser(mockUser);
					return true;
				}
				const storedUsers = localStorage.getItem('users');
				const users: RegisterData[] = storedUsers ? JSON.parse(storedUsers) : [];

				const foundUser = users.find(u => u.login === login);

				if (foundUser) {
					const mockUser: User = {
						id: crypto.randomUUID(),
						name: foundUser.name,
						contactName: foundUser.contactName,
						address: foundUser.address,
						phone: foundUser.phone,
						identification: foundUser.identification,
						identificationType: foundUser.identificationType,
						role: foundUser.role,
						login: foundUser.login,
						email: foundUser.email,
						avatar: 'https://i.pravatar.cc/150?img=32',
						entrepreneursProfile: foundUser.entrepreneursProfile,
						proposalCharacterization: foundUser.proposalCharacterization,
						financialPlan: foundUser.financialPlan,
						market: foundUser.market,
						needs: foundUser.needs,
						teamDetails: foundUser.teamDetails,
						createdAt: new Date().toISOString(),
					};

					setUser(mockUser);

					toast({
						title: 'Login bem-sucedido',
						description: `Bem-vindo de volta, ${mockUser.contactName}!`,
					});

					return true;
				} else {
					toast({
						title: 'Falha no login',
						description: 'Login ou senha inválidos',
						variant: 'destructive',
					});

					return false;
				}
			} catch (error) {
				toast({
					title: 'Erro no login',
					description: 'Ocorreu um erro ao fazer login',
					variant: 'destructive',
				});

				return false;
			}
		}

		toast({
			title: 'Falha no login',
			description: 'Login ou senha inválidos',
			variant: 'destructive',
		});

		return false;
	};

	const register = async (registerData: RegisterData): Promise<boolean> => {
		const requiredFields = [
			'name',
			'contactName',
			'address',
			'identification',
			'identificationType',
			'role',
			'login',
			'password',
			'email',
			'entrepreneursProfile',
			'proposalCharacterization',
			'financialPlan',
			'market',
			'needs',
			'teamDetails',
		];

		const missingFields = requiredFields.filter(
			field => !registerData[field as keyof RegisterData]
		);

		if (missingFields.length > 0) {
			toast({
				title: 'Falha no registro',
				description: `Campos obrigatórios não preenchidos: ${missingFields.join(', ')}`,
				variant: 'destructive',
			});

			return false;
		}

		try {
			const storedUsers = localStorage.getItem('users');
			const users: RegisterData[] = storedUsers ? JSON.parse(storedUsers) : [];

			const emailExists = users.some(user => user.email === registerData.email);

			if (emailExists) {
				toast({
					title: 'Falha no registro',
					description: 'Este email já está em uso',
					variant: 'destructive',
				});

				return false;
			}

			const loginExists = users.some(user => user.login === registerData.login);

			if (loginExists) {
				toast({
					title: 'Falha no registro',
					description: 'Este login já está em uso',
					variant: 'destructive',
				});

				return false;
			}

			const identificationExists = users.some(
				user => user.identification === registerData.identification
			);

			if (identificationExists) {
				toast({
					title: 'Falha no registro',
					description: 'Esta identificação já está em uso',
					variant: 'destructive',
				});

				return false;
			}

			users.push(registerData);
			localStorage.setItem('users', JSON.stringify(users));

			const userForState: User = {
				id: crypto.randomUUID(),
				name: registerData.name,
				contactName: registerData.contactName,
				address: registerData.address,
				phone: registerData.phone,
				identification: registerData.identification,
				identificationType: registerData.identificationType,
				role: registerData.role,
				login: registerData.login,
				email: registerData.email,
				avatar: 'https://i.pravatar.cc/150?img=32',
				entrepreneursProfile: registerData.entrepreneursProfile,
				proposalCharacterization: registerData.proposalCharacterization,
				financialPlan: registerData.financialPlan,
				market: registerData.market,
				needs: registerData.needs,
				teamDetails: registerData.teamDetails,
				createdAt: new Date().toISOString(),
			};

			setUser(userForState);

			toast({
				title: 'Registro concluído',
				description: `Bem-vindo, ${registerData.contactName}!`,
			});

			return true;
		} catch (error) {
			toast({
				title: 'Erro no registro',
				description: 'Ocorreu um erro ao registrar',
				variant: 'destructive',
			});

			return false;
		}
	};

	const logout = () => {
		setUser(null);
		toast({
			title: 'Logout realizado',
			description: 'Você saiu com sucesso',
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
