import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentsByCompany } from '@/hooks/use-documents-company';
import { useDeleteDocument } from '@/hooks/use-delete-document';
import { DocumentUploadDialog } from '@/components/DocumentUploadDialog';
import { DocumentItem } from '@/components/DocumentItem';
import { ConfirmDeleteDialog } from '@/components/ConfirmDeleteDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, FileText } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Documents = () => {
	const { user } = useAuth();
	const { id: companyId } = user;
	const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
	const { data: documents, isLoading, error, refetch } = useDocumentsByCompany();

	const deleteDocumentMutation = useDeleteDocument(companyId || '');

	const handleDeleteDocument = (documentId: string) => {
		setDocumentToDelete(documentId);
	};

	const confirmDelete = async () => {
		if (documentToDelete) {
			try {
				await deleteDocumentMutation.mutateAsync(documentToDelete);
				setDocumentToDelete(null);
			} catch (error) {
				console.error('Error deleting document:', error);
			}
		}
	};

	return (
		<Card className='flex flex-col h-full'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
				<div>
					<CardTitle>Documentos</CardTitle>
					<CardDescription>Gerenciar documentos</CardDescription>
				</div>
				<div className='flex items-center gap-2'>
					<Button variant='outline' size='icon' onClick={() => refetch()}>
						<RefreshCw className='h-4 w-4' />
					</Button>
					<DocumentUploadDialog companyId={companyId} />
				</div>
			</CardHeader>
			<CardContent className='flex-1 overflow-auto'>
				{isLoading ? (
					<div className='flex items-center justify-center h-40'>
						<div className='flex flex-col items-center gap-2'>
							<div className='animate-spin'>
								<RefreshCw className='h-8 w-8 text-muted-foreground' />
							</div>
							<p className='text-sm text-muted-foreground'>Loading documents...</p>
						</div>
					</div>
				) : error ? (
					<div className='flex flex-col items-center justify-center h-40 text-center'>
						<p className='text-sm text-destructive'>Aconteceu um erro</p>
						<Button variant='link' onClick={() => refetch()} className='mt-2'>
							Tentar novamente
						</Button>
					</div>
				) : documents?.length === 0 ? (
					<div className='flex flex-col items-center justify-center h-40 text-center'>
						<div className='p-4 rounded-full bg-muted'>
							<FileText className='h-8 w-8 text-muted-foreground' />
						</div>
						<h3 className='mt-4 text-lg font-medium'>Sem documentos</h3>
						<p className='mt-2 text-sm text-muted-foreground max-w-xs'>
							Envie documentos para acompanhar arquivos importantes de sua empresa.
						</p>
					</div>
				) : (
					<div className='grid gap-3'>
						{documents?.map(document => (
							<DocumentItem key={document.id} document={document} onDelete={handleDeleteDocument} />
						))}
					</div>
				)}
			</CardContent>

			<ConfirmDeleteDialog
				isOpen={!!documentToDelete}
				onClose={() => setDocumentToDelete(null)}
				onConfirm={confirmDelete}
				title='Delete Document'
				description='Are you sure you want to delete this document? This action cannot be undone.'
			/>
		</Card>
	);
};
