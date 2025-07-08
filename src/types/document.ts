export interface Document {
	id: string;
	name: string;
	content: string; // Base64 encoded content
	mime_type: string;
	size: number;
	company_id: string;
	created_at: string;
	updated_at: string;
}
