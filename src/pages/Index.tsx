
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Upload, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { userDocuments } from '@/data/mockData';

const Index = () => {
  const navigate = useNavigate();
  const recentDocuments = userDocuments.slice(0, 2);
  
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-brand-blue" />,
      title: 'Secure Storage',
      description: 'End-to-end encrypted document storage'
    },
    {
      icon: <Upload className="h-10 w-10 text-brand-blue" />,
      title: 'Easy Upload',
      description: 'Quickly add your important documents'
    },
    {
      icon: <Search className="h-10 w-10 text-brand-blue" />,
      title: 'Find Lost Docs',
      description: 'Post about lost documents or help others'
    },
    {
      icon: <Bell className="h-10 w-10 text-brand-blue" />,
      title: 'Expiry Alerts',
      description: 'Get notified before your documents expire'
    }
  ];

  return (
    <div className="container px-4 mx-auto max-w-4xl">
      <section className="mb-8 text-center py-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Find my Documents</h1>
        <p className="text-gray-600 mb-6">
          Securely store, manage and recover your important documents
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-brand-blue hover:bg-brand-darkBlue text-white" 
            size="lg"
            onClick={() => navigate('/documents')}
          >
            My Documents
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/find')}
          >
            Lost & Found
          </Button>
        </div>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Documents</h2>
          <Button variant="link" onClick={() => navigate('/documents')}>
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentDocuments.map(doc => (
            <Card key={doc.id} className="document-card">
              <CardContent className="flex items-center p-4">
                <div className="w-12 h-12 bg-brand-lightGray rounded-lg mr-4 flex items-center justify-center">
                  <span className="text-brand-blue font-bold">{doc.title.substring(0, 1)}</span>
                </div>
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                  <p className="text-sm text-gray-500">
                    {doc.expires 
                      ? `Expires: ${doc.expires.toLocaleDateString()}`
                      : 'No expiration date'}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Why Use Find my Documents?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 rounded-lg border border-gray-100 hover:shadow-md transition">
              <div className="mb-2">
                {feature.icon}
              </div>
              <h3 className="font-semibold mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
