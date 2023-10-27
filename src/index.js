import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MsalProvider } from '@azure/msal-react';
import { AuthComponent, msalInstance } from './auth'
var pjson = require('./package.json');


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      pjson.version: {pjson.version}
      MsalProvider-start
    <MsalProvider instance={msalInstance}>
        AuthComponent-start
      <AuthComponent />
        AuthComponent-end
    </MsalProvider>
      MsalProvider-end
  </React.StrictMode>
);
