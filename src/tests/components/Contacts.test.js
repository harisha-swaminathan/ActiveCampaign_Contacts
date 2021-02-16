import React from 'react';
import {shallow} from 'enzyme';
import contacts from '../fixtures/contacts';
import Contacts from '../../components/Contacts';

let wrapper;
const realUseState = React.useState;

beforeEach(()=>{
    wrapper = shallow(<Contacts/>);
    jest.spyOn(React, "useEffect").mockImplementationOnce(f => f());
    jest.spyOn(React, 'useState').mockImplementationOnce(() => realUseState(contacts.data.contacts))
})
test('should render Contacts correctly', () => {
    expect(wrapper).toMatchSnapshot();
    console.log(wrapper)
});
