import * as actionTypes from './actionTypes';
import axios from 'axios';

export const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOGOUT_HANDLER
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expireDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOG_OUT
    }
}

export const logout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, timeout * 1000);
    }
}

export const resetErrorMessage = () => {
    return {
        type: actionTypes.RESET_ERROR_MESSAGE
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        tokenId: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        message: error.message,
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true 
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBxYBv_-sVcI-ZN46ebaBsXs9RQSnOL_Lw';
        if (isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBxYBv_-sVcI-ZN46ebaBsXs9RQSnOL_Lw';
        }
        axios.post(url, authData)
            .then(res => {
                dispatch(authSuccess(res.data.idToken, res.data.localId));
                dispatch(logout(res.data.expiresIn));
                const expireDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expireDate', expireDate);
                localStorage.setItem('userId', res.data.localId)
            })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error))
            })
    }
}

export const authCheckState = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return dispatch => {
            dispatch(authLogout())
        }
    } else {
        const expireDate = new Date(localStorage.getItem('expireDate'))
        if (expireDate < new Date()) {
            return dispatch => {
                dispatch(authLogout())
            }
        } else {
            const remainedExpireTime = (expireDate.getTime() - new Date().getTime()) / 1000;
            const userId = localStorage.getItem('userId')
            return dispatch => {
                dispatch(authSuccess(token, userId));
                dispatch(logout(remainedExpireTime))
            }
        }
    }
}
