import { Download, FileText, Trash2 } from 'lucide-react';
import { Document } from '@/types/document';
import { Button } from '@/components/ui/button';
import { useDownloadDocument } from '@/hooks/use-download-document';
import { formatDistanceToNow } from 'date-fns';
import { bytesToSize } from '@/lib/utils';
import { ptBR } from 'date-fns/locale';

interface DocumentItemProps {
	document: Document;
	onDelete: (id: string) => void;
}

export function DocumentItem({ document, onDelete }: DocumentItemProps) {
	const downloadMutation = useDownloadDocument();

	const handleDownload = () => {
		downloadMutation.mutate(document.id);
	};

	const handleDelete = () => {
		onDelete(document.id);
	};

	return (
		<div className='flex items-center justify-between p-3 bg-card border rounded-md'>
			<div className='flex items-center gap-3'>
				<div className='bg-muted p-2 rounded-md'>
					<FileText className='h-6 w-6 text-primary' />
				</div>
				<div>
					<h4 className='text-sm font-medium'>{document.name}</h4>
					<div className='flex items-center gap-2 text-xs text-muted-foreground'>
						<span>{document.mime_type}</span>
						<span>•</span>
						<span>{bytesToSize(document.size)}</span>
						<span>•</span>
						<span>
							Enviado há {formatDistanceToNow(new Date(document.created_at), { locale: ptBR })}
						</span>
					</div>
				</div>
			</div>
			<div className='flex items-center gap-2'>
				<Button
					variant='ghost'
					size='icon'
					onClick={handleDownload}
					disabled={downloadMutation.isPending}
				>
					<Download className='h-4 w-4' />
				</Button>
				<Button variant='ghost' size='icon' onClick={handleDelete}>
					<Trash2 className='h-4 w-4 text-destructive' />
				</Button>
			</div>
		</div>
	);
}
