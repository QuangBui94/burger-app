import React from 'react';

import BurgerIngredients from '../Burger/BurgerIngredients/burgerIngredients';
import './Burger.css';

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredient)
    .map(igKey => {
        return [...Array(props.ingredient[igKey])].map((el, index) => (
                // <CSSTransition 
                // mountOnEnter
                // unmountOnExit
                // key={igKey + index}
                // timeout={200}
                // classNames='fade'>
                    <BurgerIngredients key={igKey + index} type={igKey}/>
                // </CSSTransition> 
        ))
    }).reduce((acc, cur) => {
        return acc.concat(cur);
    }, []);

    let num = Object.values(props.ingredient).reduce((cur, acc) => {
        return acc + cur;
    }, 0)

    if (num === 0) {
        transformedIngredients = <div>Please add ingredients here</div>
    } 

    let classBurger = 'Burger';
    
    if (props.order) {
        classBurger = 'order';
    }

    return (
        <div className={classBurger}>
        {/* // <TransitionGroup component='ul' className={classBurger}> */}
            <BurgerIngredients type={'bread-top'} />
               {transformedIngredients}        
            <BurgerIngredients type={'bread-bottom'} />
        {/* // </TransitionGroup> */}
        </div>
    ) 
}

export default Burger;
