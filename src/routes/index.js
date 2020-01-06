import React from 'react'
// import CounterContainer from '../containers/CounterContainer'
import Header from '../components/Header'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import styled from '@emotion/styled'
import Login from "../components/login";
import PrivateRoute from "../utils/PrivateRoute";
import account from "../components/account"

const Container = styled.div`
  text-align: center;
`
export const history = createBrowserHistory()

function Routes() {
  return (
    <Router history={history}>
      <Container>
        <Header />
        <Switch>
          {/*<Route path="/" component={CounterContainer} />*/}
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/account" component={account} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
