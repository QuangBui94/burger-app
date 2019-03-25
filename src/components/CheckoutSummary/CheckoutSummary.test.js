import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckoutSummary from './CheckoutSummary';
import Button from '../../UI/Button/Button';

configure({adapter: new Adapter()})

describe('<CheckoutSummary />', () => {
    it('should render 2 <Button /> elements', () => {
        const wrapper = shallow(<CheckoutSummary />);
        expect(wrapper.find(Button)).toHaveLength(2);
    });
})