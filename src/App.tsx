import { IonApp, setupIonicReact } from '@ionic/react';
import { AlertProvider } from './hooks/alert-hook';
import { LoadingProvider } from './hooks/loading-hook';
import AppRoute from './routes/index';
import './theme/variables.scss';

setupIonicReact(
  {
    rippleEffect: false,
    mode: 'ios',
    innerHTMLTemplatesEnabled: true,
  });

const App: React.FC = () => (
  <IonApp>
    <AlertProvider>
      <LoadingProvider>
        <AppRoute />
      </LoadingProvider>
    </AlertProvider>
  </IonApp>
);

export default App;

