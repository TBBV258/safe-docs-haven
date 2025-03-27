
export type DocumentCategory = 
  | 'id' 
  | 'passport' 
  | 'license' 
  | 'certificate' 
  | 'other';

export interface Document {
  id: string;
  title: string;
  category: DocumentCategory;
  added: Date;
  expires?: Date;
  imageUrl?: string;
  tags?: string[];
  isEncrypted: boolean;
}

export interface LostDocument {
  id: string;
  title: string;
  category: DocumentCategory;
  lostDate: Date;
  location?: string;
  description: string;
  contactInfo: string;
  imageUrl?: string;
  userId: string;
  status: 'lost' | 'found' | 'resolved';
}
