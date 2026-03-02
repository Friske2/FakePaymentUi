# AIG Digital Payment Gateway

A React-based payment gateway interface matching the AIG Digital design specifications.

## Features

- Modern, responsive payment form design
- Card payment information input fields
- Transaction status tracking
- Token generation and clipboard copy functionality
- Clear and Pay Now actions
- Full mobile responsiveness

## Project Structure

```
fake-payment/
├── public/
│   └── index.html
├── src/
│   ├── PaymentGateway.js       # Main payment gateway component
│   ├── PaymentGateway.css      # Component styles
│   ├── App.js                  # Main app component
│   ├── App.css                 # App styles
│   ├── index.js                # Entry point
│   └── index.css               # Global styles
├── package.json                # Project dependencies
└── README.md                   # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

Create a production build:
```bash
npm run build
```

## Component Features

### PaymentGateway Component

The main payment gateway form includes:

- **Card Number Input**: For entering card details
- **Expiration Date**: Month and Year dropdowns
- **Card Holder Name**: Text input for cardholder
- **Policy/Reference Number**: Reference number input
- **Amount**: Payment amount field
- **Transaction Status**: Read-only field showing current transaction status
- **Token Value**: Read-only field displaying generated token
- **Copy to Clipboard**: Button to copy token to clipboard
- **Clear Fields**: Resets all form inputs
- **Pay Now**: Processes the payment and generates a token

## Styling

The application uses modern CSS with:
- Gradient backgrounds
- Smooth transitions and hover effects
- Responsive grid layout
- Flexbox for flexible component arrangement
- Mobile-first responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- React 18.2
- JavaScript (ES6+)
- CSS3
- React Hooks

## License

© 2016-2025 Powered by AIG Digital | DSSP Team
