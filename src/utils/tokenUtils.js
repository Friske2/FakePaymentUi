/**
 * Generates a token from a card number.
 * Format: [first 6 digits] + [6 random uppercase letters] + [last 4 digits]
 *
 * @param {string} cardNumber - Raw card number (may contain spaces or dashes)
 * @returns {string} Token string, or 'INVALID_CARD' if the card number is too short
 */
export const generateToken = (cardNumber) => {
  const clean = cardNumber.replace(/\D/g, '');
  if (clean.length < 8) return 'INVALID_CARD';

  const first6 = clean.substring(0, 6);
  const last4 = clean.substring(clean.length - 4);

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let middle = '';
  for (let i = 0; i < 6; i++) {
    middle += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return first6 + middle + last4;
};
