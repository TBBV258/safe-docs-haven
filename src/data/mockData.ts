
import { Document, LostDocument } from '../types/document';

// Mock user data
export const currentUser = {
  id: 'user1',
  name: 'Jane Doe',
  email: 'jane.doe@example.com',
  avatar: 'https://i.pravatar.cc/150?img=5'
};

// Mock document data
export const userDocuments: Document[] = [
  {
    id: 'doc1',
    title: 'Passport',
    category: 'passport',
    added: new Date('2022-06-15'),
    expires: new Date('2032-06-14'),
    imageUrl: '/placeholder.svg',
    tags: ['international', 'travel'],
    isEncrypted: true
  },
  {
    id: 'doc2',
    title: 'Driver\'s License',
    category: 'license',
    added: new Date('2021-03-10'),
    expires: new Date('2023-10-05'),
    imageUrl: '/placeholder.svg',
    tags: ['driving', 'id'],
    isEncrypted: true
  },
  {
    id: 'doc3',
    title: 'Birth Certificate',
    category: 'certificate',
    added: new Date('2020-11-20'),
    imageUrl: '/placeholder.svg',
    tags: ['official', 'certificate'],
    isEncrypted: true
  },
  {
    id: 'doc4',
    title: 'Social Security Card',
    category: 'id',
    added: new Date('2021-04-05'),
    imageUrl: '/placeholder.svg',
    tags: ['government', 'identity'],
    isEncrypted: true
  }
];

// Mock lost documents feed
export const lostDocumentsFeed: LostDocument[] = [
  {
    id: 'lost1',
    title: 'Lost Passport',
    category: 'passport',
    lostDate: new Date('2023-07-20'),
    location: 'Central Park, New York',
    description: 'Lost my US passport somewhere in Central Park on July 20th',
    contactInfo: 'email@example.com',
    userId: 'user2',
    status: 'lost'
  },
  {
    id: 'lost2',
    title: 'Found Driver\'s License',
    category: 'license',
    lostDate: new Date('2023-08-05'),
    location: 'Downtown Coffee Shop',
    description: 'Found a driver\'s license at Downtown Coffee Shop on August 5th',
    contactInfo: 'finder@example.com',
    userId: 'user3',
    status: 'found'
  },
  {
    id: 'lost3',
    title: 'Lost Student ID Card',
    category: 'id',
    lostDate: new Date('2023-08-10'),
    location: 'University Library',
    description: 'Lost my student ID card at the University Library on August 10th',
    contactInfo: 'student@example.com',
    userId: 'user4',
    status: 'lost'
  },
  {
    id: 'lost4',
    title: 'Found Birth Certificate',
    category: 'certificate',
    lostDate: new Date('2023-07-30'),
    location: 'City Bus #42',
    description: 'Found a birth certificate on city bus #42 on July 30th',
    contactInfo: 'finder2@example.com',
    userId: 'user5',
    status: 'found'
  }
];
