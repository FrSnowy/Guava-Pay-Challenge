import React from 'react';

export type CurrencyT = 'AZN' | 'EUR' | 'USD';
export type CurrencyProps = {
  currency: CurrencyT,
}

export const transformCurrency = (currency: CurrencyT) => {
  switch (currency) {
    case 'AZN':
      return '₼';
    case 'EUR':
      return '€';
    case 'USD':
    default:
      return '$';
  }
}

const Currency: React.FC<CurrencyProps> = ({ currency }) => {
  return <span>{transformCurrency(currency)}</span>
}

export default Currency;