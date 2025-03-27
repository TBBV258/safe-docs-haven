
import React, { useState } from 'react';
import { 
  FileText, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  Lock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { userDocuments } from '@/data/mockData';
import { Document, DocumentCategory } from '@/types/document';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<DocumentCategory | 'all'>('all');
  
  // Filter documents based on search and category
  const filteredDocuments = userDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get documents that are expiring soon (within 60 days)
  const now = new Date();
  const expiringDocs = userDocuments.filter(doc => {
    if (!doc.expires) return false;
    const daysUntilExpiry = Math.ceil((doc.expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 60;
  });

  // Category display helpers
  const getCategoryLabel = (category: DocumentCategory): string => {
    const labels: Record<DocumentCategory, string> = {
      'id': 'ID Card',
      'passport': 'Passport',
      'license': 'License',
      'certificate': 'Certificate',
      'other': 'Other'
    };
    return labels[category];
  };

  const getCategoryColor = (category: DocumentCategory): string => {
    const colors: Record<DocumentCategory, string> = {
      'id': 'bg-blue-100 text-blue-800',
      'passport': 'bg-purple-100 text-purple-800',
      'license': 'bg-green-100 text-green-800',
      'certificate': 'bg-amber-100 text-amber-800',
      'other': 'bg-gray-100 text-gray-800'
    };
    return colors[category];
  };

  return (
    <div className="container px-4 mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Documents</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-brand-blue hover:bg-brand-darkBlue">
              <Plus className="mr-2 h-4 w-4" /> Add Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm text-muted-foreground">
                Upload and categorize your important documents for secure storage.
              </p>
              {/* Form would go here in a full implementation */}
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Drag & drop your document</p>
                <p className="text-xs text-muted-foreground mt-1">or click to browse files</p>
              </div>
              <Button className="w-full">Upload Document</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={categoryFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('all')}
              className="whitespace-nowrap"
            >
              All
            </Button>
            <Button
              variant={categoryFilter === 'passport' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('passport')}
              className="whitespace-nowrap"
            >
              Passports
            </Button>
            <Button
              variant={categoryFilter === 'license' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCategoryFilter('license')}
              className="whitespace-nowrap"
            >
              Licenses
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="document-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="w-12 h-12 bg-brand-lightGray rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-brand-blue" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex items-center">
                          <h3 className="font-medium">{doc.title}</h3>
                          {doc.isEncrypted && (
                            <Lock className="h-3 w-3 ml-2 text-green-600" />
                          )}
                        </div>
                        <div className="flex items-center mt-1">
                          <Badge variant="outline" className={getCategoryColor(doc.category)}>
                            {getCategoryLabel(doc.category)}
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            Added {formatDistanceToNow(doc.added, { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                    {doc.expires && (
                      <div className="border-t px-4 py-2 flex items-center text-sm">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>
                          Expires {doc.expires.toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No documents found</p>
              <p className="text-sm text-gray-400">Try a different search</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="expiring">
          {expiringDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expiringDocs.map((doc) => (
                <Card key={doc.id} className="document-card overflow-hidden border-amber-200">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4">
                      <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-amber-500" />
                      </div>
                      <div className="ml-4 flex-grow">
                        <h3 className="font-medium">{doc.title}</h3>
                        <p className="text-amber-600 text-sm">
                          Expires {doc.expires?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
              <p className="text-gray-500">No documents expiring soon</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
