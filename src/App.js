import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import "antd/dist/antd.css"
import { adminRoutes } from './routes';
import Frame from './components/Frame/index'

function App() {
  return (
    <Frame>
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
    </Frame>
  );
}

export default App;
