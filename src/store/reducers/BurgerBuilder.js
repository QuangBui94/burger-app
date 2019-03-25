import * as actionTypes from '../actions/actionTypes';
import { objectUpdated } from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 0,
    purchaseStatus: true,
    error: false,
};

const INGREDIENT_PRICES = {
    meat: 1.3,
    cheese: 0.5, 
    salad: 0.6,
    bacon: 0.8
}

const reducer = (state = initialState, action) => {
    const newIngredient = {...state.ingredients};
    let sumArr = null;

    const addIngredientHandler = (state, action) => {
        newIngredient[action.ingreName] = state.ingredients[action.ingreName] + 1;
        sumArr = Object.values(newIngredient).reduce((acc, cur) => {
            return acc + cur;
        }, 0)
            return objectUpdated(state, {
                ingredients: newIngredient,
                price: state.price + INGREDIENT_PRICES[action.ingreName],
                purchaseStatus: sumArr <= 0})
    }

    const removeIngredientHandler = (state, action) => {
        newIngredient[action.ingreName] = state.ingredients[action.ingreName] - 1;
        sumArr = Object.values(newIngredient).reduce((acc, cur) => {
            return acc + cur;
        }, 0)
            return objectUpdated(state, {
                ingredients: newIngredient,
                price: state.price - INGREDIENT_PRICES[action.ingreName],
                purchaseStatus: sumArr <= 0
            });
    }

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredientHandler(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredientHandler(state, action);
        case actionTypes.FETCH_INGREDIENT:
            return objectUpdated(state, {ingredients: action.ingredient, price: 0});
        case actionTypes.SET_INGREDIENT_FAILED:
            return objectUpdated(state, {error: true});
        default:
            return state;
    };
}

export default reducer;