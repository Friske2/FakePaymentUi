import React, { useState, useEffect } from 'react';
import './App.css';
import PaymentGateway from './PaymentGateway';
import Tokenization from './Tokenization';

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const renderPage = () => {
    switch (path) {
      case '/tokenization': return <Tokenization />;
      case '/paymentGateway': return <PaymentGateway />;
      default: return <PaymentGateway />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
