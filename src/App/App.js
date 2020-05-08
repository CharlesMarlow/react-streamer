import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import ExperimentsList from '../components/experiments/ExperimentsList/ExperimentsList';
import ExperimentDetails from '../components/experiments/ExperimentDetails/ExperimentDetails';
import Header from '../components/shared/Header';
import history from '../history';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={ExperimentsList} />
            <Route
              path="/experiments/:id"
              exact
              component={ExperimentDetails}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
