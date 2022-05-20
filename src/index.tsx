import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './styles/main.scss';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(<App />);
