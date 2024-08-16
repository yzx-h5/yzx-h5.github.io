import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonFooter } from '@ionic/react';
import LoginInput from './components/login-input';
import RegistrationInput from './components/registration-input';
import ForgetPasswordInput from './components/forget-password-input';
import {
  StarsCanvas,
} from "@/components";
import './index.scss';

const Login: React.FC = () => {
  const [titleValue, setDynamicValue] = useState("Login to FWD Smart");
  const [showInput, setInputVisible] = useState('login');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const updateTitle = (value: React.SetStateAction<string>) => {
    setDynamicValue(value);
  };

  useEffect(() => {
    const targetDate = new Date('2024-08-20T10:00:00');
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <IonPage className='login-body'>
      <div className='login-img'>
       <StarsCanvas />
      </div>

      <div className='contents'>
          <div className='login-logo'>
          </div>
          <div className='countdown'>倒计时: {timeLeft.days}天 {timeLeft.hours}小时 {timeLeft.minutes}分 {timeLeft.seconds}秒</div>
          <div className='input-box'>
          <div className='input-box-title'>
            <div className='input-box-title-left'></div>
            <div className='input-box-title-right'></div>
            <div className='input-box-title-content'>{ titleValue }</div>
          </div>
          { (showInput === 'login') && (
            <LoginInput updateTitle={ updateTitle } setInputVisible={ setInputVisible }></LoginInput>
          ) }
          { (showInput === 'registration') && (
            <RegistrationInput updateTitle={ updateTitle } setInputVisible={ setInputVisible }></RegistrationInput>
          ) }
         { (showInput === 'forget') && (
            <ForgetPasswordInput updateTitle={ updateTitle } setInputVisible={ setInputVisible }></ForgetPasswordInput>
          ) }
          </div>
      </div>
      <IonFooter className='footer'>
       <StarsCanvas />
      </IonFooter>
    </IonPage>
  );
};

export default Login;
