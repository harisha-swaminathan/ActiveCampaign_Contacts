import axios from 'axios';
import React from 'react';
import Contact from './Contact';

export default class Contacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // eslint-disable-next-line react/no-unused-state
      error: '',
      contacts: [],
    };
  }

  componentDidMount() {
    (async () => {
      try {
        let contacts = await axios.get('https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts', {
          headers: {
            'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0',
          },
        });
        contacts = contacts.data.contacts;
        this.setState(() => ({ contacts }));
      } catch (error) {
        // eslint-disable-next-line react/no-unused-state
        this.setState(() => ({ error: error.message }));
      }
    })();
  }

  render() {
    const { contacts } = this.state;
    return (
      <>
        {contacts.length > 0
                    && (
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
  }
}
