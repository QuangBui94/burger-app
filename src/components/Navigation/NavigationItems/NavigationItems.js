import React, { Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Icon from '../../../UI/Icon/Icon';
import styles from './NavigationItems.module.css';

class NavigationItems extends Component {
    render() {
        let linkArr = [
            {link: 'My Burger', to:'/'}, 
            {link: 'Sign up', to:'/auth'}
        ];

        if(this.props.isAuthenticated) {
            linkArr = [
                {link: 'My Burger', to:'/'}, 
                {link: 'Log out', to:'/logout'},
                {link: <Icon class={'cart'}/>, to:'/orders'}
            ];
        }
        return (
            <ul className={styles.NavigationItems}>
                {
                    linkArr.map(el => {
                        return (
                            <li key={el.link}>
                                <NavLink to={el.to} exact activeClassName={styles.active}>{el.link}</NavLink>
                            </li>
                        )   
                    })
                }   
            </ul>
        )
    }
}
   
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.tokenId
    }
}

export default withRouter(connect(mapStateToProps)(NavigationItems));