
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.0ffdb4a9bb954421accbb1ec3b255274',
  appName: 'safe-docs-haven',
  webDir: 'dist',
  server: {
    url: 'https://0ffdb4a9-bb95-4421-accb-b1ec3b255274.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      showSpinner: true,
      androidSpinnerStyle: "large"
    }
  }
};

export default config;
