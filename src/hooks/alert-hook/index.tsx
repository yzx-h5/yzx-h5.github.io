import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IonAlert } from '@ionic/react';
import { useHistory } from 'react-router-dom';


interface AlertContextProps {
  children: ReactNode;
}

interface AlertData {
  message: string;
}

interface AlertContextValue {
  showAlert: (message: string) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<AlertContextProps> = ({ children }) => {
  const [alertData, setAlertData] = useState<AlertData | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const showAlert = (message: string) => {
    setAlertData({ message });
    setIsOpen(true);
  };

  const hideAlert = () => {
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={ { showAlert, hideAlert } }>
      { children }
      { alertData && (
        <IonAlert
          isOpen={ isOpen }
          translucent
          animated
          backdropDismiss
          message={ alertData.message }
          buttons={ [{
            text: '关闭',
            handler: () => {
              if (alertData.message === 'Token is invalid') {
                history.push('/');
                window.location.reload()
              }
            }
          }] }
          cssClass='err-massage-alert'
          onDidDismiss={ () => { handleClose() } }
        ></IonAlert>
      ) }
    </AlertContext.Provider>
  );
};
