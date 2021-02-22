import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import contact from '../fixtures/contact';
import Contact from '../../components/Contact';

let wrapper;
describe('Render component and fetch from api', () => {
  beforeEach(() => {
    jest.mock('axios');
    axios.get = jest.fn();
    axios.get.mockImplementationOnce(() => Promise.resolve(contact));
    wrapper = mount(<Contact key={1} contact={contact.contact} />);
  });

  test('should render Contact correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
