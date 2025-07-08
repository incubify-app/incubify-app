import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { FileInput } from '@/components/ui/file-input';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUploadDocument } from '@/hooks/use-upload-document';
import { Upload } from 'lucide-react';

interface DocumentUploadDialogProps {
	companyId: string;
}

export function DocumentUploadDialog({ companyId }: DocumentUploadDialogProps) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const uploadMutation = useUploadDocument(companyId);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (file && name) {
			try {
				const content = await fileToBase64(file);
				const mime_type = file.type;
				const size = file.size;

				await uploadMutation.mutateAsync({
					file,
					name,
					content,
					mime_type,
					size,
				});
				setOpen(false);
				setName('');
				setFile(null);
			} catch (error) {
				console.error('Error uploading document:', error);
			}
		}
	};

	const fileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const content = reader.result as string;
				const base64Content = content.split(',')[1];
				resolve(base64Content);
			};
			reader.onerror = error => reject(error);
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Upload className='mr-2 h-4 w-4' />
					Enviar documento
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Enviar documento</DialogTitle>
						<DialogDescription>Envie um novo documento para esta empresa</DialogDescription>
					</DialogHeader>
					<div className='grid gap-4 py-4'>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label htmlFor='name' className='text-right'>
								Nome do arquivo
							</Label>
							<Input
								id='name'
								value={name}
								onChange={e => setName(e.target.value)}
								className='col-span-3'
								required
							/>
						</div>
						<div className='grid grid-cols-4 items-center gap-4'>
							<Label className='text-right'>Arquivo</Label>
							<div className='col-span-3'>
								<FileInput
									onFileSelected={setFile}
									accept='.pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png'
									required
								/>
							</div>
						</div>
					</div>
					<DialogFooter>
						<Button type='button' variant='outline' onClick={() => setOpen(false)}>
							Cancelar
						</Button>
						<Button type='submit' disabled={!file || !name || uploadMutation.isPending}>
							{uploadMutation.isPending ? 'Enviando...' : 'Enviar'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
