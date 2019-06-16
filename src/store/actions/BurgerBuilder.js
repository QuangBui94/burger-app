import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const setIngredient = (ingredient) => {
    return {
        type: actionTypes.FETCH_INGREDIENT,
        ingredient: ingredient
    }
} 

export const setIngredientFailed = () => {
    return {
        type: actionTypes.SET_INGREDIENT_FAILED
    }
}

export const fetchIngredient = () => {
    return dispatch => {
        axios.get('https://burger-app-7aaf7.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredient(response.data))
            })
            .catch(() => {
                dispatch(setIngredientFailed())
            })
    }
}

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingreName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingreName: name
    }
}

// export const purchaseInit = () => {
//     return {
//         type: actionTypes.PURCHASE_INIT
//     }
// }