import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import "antd/dist/antd.css"
import { adminRoutes } from './routes';

function App() {
  return (
    <div className="App">
      <h1>app component</h1>
      <Switch>
        {adminRoutes.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              exact
              render={routeProps => {
                return <route.component {...routeProps} />
              }}
            />
          )
        })

        }
        <Redirect to="/404" />
      </Switch>
    </div>
  );
}

export default App;
