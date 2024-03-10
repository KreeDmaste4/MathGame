import React, { useState, useEffect } from 'react';
import { useMoney } from './MoneyContent';
import fon1 from '../images/фон1.jfif';
import fon2 from '../images/фон2.jfif';
import fon3 from '../images/фон3.jfif';
import fon4 from '../images/фон4.jfif';
import fon5 from '../images/фон5.jfif';
import fon6 from '../images/фон6.jfif';
import fon7 from '../images/фон7.jfif';
import '../styles/store.css'
import micon from '../images/money.png'
import { Link } from 'react-router-dom';
import '../styles/media.css'

const Store = () => {
  const [fons, setFons] = useState('');
  const [money, updateMoney] = useMoney(); // Используем хук useMoney для получения и обновления количества монет
  const [errorMessage, setErrorMessage] = useState('');
  const [classValue, setClassValue] = useState('');

  const fon = [
    { image: fon1, price: 10, id: 1 },
    { image: fon2, price: 50, id: 2 },
    { image: fon3, price: 100, id: 3 },
    { image: fon4, price: 150, id: 4 },
    { image: fon5, price: 200, id: 5 },
    { image: fon6, price: 250, id: 6 },
    { image: fon7, price: 300, id: 7 },
    // Другие элементы fon...
  ];
  
  useEffect(() => {
    if (fons === '/src/images/фон1.jfif') {
        setClassValue('first');
    }else if (fons === '/src/images/фон2.jfif') {
      setClassValue('second');
    }else if (fons === '/src/images/фон3.jfif') {
      setClassValue('third');
    }else if (fons === '/src/images/фон4.jfif') {
      setClassValue('four');
    }else if (fons === '/src/images/фон5.jfif') {
      setClassValue('five');
    }else if (fons === '/src/images/фон6.jfif') {
      setClassValue('six');
    }else if (fons === '/src/images/фон7.jfif') {
      setClassValue('seven');
    }
    
  }, [fons]);

  useEffect(() => {
    // Получаем значение fons из localStorage при загрузке компонента
    const savedFons = localStorage.getItem('fons');
    console.log('Saved fons:', savedFons); // Добавьте эту строку для отладки
    if (savedFons !== null) {
      setFons(savedFons);
    }
  }, []);

  useEffect(() => {
    console.log('Value from localStorage (fon):', localStorage.getItem('fon'));
  }, []);

  function buyimg(price, id) {
    if (money < price) {
      setErrorMessage('Недостаточно монет');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
      return;
    }

    updateMoney(money - price);

    const selectedFon = fon.find(item => item.id === id);
    if (selectedFon) {
      setFons(selectedFon.image);
      localStorage.setItem('fons', selectedFon.image);
    }
  }

  console.log('Value in localStorage for "fon":', localStorage.getItem('fon'));
  
  return (
    <>
    <div className={`fon ${classValue}`}>
      <Link className='link_back' to={'/math'}>Back</Link>
        <div className='store'>
          {fon?.map((item, i) => (
            <div key={i} className="store_item">
              <img className='store_item_img' src={item.image} alt="" />
              <p className='store_item_price'>{item.price}</p>
              <button onClick={() => buyimg(item.price, item.id)} className='store_item_btn'>buy</button>
            </div>
          ))}
        </div>
          <h1 className='money'><img className='micon' src={micon} alt="" />{money}</h1>
          {errorMessage && <p className='error'>{errorMessage}</p>}
    </div>
    </>
  );
}

export default Store;