import { useMutation } from '@tanstack/react-query';
import { downloadDocument, DocumentDownloadResponse } from '../services/download-document';

/**
 * React Query hook to download a document
 * @returns Mutation object for downloading a document
 */
export const useDownloadDocument = () => {
	return useMutation({
		mutationFn: (documentId: string) => downloadDocument(documentId),
		onSuccess: (data: DocumentDownloadResponse) => {
			const url = window.URL.createObjectURL(data.blob);
			const link = document.createElement('a');
			link.href = url;
			const extension = data.document.mime_type.split('/')[1] || 'pdf';
			link.setAttribute('download', `${data.document.name}.${extension}`);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);
		},
	});
};
