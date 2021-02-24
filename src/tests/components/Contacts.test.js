import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import contacts from '../fixtures/contacts';
import Contacts from '../../components/Contacts';

let wrapper;
describe('Render component and fetch from api', () => {
  beforeEach(async () => {
    jest.mock('axios');
    axios.get = jest.fn();
    axios.get.mockImplementationOnce(() => Promise.resolve(contacts));
    wrapper = mount(<Contacts />, { attachTo: document.createElement('table') });
    await act(
      () => new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      }),
    );
  });

  test('should render Contacts correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('fetches contacts from the API', async () => {
    expect(wrapper.find('tbody').length).toBe(1);
  });
});

describe('Render error message', () => {
  beforeEach(async () => {
    const errorMessage = 'Request failed with status code 403';
    axios.get.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));
    wrapper = mount(<Contacts />);
    await act(
      () => new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      }),
    );
  });

  test('table body is not rendered when the api call fails', async () => {
    expect(wrapper.find('tbody').length).toBe(0);
  });
});
