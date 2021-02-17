import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contact = (contact) => {
  const { id, firstName, lastName } = contact.contact;
  const [name, setName] = useState('');
  const [deals, setDeals] = useState(-1);
  const [location, setLocation] = useState(null);
  const [, setError] = useState('');
  const [tags, setTags] = useState([]);

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
        const geoAddress = response.data.geoAddresses ? `${response.data.geoAddresses[0].city}, ${response.data.geoAddresses[0].state}, ${response.data.geoAddresses[0].country}` : ' ';
        const totalDeals = response.data.deals ? response.data.deals.length : 0;
        setName(`${firstName} ${lastName}`);
        setDeals(totalDeals);
        setLocation(geoAddress);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, []);
  return (
    <>
      { isLoaded()
               && (
               <>
                 <td><input type="checkbox" /></td>
                 <td>
                   <img src="/man.png" alt="avatar" className="table__avatar" />
                   {name}
                 </td>
                 <td>$100</td>
                 <td>{location}</td>
                 <td>{deals}</td>
                 <td>
                   {tags.map((tag, i) => (
                     // eslint-disable-next-line react/no-array-index-key
                     <span key={i}>
                       {tag}
                       ,
                       {' '}
                     </span>
                   ))}
                 </td>

               </>
               )}
    </>
  );
};

export default Contact;
