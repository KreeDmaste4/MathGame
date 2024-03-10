// MoneyContent.jsx
import { useState } from 'react';

export const useMoney = () => {
  const [money, setMoney] = useState(() => {
    const initialMoney = parseInt(localStorage.getItem('money')) || 0;
    return initialMoney;
  });

  const updateMoney = (newMoney) => {
    setMoney(newMoney); // Обновляем состояние money
    localStorage.setItem('money', newMoney.toString()); // Обновляем значение в localStorage
};

  return [money, updateMoney];
};