import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMoney } from './MoneyContent';
import '../styles/prim.css';
import '../styles/media.css';
import shop from '../images/store.png';
import micon from '../images/money.png';

const GeneratePrim = () => {
    
    const [num1, setNum1] = useState('');
    const [num2, setNum2] = useState('');
    const [zn, setZn] = useState('');
    const [money, updateMoney] = useMoney();
    const [answers, setAnswers] = useState([]);
    const [isAnswered, setIsAnswered] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [answerResult, setAnswerResult] = useState(null);
    const [fons, setFons] = useState('');
    const [classValue, setClassValue] = useState('');

    useEffect(() => {
        const fonsFromLocalStorage = localStorage.getItem('fons');
        setFons(fonsFromLocalStorage);
    }, []);

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
        getNum();
    }, []);

    const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomzn = () => Math.random() < 0.5 ? '+' : '-';

    function getNum() {
        let generatedNum1 = randomNum(1, 10);
        let generatedNum2 = randomNum(1, 10);
        let generatedZn = randomzn();
        if (generatedZn === '-') {
            while (generatedNum1 - generatedNum2 < 0) {
                generatedNum1 = randomNum(1, 10);
                generatedNum2 = randomNum(1, 10);
            }
        }
        setNum1(generatedNum1);
        setNum2(generatedNum2);
        setZn(generatedZn);
        setIsAnswered(false); // Сбросить состояние ответа
        setAnswers(generateAnswers(generatedNum1, generatedNum2, generatedZn));
        setButtonDisabled(true); // Отключить кнопку после генерации нового вопроса
    }

    function generateAnswers(num1, num2, zn) {
        const correctAnswer = calculateAnswer(num1, num2, zn);
        const incorrectAnswers = [];
        while (incorrectAnswers.length < 3) {
            const incorrectAnswer = randomNum(1, 20); // Генерировать несколько случайных неправильных ответов
            if (incorrectAnswer !== correctAnswer && !incorrectAnswers.includes(incorrectAnswer)) {
                incorrectAnswers.push(incorrectAnswer);
            }
        }
        const allAnswers = [...incorrectAnswers, correctAnswer];
        return shuffleArray(allAnswers);
    }

    function shuffleArray(array) {
        // Перемешать массив
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function calculateAnswer(num1, num2, zn) {
        return zn === '+' ? num1 + num2 : num1 - num2;
    }

    function handleAnswerClick(answer) {
        if (!isAnswered) {
            if (parseInt(answer) === calculateAnswer(num1, num2, zn)) {
                setAnswerResult(<h1 className='res true'>Правильно</h1>);
                updateMoney(money + 5); // Увеличиваем количество монет на 1
            } else {
                setAnswerResult(<h1 className='res false'>Неправильно</h1>);
            }
            setIsAnswered(true);
            setButtonDisabled(false); // Включить кнопку после ответа
        }
    }

    function generatePrim() {
        getNum();
        setAnswerResult(null); // Сбросить результат ответа при генерации нового вопроса
    }
    
    return (
        <>
        <div className={`box_prim ${classValue}`}>
            {!isAnswered && (
                <div className="prim">
                    <h1 className='prim_num'>{num1} {zn} {num2}</h1>
                    <div className='prim_otv'>
                        {answers.map((answer, index) => (
                            <button className='prim_otv_btn' key={index} onClick={() => handleAnswerClick(answer)} disabled={isAnswered}>
                                {answer}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {answerResult}
            <button className='prim_btn' onClick={() => generatePrim()} disabled={buttonDisabled}>
                Нажми
            </button>
            <div className="info">
                <Link className='store_link' to={'/store'}>
                    <img className='store_link_img' src={shop} alt=""/>
                </Link>
                <h1 className='money_box_text'>
                    <img className='money_box_img' src={micon} alt="" /> {money}
                </h1>
            </div>
        </div>
        </>
    )
}

export default GeneratePrim;