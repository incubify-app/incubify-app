import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	onFileSelected: (file: File | null) => void;
	label?: string;
	buttonText?: string;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
	(
		{ className, onFileSelected, label = 'Enviar um arquivo', buttonText = 'Selecionar', ...props },
		ref
	) => {
		const inputRef = React.useRef<HTMLInputElement>(null);
		const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

		const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files ? event.target.files[0] : null;
			setSelectedFile(file);
			onFileSelected(file);
		};

		const handleButtonClick = () => {
			inputRef.current?.click();
		};

		return (
			<div className={cn('grid w-full max-w-sm items-center gap-1.5', className)}>
				{label && <label className='text-sm font-medium'>{label}</label>}
				<div className='flex items-center gap-2'>
					<Button type='button' variant='outline' onClick={handleButtonClick} className='w-full'>
						<Upload className='mr-2 h-4 w-4' />
						{buttonText}
					</Button>
					{selectedFile && (
						<span className='text-sm text-muted-foreground truncate max-w-[200px]'>
							{selectedFile.name}
						</span>
					)}
				</div>
				<input
					type='file'
					className='hidden'
					ref={e => {
						if (ref) {
							if (typeof ref === 'function') {
								ref(e);
							} else {
								ref.current = e;
							}
						}
						inputRef.current = e;
					}}
					onChange={handleFileChange}
					{...props}
				/>
			</div>
		);
	}
);

FileInput.displayName = 'FileInput';

export { FileInput };
