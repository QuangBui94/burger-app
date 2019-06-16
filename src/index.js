
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import BurgerBuilderReducer from './store/reducers/BurgerBuilder';
import orderReducer from './store/reducers/Order';
import authReducer from './store/reducers/Auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const pReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(pReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

const app = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>;
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>    
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
