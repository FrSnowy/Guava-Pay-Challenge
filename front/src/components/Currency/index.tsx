import React from 'react';

export type CurrencyT = 'AZN' | 'EUR' | 'USD';
export type CurrencyProps = {
  currency: CurrencyT,
}

const Currency: React.FC<CurrencyProps> = ({ currency }) => {
  switch (currency) {
    case 'AZN':
      return <span>₼</span>;
    case 'EUR':
      return <span>€</span>;
    case 'USD':
    default:
      return <span>$</span>;
  }
}

export default Currency;