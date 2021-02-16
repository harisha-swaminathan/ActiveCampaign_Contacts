import React from 'react';
import { shallow } from 'enzyme';
import contacts from '../fixtures/contacts';
import Table from '../../components/Table';

test('should render ExpenseDashboardPage correctly', () => {
  const wrapper = shallow(<Table contacts={contacts.data.contacts}/>);
  expect(wrapper).toMatchSnapshot();
});
