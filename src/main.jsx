import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { UserProvider } from './hook/userData.jsx'
import { SelectedChatProvider } from './hook/selectedChat.jsx'
import { SocketProvider } from './hook/socketContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <SelectedChatProvider>
          <SocketProvider>
            <App />
          </SocketProvider>
        </SelectedChatProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)

//if ('serviceWorker' in navigator) {
//  window.addEventListener('load', () => {
//    navigator.serviceWorker.register('/service-worker.js')
//      .then(reg => console.log('Service Worker registrato', reg))
//      .catch(err => console.log('Errore registrazione SW', err));
//  });
//}
