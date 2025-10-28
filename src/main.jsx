import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/contextShare.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Context from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
<BrowserRouter>
 <Context>
  <GoogleOAuthProvider clientId='571029332522-s64utkqor5s066ai8avqq6g5jrnabec5.apps.googleusercontent.com'>
    <App />
 </GoogleOAuthProvider></Context>
  </BrowserRouter>

  </StrictMode>,
)
