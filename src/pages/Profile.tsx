
import React from 'react';
import { User, Shield, Bell, Lock, LogOut } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { currentUser } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const profileSettings = [
    {
      icon: <User className="h-5 w-5 text-brand-blue" />,
      title: 'Personal Information',
      description: 'Manage your personal details',
      action: 'Edit'
    },
    {
      icon: <Shield className="h-5 w-5 text-brand-blue" />,
      title: 'Privacy Settings',
      description: 'Control your privacy preferences',
      action: 'View'
    },
    {
      icon: <Bell className="h-5 w-5 text-brand-blue" />,
      title: 'Notification Preferences',
      description: 'Manage how you receive alerts',
      action: 'Edit'
    },
    {
      icon: <Lock className="h-5 w-5 text-brand-blue" />,
      title: 'Account Security',
      description: 'Update password and security settings',
      action: 'View'
    }
  ];

  return (
    <div className="container px-4 mx-auto max-w-4xl">
      <Card className="mb-6">
        <CardHeader className="flex flex-col items-center space-y-3 pb-0">
          <Avatar className="h-24 w-24">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-xl font-bold">{currentUser.name}</CardTitle>
            <p className="text-gray-500">{currentUser.email}</p>
          </div>
        </CardHeader>
        <CardContent className="px-6 py-4 flex justify-center">
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-2">
          <div className="space-y-4">
            {profileSettings.map((setting, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    {setting.icon}
                    <div className="ml-3">
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-gray-500">{setting.description}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    {setting.action}
                  </Button>
                </div>
                {index < profileSettings.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Security & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Enhance your account security</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Biometric Login</p>
                <p className="text-sm text-gray-500">Login with fingerprint or face ID</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Data Encryption</p>
                <p className="text-sm text-gray-500">End-to-end encryption for your documents</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-8 mb-12">
        <Button variant="outline" className="text-destructive w-full max-w-xs" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" /> Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
