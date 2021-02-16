import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import contacts from '../fixtures/contacts';
import Contacts from '../../components/Contacts';

let wrapper;
describe('Render component and fetch from api',()=>{

  beforeEach(()=>{
    jest.mock('axios');
    axios.get = jest.fn();
    axios.get.mockImplementationOnce(() => Promise.resolve(contacts));
    wrapper = shallow(<Contacts/>);
  })
  
  test('should render Contacts correctly', () => {
      expect(wrapper).toMatchSnapshot();
  });
  
  test('fetches contacts from the API', async ()=>{
      expect(wrapper.state('contacts').length).toBeGreaterThan(0);
  });
})


describe('Render error message',()=>{
  beforeEach(()=>{
    let errorMessage = 'Request failed with status code 403';
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    wrapper = shallow(<Contacts/>);
  });

  test('should render error message when api call fails', async ()=>{
      expect(wrapper.state('error').length).toBeGreaterThan(0);
  });
  

})

