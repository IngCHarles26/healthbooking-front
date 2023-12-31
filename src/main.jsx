import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from 'react-redux';
import store from './redux/store.js'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-friul0qo5xu626s2.us.auth0.com'
      clientId='KiqyFjhoVlLSJHkI4BBF03wcaeoMJIts'
      authorizationParams={{
        redirect_uri: 'https://healthbooking-front.vercel.app/patientForm'
      }}>
      <Provider store={store}>
        <App />
      </Provider>

    </Auth0Provider>
  </React.StrictMode>,
)

//https://healthbooking-front.vercel.app/patientForm