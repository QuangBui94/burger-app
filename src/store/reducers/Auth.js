import * as actionTypes from '../actions/actionTypes';
import { objectUpdated } from '../../shared/utility';

const initialState = {
    tokenId: null,
    userId: null,
    error: null,
    spinner: false,
    message: null
}

const logoutHandler = (state, action) => {
    return objectUpdated(state, {
        tokenId: null,
        userId: null
    })
}

const authLogout = (state, action) => {
    return objectUpdated(state, {
        tokenId: null,
        userId: null
    })
}

const resetErrorMessage = (state, action) => {
    return objectUpdated(state, {
        message: null
    })
}

const authStart = (state, action) => {
    return objectUpdated(state, {
        error: false,
        spinner: true
    })
}

const authSuccess = (state, action) => {
    return objectUpdated(state, {
        tokenId: action.tokenId,
        userId: action.userId,
        error: false,
        spinner: false
    })
}

const authFail = (state, action) => {
    return objectUpdated(state, {
        error: true,
        spinner: false,
        message: action.message
    })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.RESET_ERROR_MESSAGE: return resetErrorMessage(state, action);
        case actionTypes.AUTH_LOG_OUT: return authLogout(state, action);
        case actionTypes.LOGOUT_HANDLER: return logoutHandler(state, action);
        default:
            return state;
    }
}

export default reducer;