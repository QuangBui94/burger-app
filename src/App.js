import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Cart from './containers/Cart/Cart';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Log out/Logout';
import OrderDetails from './containers/OrderDetails/OrderDetails';
import * as actionsCreator from './store/actions/index';

class App extends Component {
  componentWillMount() {
    this.props.onAuthCheckState();
  }

  render() {
    
    return (
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Cart} />
            <Route path="/logout" component={Logout} />
            <Route path="/auth" component={Auth} />
            <Route path="/order-details" component={OrderDetails} />
          </Switch>
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState : () => dispatch(actionsCreator.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
