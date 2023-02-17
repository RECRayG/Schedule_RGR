import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import {BrowserRouter} from "react-router-dom";
import { QueryClient, QueryClientProvider} from "react-query";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </QueryClientProvider>
);