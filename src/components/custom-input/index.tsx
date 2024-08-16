import React, { useState, useEffect } from 'react';
import { IonInput, IonIcon } from '@ionic/react';
import { eye, eyeOff } from 'ionicons/icons';
import './index.scss'
const CustomInput: React.FC<any> = ({ 
  id, 
  label, 
  type = 'text', 
  className, 
  value, 
  onInputChange, 
  counter, 
  required = false, 
  requiredMassage, 
  maxlength, 
  minlength, 
  counterFormatter, 
  setValue = ()=>{}, 
  isEye = false, 
  isTouched, 
  setTouched = ()=>{}, 
  handleWarningData= ()=>{}, 
  children, 
  ...props }) => {
  const [error, setError] = useState('');
  const [showValue, setShowValue] = useState(false);

  const handleInputChange = (e: any, isTouched:boolean) => {
    setTouched(isTouched);
    const value = e.target.value;
    const errorMassage = onInputChange ? onInputChange(value) : null;
    if (errorMassage) {
      setError(errorMassage);
      handleWarningData({id, message: errorMassage})
      return
    }
    setError('');
    handleWarningData({id, message: ''})
  };

  const handleIonBlur = () => {
    if (required && !value) {
      setError(requiredMassage);
      handleWarningData({id, message: requiredMassage})
    }
  };

  const toggleValueVisibility = () => {
    setShowValue(!showValue);
  };

  useEffect(() => {
    handleIonBlur();
    handleInputChange({ target: { value }}, (required && !value )? false : true );
    return () => {
    };
  }, []);

  return (
    <div>
      <IonInput
        className={ `${(error && isTouched)&& 'ion-invalid ion-isTouched red-label'} ${required && 'required-label'} hidder-border input-field ${className}` }
        label={ label }
        type={ showValue ? 'text' : type }
        labelPlacement="floating"
        errorText=' '
        value={ value }
        onIonChange={ (e) => handleInputChange(e,true) }
        onIonInput={ (e) => setValue(e.detail.value as string) }
        maxlength={ maxlength }
        minlength={ minlength }
        counter={ counter }
        counterFormatter={ counterFormatter }
        onIonBlur={ handleIonBlur }
        required={ required }
      >
        { children && children }
        { isEye && (
          <IonIcon
            className='eye-icon'
            slot="end"
            icon={ showValue ? eye : eyeOff }
            onClick={ toggleValueVisibility }
          />
        ) }
      </IonInput>
      { (error && isTouched)&& <div style={ { color: 'red', fontSize: '12px' } }>{ error }</div> }
    </div>
  );
};

export default CustomInput;
