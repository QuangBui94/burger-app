import React from 'react';

import BurgerIngredients from '../Burger/BurgerIngredients/burgerIngredients';
import styles from './Burger.module.css';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredient)
    .map(igKey => {
        return [...Array(props.ingredient[igKey])].map((el, index) => 
            <BurgerIngredients type={igKey} key={igKey + index}/> 
        )
    }).reduce((acc, cur) => {
        return acc.concat(cur);
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <div>Please add ingredients here</div>
    }

    let classBurger = styles.Burger;
    
    if (props.order) {
        classBurger = styles.order;
    }

    return (
        <div className={classBurger}>
            <BurgerIngredients type={'bread-top'} />
            {transformedIngredients}
            <BurgerIngredients type={'bread-bottom'} />
        </div>
    ) 
}

export default Burger;
