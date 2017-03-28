import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import './index.css';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
    /* eslint-disable no-console */
    console.error(error.stack);
  },
});

// 2. Plugins
// app.use({});
app.use(createLoading({
  effects: true,
}));

// 3. Model
app.model(require('./models/exercise'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
