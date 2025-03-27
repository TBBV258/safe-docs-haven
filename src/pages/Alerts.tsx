
import React from 'react';
import { Bell, Calendar, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { userDocuments } from '@/data/mockData';
import { format, differenceInDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Alerts = () => {
  // Filter documents that have expiry dates
  const docsWithExpiry = userDocuments.filter(doc => doc.expires);
  
  // Sort by expiry date (closest first)
  const sortedDocs = [...docsWithExpiry].sort((a, b) => {
    if (a.expires && b.expires) {
      return a.expires.getTime() - b.expires.getTime();
    }
    return 0;
  });

  // Calculate days until expiry for alert styling
  const getExpiryStatus = (expiryDate: Date | undefined) => {
    if (!expiryDate) return { color: 'text-gray-500', label: 'No expiry date' };
    
    const today = new Date();
    const daysRemaining = differenceInDays(expiryDate, today);
    
    if (daysRemaining < 0) {
      return { color: 'text-red-600', label: 'Expired', badgeColor: 'bg-red-100 text-red-800' };
    } else if (daysRemaining < 30) {
      return { color: 'text-red-600', label: 'Expiring soon', badgeColor: 'bg-red-100 text-red-800' };
    } else if (daysRemaining < 90) {
      return { color: 'text-amber-600', label: 'Expiring in 3 months', badgeColor: 'bg-amber-100 text-amber-800' };
    } else {
      return { color: 'text-green-600', label: 'Valid', badgeColor: 'bg-green-100 text-green-800' };
    }
  };

  return (
    <div className="container px-4 mx-auto max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Document Alerts</h1>
        <p className="text-gray-600">
          Stay updated on your document expiration dates and important notifications
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Alert Settings</h2>
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-brand-blue" />
                  <div>
                    <p className="font-medium">Expiry Notifications</p>
                    <p className="text-sm text-gray-500">Get alerted before documents expire</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 mr-3 text-brand-blue" />
                  <div>
                    <p className="font-medium">Lost Document Matches</p>
                    <p className="text-sm text-gray-500">Get notified about potential matches</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <EyeOff className="h-5 w-5 mr-3 text-brand-blue" />
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-gray-500">Notifications about account security</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Expiry Timeline</h2>
        
        {sortedDocs.length > 0 ? (
          <div className="space-y-4">
            {sortedDocs.map(doc => {
              const expiryStatus = getExpiryStatus(doc.expires);
              const daysRemaining = doc.expires 
                ? differenceInDays(doc.expires, new Date()) 
                : null;
              
              return (
                <Card key={doc.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-brand-lightGray rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="h-5 w-5 text-brand-blue" />
                        </div>
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <div className="flex items-center mt-1">
                            <span className={cn("text-sm", expiryStatus.color)}>
                              {doc.expires ? format(doc.expires, 'MMM d, yyyy') : 'No expiry'}
                            </span>
                            <Badge variant="outline" className={cn("ml-2 text-xs", expiryStatus.badgeColor)}>
                              {daysRemaining !== null && daysRemaining >= 0 
                                ? `${daysRemaining} days left` 
                                : expiryStatus.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">No documents with expiry dates</p>
            <p className="text-sm text-gray-400">Add documents with expiry dates to see alerts</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
