import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from '@/api/login';
import { useAlert } from '@/hooks/alert-hook';
import { useLoading } from '@/hooks/loading-hook';
import CustomInput from '@/components/custom-input';
import { get, isEmpty } from 'lodash';
import { IonButton, IonList } from '@ionic/react';
import { setToken, setUserInfo, mapStateToProps } from '@/redux/actions';
import { validatePassword, validateEmail } from '@/utils/validate'
import { encryptPassword } from '@/utils/common';
import './index.scss'
const LoginInput: React.FC<any> = ({ token, setToken, setUserInfo, messageApi, setInputVisible, updateTitle, ...props }) => {
  const { showAlert } = useAlert();
  const { startLoading, stopLoading } = useLoading();
  const [isTouched, setTouched] = useState<boolean>(false);
  const [warnings, setWarnings] = useState<Array<any>>([]);
  const [email, setEmail] = useState('qq458247220@126.com');
  const [password, setPassword] = useState<string>('1qaz@WSX');
  const history = useHistory();

  useEffect(() => {
    updateTitle('Login');
  }, []);

  const handleLogin = async () => {
    try {
      setTouched(true);
      if (!isEmpty(warnings) ) {
        return
      }
      await startLoading();
      const res: any = await login({ email, password: encryptPassword(password) });
      const statusCode = get(res, 'statusCode');
      if (statusCode === 200) {
        setToken(res.token);
        setUserInfo(get(res, 'data'));
        history.push('/dashboard');
        return
      }
      throw new Error(res.errors);
    } catch (ex: any) {
      showAlert(get(ex, 'response.data.message',ex));
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

  return (
    <form>
      <IonList>
        <CustomInput
          id="email"
          type="email"
          label="Email"
          onInputChange={ validateEmail}
          value={ email }
          setValue={ setEmail }
          setTouched={ setTouched }
          handleWarningData={ handleWarningData }
          isTouched={ isTouched }
          requiredMassage='Please enter your email address'
          required
        />

        <CustomInput
          id="password"
          label="Password"
          type="password"
          onInputChange={ validatePassword }
          value={ password }
          setValue={ setPassword }
          setTouched={ setTouched }
          handleWarningData={ handleWarningData }
          isTouched={ isTouched }
          requiredMassage='Please enter your password'
          required
          isEye
        />
        <div className='forgot-password-box'><a onClick={ () => setInputVisible('forget')  }>forget the password?</a></div>
        <IonButton className='orange-btn mg-t-20' disabled={ !isEmpty(warnings) } onClick={ handleLogin }>
          Login
        </IonButton>
        <IonButton className='white-btn mg-t-10' fill="clear" expand="block" onClick={ () => setInputVisible('registration') }>
          Registration
        </IonButton>
      </IonList>
    </form>
  );
}

export default connect(mapStateToProps, { setToken, setUserInfo })(LoginInput);