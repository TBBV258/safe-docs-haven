
import React, { useState } from 'react';
import { Search, MapPin, Calendar, Flag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lostDocumentsFeed } from '@/data/mockData';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { LostDocument } from '@/types/document';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Find = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  
  // Filter documents
  const filteredDocuments = lostDocumentsFeed.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filter === 'all' || doc.status === filter;
    return matchesSearch && matchesStatus;
  });

  // Get status badge properties
  const getStatusBadge = (status: LostDocument['status']) => {
    switch (status) {
      case 'lost':
        return { variant: 'destructive' as const, label: 'Lost' };
      case 'found':
        return { variant: 'default' as const, label: 'Found' };
      case 'resolved':
        return { variant: 'outline' as const, label: 'Resolved' };
    }
  };

  return (
    <div className="container px-4 mx-auto max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lost & Found Documents</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-brand-blue hover:bg-brand-darkBlue">
              <Plus className="mr-2 h-4 w-4" /> Post
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Post Lost or Found Document</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Tabs defaultValue="lost">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="lost">I Lost a Document</TabsTrigger>
                  <TabsTrigger value="found">I Found a Document</TabsTrigger>
                </TabsList>
                <TabsContent value="lost" className="pt-4">
                  {/* This would be a form in a full implementation */}
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Document Type</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>ID Card</option>
                        <option>Passport</option>
                        <option>Driver's License</option>
                        <option>Birth Certificate</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Where did you lose it?</label>
                      <Input placeholder="Location" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <textarea className="w-full p-2 border rounded mt-1 h-20" placeholder="Provide details that would help someone identify your document"></textarea>
                    </div>
                    <Button>Post Lost Document</Button>
                  </div>
                </TabsContent>
                <TabsContent value="found" className="pt-4">
                  {/* This would be a form in a full implementation */}
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Document Type</label>
                      <select className="w-full p-2 border rounded mt-1">
                        <option>ID Card</option>
                        <option>Passport</option>
                        <option>Driver's License</option>
                        <option>Birth Certificate</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Where did you find it?</label>
                      <Input placeholder="Location" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <textarea className="w-full p-2 border rounded mt-1 h-20" placeholder="Describe the document (without revealing personal details)"></textarea>
                    </div>
                    <Button>Post Found Document</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search lost & found documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'lost' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('lost')}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Lost
            </Button>
            <Button
              variant={filter === 'found' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('found')}
              className="bg-brand-blue hover:bg-brand-darkBlue"
            >
              Found
            </Button>
          </div>
        </div>
      </div>

      {filteredDocuments.length > 0 ? (
        <div className="space-y-4">
          {filteredDocuments.map((doc) => {
            const statusBadge = getStatusBadge(doc.status);
            
            return (
              <Card key={doc.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{doc.title}</h3>
                    <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4">{doc.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                    {doc.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{doc.location}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{format(doc.lostDate, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="bg-gray-50 p-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    Contact
                  </Button>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <Flag className="h-4 w-4 text-gray-500" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Report this post</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Search className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <p className="text-gray-500">No posts found</p>
          <p className="text-sm text-gray-400">Try a different search or filter</p>
        </div>
      )}
    </div>
  );
};

export default Find;
