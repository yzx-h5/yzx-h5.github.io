import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import './theme/index.scss';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
);