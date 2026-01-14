
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Failed to render React app:", error);
  rootElement.innerHTML = `<div style="color: white; text-align: center; padding: 20px;">
    <h2>عذراً، حدث خطأ أثناء تشغيل التطبيق.</h2>
    <p>${error.message}</p>
  </div>`;
}
