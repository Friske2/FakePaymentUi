import React, { useState } from 'react';
import './Tokenization.css';
import Footer from './Footer';
import { generateToken } from './utils/tokenUtils';

const Tokenization = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [tokenValue, setTokenValue] = useState('');
  const [copyMessage, setCopyMessage] = useState('');
  const [isTokenizing, setIsTokenizing] = useState(false);



  const handleTokenize = () => {
    if (!cardNumber.trim()) {
      alert('Please enter a card number');
      return;
    }
    setIsTokenizing(true);
    setTimeout(() => {
      const token = generateToken(cardNumber);
      setTokenValue(token);
      setIsTokenizing(false);
    }, 800);
  };

  const handleCopyToClipboard = () => {
    if (tokenValue) {
      navigator.clipboard.writeText(tokenValue);
      setCopyMessage('Copied!');
      setTimeout(() => setCopyMessage(''), 2000);
    }
  };

  const handleClearFields = () => {
    setCardNumber('');
    setTokenValue('');
    setCopyMessage('');
  };

  const formatCardNumber = (value) => {
    const clean = value.replace(/\D/g, '');
    const groups = clean.match(/.{1,4}/g) || [];
    return groups.join(' ').substring(0, 19);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  return (
    <div className="payment-gateway-container">
      <div className="payment-gateway">
        {/* Header */}
        <div className="header">
          <div className="logo">FK</div>
          <div className="brand-text">FAKE PAYMENT</div>
          <div className="language-login">
            <select className="language-select">
              <option>English</option>
              <option>ไทย</option>
            </select>
            <button className="login-btn">Logout</button>
          </div>
        </div>

        {/* Title */}
        <h1 className="title">Credit Card Tokenization Service</h1>

        {/* Form Container */}
        <div className="form-container">
          <div className="form-section">
            <h2 className="section-title">Account Information</h2>

            {/* Card Number + Tokenize */}
            <div className="token-form-row">
              <div className="form-group token-input-group">
                <label>Card Number:</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  maxLength="19"
                />
              </div>
              <div className="card-graphic-box">
                <div className="card-graphic-inner">
                  <div className="card-chip" />
                  <div className="card-stripe" />
                </div>
              </div>
              <button
                className="btn-tokenize"
                onClick={handleTokenize}
                disabled={isTokenizing}
              >
                {isTokenizing ? 'Tokenizing...' : 'Tokenize'}
              </button>
            </div>

            {/* Token Value + Copy */}
            <div className="token-form-row">
              <div className="form-group token-input-group">
                <label>Token Value:</label>
                <input
                  type="text"
                  value={tokenValue}
                  readOnly
                  placeholder="Token will appear here"
                />
              </div>
              <div className="token-actions">
                <button
                  className="btn-copy"
                  onClick={handleCopyToClipboard}
                  disabled={!tokenValue}
                >
                  Copy To Clipboard
                </button>
                {copyMessage && <span className="copy-message">{copyMessage}</span>}
              </div>
            </div>

            {/* Clear Button */}
            <div className="button-group single">
              <button className="btn-clear-token" onClick={handleClearFields}>
                Clear Fields
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Tokenization;
