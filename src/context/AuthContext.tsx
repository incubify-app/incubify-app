import { createContext, useContext, useState, ReactNode } from 'react';
import { User, RegisterData } from '../types/auth';
import { toast } from '@/components/ui/use-toast';
import { CompanyRole, IdentificationType } from '@/types/company';

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (
		login: string,
		password: string
	) => Promise<{
		success: boolean;
		user?: User;
	}>;
	register: (registerData: RegisterData) => Promise<boolean>;
	logout: () => void;
	updateUser: (userData: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);

	//TODO: ADD LOGIN INTEGRATION
	const login = async (
		login: string,
		password: string
	): Promise<{
		success: boolean;
		user?: User;
	}> => {
		if (login && password) {
			try {
				if (login === 'admin' && password === 'admin') {
					const mockUser: User = {
						id: '71aacba7-818e-4563-9f71-e7ddfe0c8c1e',
						name: 'Admin',
						contactName: 'Admin',
						address: 'Admin',
						phone: 'Admin',
						identification: 'Admin',
						identificationType: IdentificationType.PF,
						role: CompanyRole.STARTUP,
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
					return {
						success: true,
						user: mockUser,
					};
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

					return {
						success: true,
						user: mockUser,
					};
				} else {
					toast({
						title: 'Falha no login',
						description: 'Login ou senha inválidos',
						variant: 'destructive',
					});

					return {
						success: false,
					};
				}
			} catch (error) {
				toast({
					title: 'Erro no login',
					description: 'Ocorreu um erro ao fazer login',
					variant: 'destructive',
				});

				return {
					success: false,
				};
			}
		}

		toast({
			title: 'Falha no login',
			description: 'Login ou senha inválidos',
			variant: 'destructive',
		});

		return {
			success: false,
		};
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

	const updateUser = async (userData: Partial<User>): Promise<boolean> => {
		try {
			setUser(prev => (prev ? { ...prev, ...userData } : null));
			return true;
		} catch (error) {
			console.error('Failed to update user:', error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, isAuthenticated: !!user, login, register, logout, updateUser }}
		>
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
