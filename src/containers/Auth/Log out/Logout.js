import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionsCreator from '../../../store/actions/index';

class Logout extends Component {
    componentDidMount () {
        this.props.onLogoutHandler()
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutHandler: () => dispatch(actionsCreator.logoutHandler())
    }
}

export default connect(null, mapDispatchToProps)(Logout);