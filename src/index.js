import './css/style.scss';

import App from './js/app';

window.onload = () => {
  const rootEl = document.getElementById('app');
  const app = new App(rootEl);
  app.init();
};
