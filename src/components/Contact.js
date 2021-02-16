import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Contact = (contact)=>{
    const {id,firstName, lastName} = contact.contact;
    const [name, setName] = useState('');
    const [deals, setDeals] = useState(-1);
    const [location, setLocation] = useState('');
    const [tags, setTags] = useState(''); 
    const [error, setError] =  useState('');
  
    const isLoaded = ()=>{
        return  name && tags;
    }
    useEffect(()=>{
       (async()=>{
            try{
                let response = await axios.get(`https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/${id}`,{
                    headers:{
                        'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
                    }
                });
                let tagResponse = await axios.get(`https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts/${id}/contactTags`,{
                    headers:{
                        'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
                    }
                });
                let contactTags = [];
                tagResponse.data.contactTags.forEach(async (contactTag)=>{
                    let tag = await axios.get(`https://cors-anywhere.herokuapp.com/${contactTag.links.tag}`,{
                        headers:{
                            'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
                        }
                    });
                    contactTags.push(tag.data.tag);
                });
                let geoAddress = response.data.geoAddresses ? `${response.data.geoAddresses.city}, ${response.data.geoAddresses.state}, ${response.data.geoAddresses.country}` : ' ';
                setName(`${firstName} ${lastName}`);
                setDeals(response.data.deals.length);
                setLocation(geoAddress);
                setTags(contactTags);
            }
            catch(error){
                setError(error.message);
            }
        })();
    });
    return (
        <>
        { isLoaded() &&
            <>
                {error && <p>{error}</p>}
            <>
                <input type="checkbox"/> 
                <td>{name}</td>
                <td>$100</td>
                <td>{location}</td>
                <td>{deals}</td>
                <td>tags</td>
            </>
            </>
        }
        </>
    );
}

export default Contact;