import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Contact from './Contact';

const Contacts = () => {
  const [contacts, setcontacts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        let getContacts = await axios.get('https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts?limit=10', {
          headers: {
            'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0',
          },
        });
        getContacts = getContacts.data.contacts;
        setcontacts(getContacts);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      {contacts.length > 0 && (
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id} className="table__row">
            <Contact key={contact.id} contact={contact} />
          </tr>
        ))}
      </tbody>
      )}
    </>
  );
};

export default Contacts;
