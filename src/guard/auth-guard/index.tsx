import React from 'react';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
import { useIonAlert } from '@ionic/react';
import store from '@/redux/store';

export const PrivateRoute: React.FC<{ path: string; component: any }> = ({
  path,
  component: Component,
}) => {

  const isAuthenticated = () => {
    const someValue = store.getState();
    if (!someValue.token) {
      presentAlert({
        cssClass: 'warning-alert',
        header: 'invalid token',
        htmlAttributes : {
          'aria-label': 'alert dialog',
        },
        message: 'Please log in again',
        buttons: [
          {
            text: 'close',
            htmlAttributes: {
              'aria-label': 'close',
            },
          },
        ],
      });
    }
    return !!someValue.token;
  };

  const [presentAlert] = useIonAlert();

  return (
    <Route
      path={ path }
      render={ (props) =>
        isAuthenticated() ? (
          <Component { ...props } />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};