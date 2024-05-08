import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from './App/store.js';
const persistor = persistStore(store);
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          
            <App />
         
        </BrowserRouter>
      </PersistGate>
    </Provider>

);