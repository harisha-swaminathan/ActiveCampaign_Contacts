import React, { useState, useEffect } from 'react';
import axios from 'axios';
import numeral from 'numeral';

const Contact = (contact) => {
  const { id, firstName, lastName } = contact.contact;

  const [name, setName] = useState('');
  const [deals, setDeals] = useState(-1);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState(0);

  const isLoaded = () => {
    const loaded = !!name && deals > -1 && typeof location === 'string' && tags.length > 0;
    return loaded;
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/${id}`, {
          headers: {
            'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0',
          },
        });

        const tagResponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/${id}/contactTags`, {
          headers: {
            'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0',
          },
        });

        await tagResponse.data.contactTags.forEach(async (contactTag) => {
          const tag = await axios.get(`https://cors-anywhere.herokuapp.com/${contactTag.links.tag}`, {
            headers: {
              'Api-Token': 'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0',
            },
          });
          setTags((prevTags) => [...prevTags, tag.data.tag.tag]);
        });

        response.data.deals.forEach((deal) => {
          if (deal.currency === 'usd') {
            setValue(value + deal.value);
          } else if (deal.currency === 'eur') {
            setValue(value + (deal.value) * 1.21);
          } else if (deal.currency === 'aud') {
            setValue(value + (deal.value) * 0.77);
          }
        });

        const geoAddress = response.data.geoAddresses ? `${response.data.geoAddresses[0].city}, ${response.data.geoAddresses[0].state}, ${response.data.geoAddresses[0].country}` : ' ';
        const totalDeals = response.data.deals ? response.data.deals.length : 0;

        setName(`${firstName} ${lastName}`);
        setDeals(totalDeals);
        setLocation(geoAddress);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  return (
    <>
      {!isLoaded() && error.length === 0 && <td colSpan="6" align="center">Loading...</td>}
      { isLoaded()
        && (
        <>
          <td><input type="checkbox" /></td>
          <td>
            <img src="/man.png" alt="avatar" className="table__avatar" />
            {name}
          </td>
          <td>{value === 0 ? '' : numeral(value).format('$0,0.00')}</td>
          <td>{location}</td>
          <td>{deals}</td>
          <td>
            {tags.map((tag, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <span key={i}>
                {i === tags.length - 1 ? tag : `${tag}, `}
              </span>
            ))}
          </td>
        </>
        )}
    </>
  );
};

export default Contact;
