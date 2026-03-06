import React, { useState } from 'react';
import './PaymentGateway.css';
import Footer from './Footer';

const PaymentGateway = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: 'MM',
    expYear: 'YYYY',
    cardHolderName: '',
    policyNumber: '',
    amount: '',
    transactionStatus: '',
    tokenValue: ''
  });

  const [copyMessage, setCopyMessage] = useState('');

  const formatCardNumber = (value) => {
    const clean = value.replace(/\D/g, '');
    const groups = clean.match(/.{1,4}/g) || [];
    return groups.join(' ').substring(0, 19);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    setFormData(prev => ({
      ...prev,
      cardNumber: formatCardNumber(e.target.value)
    }));
  };

  const handleClearFields = () => {
    setFormData({
      cardNumber: '',
      expMonth: 'MM',
      expYear: 'YYYY',
      cardHolderName: '',
      policyNumber: '',
      amount: '',
      transactionStatus: '',
      tokenValue: ''
    });
    setCopyMessage('');
  };

  const generateToken = (cardNumber) => {
    // Remove non-digit characters
    const cleanCardNumber = cardNumber.replace(/\D/g, '');
    
    if (cleanCardNumber.length < 8) {
      return 'INVALID_CARD';
    }
    
    // Extract first 4 and last 4 digits
    const first4 = cleanCardNumber.substring(0, 6);
    const last4 = cleanCardNumber.substring(cleanCardNumber.length - 4);
    
    // Generate random letters A-Z for middle part
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const middleLength = 5;
    let middlePart = '';
    for (let i = 0; i < middleLength; i++) {
      middlePart += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    return first4 + middlePart + last4;
  };

  const handlePayNow = () => {
    if (!formData.cardNumber || !formData.cardHolderName || !formData.amount) {
      alert('Please fill in all required fields');
      return;
    }

    // Generate a token value with card first 4, random letters, and last 4 digits
    const token = generateToken(formData.cardNumber);
    setFormData(prev => ({
      ...prev,
      transactionStatus: 'Processing',
      tokenValue: token
    }));

    // Simulate API call
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        transactionStatus: 'Success'
      }));
    }, 2000);
  };

  const handleCopyToClipboard = () => {
    if (formData.tokenValue) {
    
      navigator.clipboard.writeText(formData.tokenValue);
      setCopyMessage('Copied!');
      setTimeout(() => setCopyMessage(''), 2000);
    }
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
        <h1 className="title">Payment Gateway</h1>

        {/* Form Container */}
        <div className="form-container">
          <div className="form-section">
            <h2 className="section-title">Payment Account Information</h2>

            {/* Card Number */}
            <div className="form-group">
              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="0000 0000 0000 0000"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19"
              />
              {/* <div className="card-graphic">
                <div className="card-icon">💳</div>
              </div> */}
            </div>

            {/* Exp Date and Card Holder */}
            <div className="form-row">
              <div className="form-group exp-group">
                <label>Exp Date (MM/YYYY)</label>
                <div className="exp-inputs">
                  <select
                    name="expMonth"
                    value={formData.expMonth}
                    onChange={handleInputChange}
                  >
                    <option>MM</option>
                    {[...Array(12)].map((_, i) => {
                      const month = String(i + 1).padStart(2, '0');
                      return <option key={month} value={month}>{month}</option>;
                    })}
                  </select>
                  <select
                    name="expYear"
                    value={formData.expYear}
                    onChange={handleInputChange}
                  >
                    <option>YYYY</option>
                    {[...Array(20)].map((_, i) => {
                      const year = new Date().getFullYear() + i;
                      return <option key={year} value={year}>{year}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Card Holder Name :</label>
                <input
                  type="text"
                  name="cardHolderName"
                  placeholder="Enter card holder name"
                  value={formData.cardHolderName}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Policy Number and Amount */}
            <div className="form-row">
              <div className="form-group">
                <label>Policy/Reference Number</label>
                <input
                  type="text"
                  name="policyNumber"
                  placeholder="Enter policy number"
                  value={formData.policyNumber}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Transaction Status and Token */}
            <div className="form-row">
              <div className="form-group">
                <label>Transaction Status:</label>
                <input
                  type="text"
                  name="transactionStatus"
                  value={formData.transactionStatus}
                  readOnly
                  placeholder="Pending"
                />
              </div>

              <div className="form-group">
                <label>Token Value:</label>
                <div className="token-container">
                  <input
                    type="text"
                    name="tokenValue"
                    value={formData.tokenValue}
                    readOnly
                    placeholder="Token will appear here"
                  />
                  <button
                    className="copy-btn"
                    onClick={handleCopyToClipboard}
                    title="Copy token to clipboard"
                  >
                    Copy To Clipboard
                  </button>
                  {copyMessage && <span className="copy-message">{copyMessage}</span>}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="button-group">
              <button className="btn-clear" onClick={handleClearFields}>
                Clear Fields
              </button>
              <button className="btn-pay" onClick={handlePayNow}>
                Pay Now
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

export default PaymentGateway;
