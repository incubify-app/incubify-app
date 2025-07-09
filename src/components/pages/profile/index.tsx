import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { User } from '@/types/auth';
import { getInitials } from '@/lib/utils';

interface UserFormData {
	name: string;
	email: string;
	bio: string;
	phone: string;
	company: string;
}

export const Profile = () => {
	const { user, updateUser } = useAuth();
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<User>(user);

	const handleInputChange = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	const handleSave = async () => {
		try {
			setIsLoading(true);
			// Validate required fields
			if (!formData.name.trim() || !formData.email.trim()) {
				toast.error('Nome e email são campos obrigatórios');
				return;
			}

			await updateUser(formData);
			setIsEditing(false);
			toast.success('Perfil atualizado com sucesso!');
		} catch (error) {
			console.error('Error updating profile:', error);
			toast.error('Erro ao atualizar perfil');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		// setFormData({
		// 	name: user?.name || '',
		// 	email: user?.email || '',
		// 	bio: user?.bio || '',
		// 	phone: user?.phone || '',
		// 	company: user?.company || '',
		// });
		setIsEditing(false);
	};


	return (
		<div className='container mx-auto px-4 py-8 max-w-2xl'>
			<Card>
				<CardHeader className='flex flex-row items-center justify-between'>
					<CardTitle className='text-2xl'>Meu Perfil</CardTitle>
					{!isEditing ? (
						<Button onClick={() => setIsEditing(true)} variant='outline' size='sm'>
							<Pencil className='h-4 w-4 mr-2' />
							Editar
						</Button>
					) : (
						<div className='flex gap-2'>
							<Button onClick={handleSave} size='sm' disabled={isLoading}>
								{isLoading ? (
									<Loader2 className='h-4 w-4 mr-2 animate-spin' />
								) : (
									<Save className='h-4 w-4 mr-2' />
								)}
								Salvar
							</Button>
							<Button onClick={handleCancel} variant='outline' size='sm' disabled={isLoading}>
								<X className='h-4 w-4 mr-2' />
								Cancelar
							</Button>
						</div>
					)}
				</CardHeader>
				<CardContent className='space-y-6'>
					<div className='flex items-center space-x-4'>
						<Avatar className='h-20 w-20'>
							<AvatarImage src={user?.avatar} alt={user?.name} />
							<AvatarFallback className='text-lg'>{getInitials(user?.name || '')}</AvatarFallback>
						</Avatar>
						<div>
							<h3 className='text-lg font-semibold'>{user?.name}</h3>
							<p className='text-muted-foreground'>{user?.email}</p>
						</div>
					</div>

					<div className='grid gap-4'>
						{/* Grid layout for form fields */}
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{/* Name field */}
							<div className='grid gap-2'>
								<Label htmlFor='name'>Nome</Label>
								{isEditing ? (
									<Input
										id='name'
										value={formData.name}
										onChange={e => handleInputChange('name', e.target.value)}
										required
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>{user?.name}</p>
								)}
							</div>

							{/* Email field */}
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								{isEditing ? (
									<Input
										id='email'
										type='email'
										value={formData.email}
										onChange={e => handleInputChange('email', e.target.value)}
										required
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>{user?.email}</p>
								)}
							</div>

							{/* Phone field */}
							<div className='grid gap-2'>
								<Label htmlFor='phone'>Telefone</Label>
								{isEditing ? (
									<Input
										id='phone'
										value={formData.phone || ''}
										onChange={e => handleInputChange('phone', e.target.value)}
										placeholder='(11) 99999-9999'
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>{user?.phone || 'Não informado'}</p>
								)}
							</div>

							{/* Login field */}
							<div className='grid gap-2'>
								<Label htmlFor='login'>Login</Label>
								{isEditing ? (
									<Input
										id='login'
										value={formData.login}
										onChange={e => handleInputChange('login', e.target.value)}
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>{user?.login || 'Não informado'}</p>
								)}
							</div>

							{/* Contact Name field */}
							<div className='grid gap-2'>
								<Label htmlFor='contact_name'>Nome de contato</Label>
								{isEditing ? (
									<Input
										id='contact_name'
										value={formData.contact_name}
										onChange={e => handleInputChange('contact_name', e.target.value)}
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>{user?.contact_name || 'Não informado'}</p>
								)}
							</div>

							{/* Address field */}
							<div className='grid gap-2'>
								<Label htmlFor='address'>Endereço</Label>
								{isEditing ? (
									<Input
										id='address'
										value={formData.address}
										onChange={e => handleInputChange('address', e.target.value)}
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>{user?.address || 'Não informado'}</p>
								)}
							</div>

							{/* Identification field */}
							<div className='grid gap-2'>
								<Label htmlFor='identification'>Identificação</Label>
								{isEditing ? (
									<Input
										id='identification'
										value={formData.identification}
										onChange={e => handleInputChange('identification', e.target.value)}
										disabled={isLoading}
									/>
								) : (
									<p className='p-2 bg-muted rounded-md'>
										{user?.identification || 'Não informado'}
									</p>
								)}
							</div>
						</div>

						{/* Full-width select field */}
						<div className='grid gap-2'>
							<Label htmlFor='identificationType'>Tipo de Identificação</Label>
							{isEditing ? (
								<select
									id='identificationType'
									value={formData.identificationType}
									onChange={e => handleInputChange('identificationType', e.target.value)}
									className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2'
									disabled={isLoading}
								>
									<option value='pf'>Pessoa Física</option>
									<option value='pj'>Pessoa Jurídica</option>
								</select>
							) : (
								<p className='p-2 bg-muted rounded-md'>
									{user?.identificationType === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}
								</p>
							)}
						</div>

						{/* Full-width textarea fields */}
						<div className='grid gap-2'>
							<Label htmlFor='entrepreneursProfile'>Perfil dos Empreendedores</Label>
							{isEditing ? (
								<Textarea
									id='entrepreneursProfile'
									value={formData.entrepreneursProfile}
									onChange={e => handleInputChange('entrepreneursProfile', e.target.value)}
									rows={3}
									disabled={isLoading}
								/>
							) : (
								<p className='p-2 bg-muted rounded-md'>
									{user?.entrepreneursProfile || 'Não informado'}
								</p>
							)}
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='proposalCharacterization'>Caracterização da Proposta</Label>
							{isEditing ? (
								<Textarea
									id='proposalCharacterization'
									value={formData.proposalCharacterization}
									onChange={e => handleInputChange('proposalCharacterization', e.target.value)}
									rows={3}
									disabled={isLoading}
								/>
							) : (
								<p className='p-2 bg-muted rounded-md'>
									{user?.proposalCharacterization || 'Não informado'}
								</p>
							)}
						</div>

						<div className='grid gap-2'>
							<Label htmlFor='teamDetails'>Detalhes da Equipe</Label>
							{isEditing ? (
								<Textarea
									id='teamDetails'
									value={formData.teamDetails}
									onChange={e => handleInputChange('teamDetails', e.target.value)}
									rows={3}
									disabled={isLoading}
								/>
							) : (
								<p className='p-2 bg-muted rounded-md'>{user?.teamDetails || 'Não informado'}</p>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
