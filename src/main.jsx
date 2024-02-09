import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import EditorContextProvider from './components/Context/EditorContext.jsx'
import './scss/styles.scss'
import * as bootstrap from 'bootstrap'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EditorContextProvider>
      <App />
    </EditorContextProvider>
  </React.StrictMode>,
)
