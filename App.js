
import React, { useState, useEffect } from 'react';
const mockRates = [
  { from: 'BTC', to: 'USDT', rate: '38,700 USDT' },
  { from: 'ETH', to: 'USDT', rate: '2,500 USDT' },
  { from: 'USDT', to: 'RUB', rate: '75 RUB' },
  { from: 'BTC', to: 'RUB', rate: '2,900,000 RUB' }
];
const reviews = [
  { language: 'Russian', text: 'Отличный обменник! Всё быстро и просто.' },
  { language: 'English', text: 'Great service! Easy and fast.' },
  { language: 'Spanish', text: '¡Servicio excelente! Rápido y sencillo.' }
];
export default function CryptoExchange() {
  const [selectedRate, setSelectedRate] = useState(mockRates[0]);
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  useEffect(() => {
    if (amount) {
      const rateValue = parseFloat(selectedRate.rate.replace(/[^0-9.]/g, ''));
      setConvertedAmount((parseFloat(amount) * rateValue).toFixed(2));
    } else {
      setConvertedAmount('');
    }
  }, [amount, selectedRate]);
  return (
    <div>
      <h1>Криптообменник</h1>
      <select value={JSON.stringify(selectedRate)} onChange={(e) => setSelectedRate(JSON.parse(e.target.value))}>
        {mockRates.map((rate, index) => (
          <option key={index} value={JSON.stringify(rate)}>{rate.from} → {rate.to} ({rate.rate})</option>
        ))}
      </select>
      <input type="number" placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <div>Рассчитанная сумма: {convertedAmount ? `${convertedAmount} ${selectedRate.to}` : '—'}</div>
      <h2>Отзывы</h2>
      <ul>
        {reviews.map((review, index) => (
          <li key={index}><strong>{review.language}:</strong> {review.text}</li>
        ))}
      </ul>
    </div>
  );
}
