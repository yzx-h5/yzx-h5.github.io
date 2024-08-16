import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendEmail, register } from '@/api/login';
import { useAlert } from '@/hooks/alert-hook';
import { useLoading } from '@/hooks/loading-hook';
import CustomInput from '@/components/custom-input';
import { get, isEmpty } from 'lodash';
import {
  IonButton,
  IonList,
  IonModal,
  IonHeader,
  IonText,
  IonInput,
  IonButtons,
} from '@ionic/react';
import { setToken } from '@/redux/actions';
import { validateEmail, validatePassword } from '@/utils/validate'
import { encryptPassword } from '@/utils/common';
import './index.scss'
const RegistrationInput: React.FC<any> = ({ token, setToken, messageApi, setInputVisible, updateTitle, ...props }) => {
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();
  const [isTouched, setTouched] = useState<boolean>(false);
  const [code, setCode] = useState<Array<any>>([]);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [warnings, setWarnings] = useState<Array<any>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sessionID, setSessionID] = useState();
  const [email, setEmail] = useState('qq458247220@126.com');
  const [sendEmailTime, setSendEmailTime] = useState<number>(0);
  const history = useHistory();

  useEffect(() => {
    updateTitle('Registration');
  }, []);

  const handleSendEmail = async (e: any) => {
    try {
      setTouched(true);
      if (!isEmpty(warnings)) {
        return
      }
      await startLoading();
      const res: any = await sendEmail({ email });
      const statusCode = get(res, 'statusCode');
      if (statusCode === 200) {
        let secondsLeft = 10;
        setSendEmailTime(secondsLeft);
        setIsOpen(true);
        setCode([]);
        setSessionID(res.data);
        const countdownTimer = setInterval(() => {
          secondsLeft--;
          setSendEmailTime(secondsLeft);
          if (secondsLeft === 0) {
            clearInterval(countdownTimer);
            setSendEmailTime(0);
            setWarnings([]);
          }
        }, 1000);
        return
      }
      throw new Error(res.errors);
    } catch (ex: any) {
      showAlert(get(ex, 'response.data.message', ex));
      stopLoading();
    } finally {
      stopLoading();
    }
  };

  const handleCodeChange = (value: any) => {
    value = value.toString();
    const updatedCode = [];
    for (const key of value) {
      updatedCode.push(key);
    }
    setCode(updatedCode);
  };

  const handleRegister = async () => {
    try {
      await startLoading();
      const params = {
        email,
        password: encryptPassword(password),
        code: code.join(''),
        sessionID
      }
      const res: any = await register(params);
      const statusCode = get(res, 'statusCode');
      if (statusCode === 200) {
        setToken(res.token);
        history.push('/dashboard');
        return
      }
      throw new Error(res.errors);
    } catch (ex: any) {
      showAlert(get(ex, 'response.data.message', ex));
      stopLoading();
    } finally {
      stopLoading();
    }
  };

  const handleWarningData = (data: any) => {
    if (data.message) {
      setWarnings([data]);
      return
    }
    if (!isEmpty(warnings.filter(item => item.id === data.id))) {
      setWarnings([]);
    }
  };
 
  const closeModal = () => {
    setIsOpen(false);
    setWarnings([]);
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword || !password || !isEmpty(warnings)) return
    if (confirmPassword !== password) {
      return 'Two passwords do not match'
    }
  };
  
  const disabledTerm = () => {
    return  code.length !== 6 || confirmPassword !== password || !isEmpty(warnings)
  };

  return (
    <form>
      <IonList>
        <CustomInput
          id="email"
          type="email"
          label="Email"
          onInputChange={ validateEmail }
          value={ email }
          setValue={ setEmail }
          setTouched={ setTouched }
          handleWarningData={ handleWarningData }
          isTouched={ isTouched }
          required
          requiredMassage='Please enter your email'
        />
        <IonButton id='present-alert' disabled={ !isEmpty(warnings) || (sendEmailTime <= 10 && sendEmailTime !== 0) } className='orange-btn mg-t-20' onClick={ handleSendEmail }>
          { (sendEmailTime <= 10 && sendEmailTime !== 0) ? `Resendable after ${sendEmailTime} s` : 'Send Email' }
        </IonButton>
        <IonButton className='white-btn mg-t-10' fill="clear" expand="block" onClick={ () => setInputVisible('login') }>
          Go Login
        </IonButton>
      </IonList>
      <IonModal
        className='ion-dialog'
        isOpen={ isOpen }
        onIonModalDidDismiss={ () => { closeModal() } }
        backdropDismiss={ false }
      >
        <IonHeader>
          <IonButtons slot="start">
          <IonText >
            We have sent you 6-digit verification code to email:
            <IonText>
              <b className='range-color'> { email }</b>
            </IonText>
          </IonText>
            <IonButton color="dark" strong={true} onClick={ () => closeModal() }>
               X
            </IonButton>
          </IonButtons>
        </IonHeader>
        <span className='mg-t-20 code-label'>
           verification code:
        </span>
        <div>
          <ul className='code-ul'>
            <li>{ code[0] }</li>
            <li>{ code[1] }</li>
            <li>{ code[2] }</li>
            <li>{ code[3] }</li>
            <li>{ code[4] }</li>
            <li>{ code[5] }</li>
          </ul>
          <IonInput
            className='code-input'
            maxlength={ 6 }
            onIonInput={ (e) => handleCodeChange(e.target.value) } />
          <CustomInput
            className="normalcy-label"
            id="password"
            type="password"
            label="password:"
            onInputChange={ validatePassword }
            value={ password }
            setValue={ setPassword }
            setTouched={ setTouched }
            handleWarningData={ handleWarningData }
            isTouched={ isTouched }
            required
            requiredMassage='Please enter your password'
            isEye
          />
         <CustomInput
            className="normalcy-label"
            id="confirmPassword"
            type="confirmPassword"
            label="Confirm Password:"
            onInputChange={ validatePassword }
            value={ confirmPassword }
            setValue={ setConfirmPassword }
            setTouched={ setTouched }
            handleWarningData={ handleWarningData }
            isTouched={ isTouched }
            required
            requiredMassage='Please enter your password again'
            isEye
          />
          <span className='error-label'>{validateConfirmPassword()}</span>
        </div>
        <IonButton className='orange-btn mg-t-20' disabled={ disabledTerm() } onClick={ handleRegister }>Confirm</IonButton>
        <IonButton className='white-btn'  disabled={ sendEmailTime <= 10 && sendEmailTime !== 0 } fill="clear" expand="block" onClick={ handleSendEmail }> { (sendEmailTime <= 10 && sendEmailTime !== 0) ? `Resendable after ${sendEmailTime} s` : 'Resend code' }</IonButton>
      </IonModal>
    </form>
  );
}

const mapStateToProps = (state: { token: any; }) => ({
  token: state.token,
});

const mapDispatchToProps = {
  setToken
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationInput);