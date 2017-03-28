import React from 'react';
import { Router, Route, Redirect } from 'dva/router';
import MainLayout from './components/MainLayout/MainLayout';
import IndexPage from './routes/IndexPage';
import ExercisePage from './routes/ExercisePage';
import ExerciseResultPage from './routes/ExerciseResultPage.js';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route component={MainLayout}>
        <Route path="/" component={IndexPage} />
        <Redirect from="/exercise" to="/exercise/chinese" />
        <Route path="/exercise/:lang" component={ExercisePage} />
        <Route path="/exercise/:lang/result" component={ExerciseResultPage} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
