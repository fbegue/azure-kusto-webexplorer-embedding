import React from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { PublicClientApplication} from '@azure/msal-browser';
import { App } from './app'
import './auth.css'

// pre-requiete from APP:
// 1. Redirect URI should be eligible for the Authorization Code Flow with PKCE (https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Authentication/appId/0289b3ad-4264-4a6c-8f0c-2c56d8177831/isMSAApp~/false)
// 2. App should Grant Admin permission to Azure Date Explorer -> user_impersonation (https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/CallAnAPI/appId/0289b3ad-4264-4a6c-8f0c-2c56d8177831/isMSAApp~/false)

const tenantId = '30812d17-97f9-4e0d-a1ae-69145f27a0f7';
const appId = 'b1c5cd86-d977-498c-bee6-4ff59d170ee7'; // https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationMenuBlade/~/Overview/appId/0289b3ad-4264-4a6c-8f0c-2c56d8177831/isMSAApp~/false
const redirectUri = `${window.location.protocol}//${window.location.host}/blank.html`;

const msalConfig = {
  auth: {
    clientId: appId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: redirectUri,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const AuthComponent = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
      instance.loginPopup();
    };

    const handleLogout = () => {
      instance.logout();
    };

    return (
      <div class="auth-container">
        <AuthenticatedTemplate>
          <button onClick={handleLogout}>Logout</button>
          <App />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <p>User is not authenticated!</p>
          <button onClick={handleLogin}>Login</button>
        </UnauthenticatedTemplate>
      </div>
    );
  };
