import React from 'react';
import { mount } from 'enzyme';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import contact, { contactTags } from '../fixtures/contact';
import Contact from '../../components/Contact';

let wrapper;
const baseUrl = 'https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/';
const cors = 'https://cors-anywhere.herokuapp.com';

describe('Render component and fetch from api', () => {
  beforeEach(async () => {
    jest.mock('axios');
    axios.get = jest.fn();
    axios.get.mockImplementation((url) => {
      switch (url) {
        case `${baseUrl}contacts/${contact.contact.id}`:
          return contact;
        case `${baseUrl}contacts/${contact.contact.id}/contactTags`:
          return contactTags;
        case `${cors}/${contactTags.data.contactTags[0].links.tag}`:
          return { data: { tag: { tag: 'Keys' } } };
        case `${cors}/${contactTags.data.contactTags[1].links.tag}`:
          return { data: { tag: { tag: 'July Promos' } } };
        default:
          return new Error('Random error');
      }
    });
    wrapper = mount(<Contact key={1} contact={contact.contact} />, { attachTo: document.createElement('tr') });
    await act(
      () => new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      }),
    );
  });

  test('should render Contact correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  test('should render 6 td elements', () => {
    expect(wrapper.find('td').length).toBe(6);
  });
});

describe('Render loading and error', () => {
  beforeEach(() => {
    jest.mock('axios');
    axios.get = jest.fn();
    axios.get.mockImplementation((url) => {
      switch (url) {
        case `${baseUrl}contacts/${contact.contact.id}`:
          return contact;
        case `${baseUrl}contacts/${contact.contact.id}/contactTags`:
          return contactTags;
        case `${cors}/${contactTags.data.contactTags[0].links.tag}`:
          return { data: { tag: { tag: '' } } };
        case `${cors}/${contactTags.data.contactTags[1].links.tag}`:
          return { data: { tag: { tag: '' } } };
        default:
          return ('Random error');
      }
    });
  });

  test('should render Loading message correctly', async () => {
    wrapper = mount(<Contact key={1} contact={contact.contact} />, { attachTo: document.createElement('tr') });
    expect(wrapper).toMatchSnapshot();

    /* added the act() method after snapshot to test the
    loading message and avoid the "not wrapped in act(...)" warning */

    await act(
      () => new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      }),
    );
  });

  test('should render 1 td elements', async () => {
    wrapper = mount(<Contact key={1} contact={contact.contact} />, { attachTo: document.createElement('tr') });
    expect(wrapper.find('td').length).toBe(1);
    await act(
      () => new Promise((resolve) => {
        setImmediate(() => {
          wrapper.update();
          resolve();
        });
      }),
    );
  });
});
