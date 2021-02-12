import axios from 'axios';
//import Contact from './Contact';
import {useState,useEffect} from 'react';

const Contacts = ()=>{
   const [contacts, setContacts] = useState([]); 
    useEffect(()=>{
        axios.get('https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/3/contacts',{
            headers:{
                'content-type': 'application/json',
                'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
            }
        }).then((response)=>{
            const contacts = response.data.contacts;
            console.log(contacts);
            setContacts(contacts);
        })
    },[])
    return (
        <div>
        <h1>Contacts</h1>
        {contacts &&
            <div >
               {contacts.map((contact)=><p key={contact.id}>{contact.id}</p>)}
            </div>}
        </div>
    );
}

export default Contacts;