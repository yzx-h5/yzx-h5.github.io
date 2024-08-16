import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { IonRouterOutlet } from '@ionic/react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { PrivateRoute } from '@/guard/auth-guard'
import Login from '@/pages/login';
import Dashboard from '@/pages/dashboard';
import '@/theme/index.scss';

const AppRoute: React.FC = () => (
  <Router>
    <IonRouterOutlet>
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Switch location={location}>
              <Route exact path={["/", "/login"]} component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    </IonRouterOutlet>
  </Router>
);

export default AppRoute;
