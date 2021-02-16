import axios from 'axios';
import React from 'react';
import Table from './Table';

export default class Contacts extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: '',
            contacts: []
        };
    }
    componentDidMount(){
        (async()=>{
            try{
                let contacts = await axios.get('https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts?limit=3',{
                    headers:{
                        'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
                    }
                });
                contacts = contacts.data.contacts;
                this.setState(()=>({contacts}))
            }
            catch(error){
                this.setState(()=>({error: error.message}))
            }
        })();
    }
    render(){
        return (
            <div className="table__container">
                <p>{this.state.error}</p>
                {this.state.contacts.length > 0 &&
                    <Table contacts={this.state.contacts}/>
                }
        </div>
        )
    }
}
// import {useState} from 'react';

// const Contacts = ()=>{
//    const [contacts, setContacts] = useState([]); 
//    const [error, setError] = useState('');

//     React.useEffect(()=>{
//         (async()=>{
//             try{
//                 let allContacts = await axios.get('https://cors-anywhere.herokuapp.com/https://sahmed93846.api-us1.com/api/3/contacts?limit=3',{
//                     headers:{
//                         'Api-Token':'bcd062dedabcd0f1ac8a568cdcf58660c44d7e79b91763cc1a5d0c03d52c522d851fceb0'
//                     }
//                 });
//                 allContacts = allContacts.data.contacts;
//                 setContacts(allContacts);
//             }
//             catch(error){
//                 setError(error.message);
//             }
            
//          })();
//     },[]);
//     return (
//         <div className="table__container">
//             <p>{error}</p>
//             {contacts.length > 0 &&
//                 <Table contacts={contacts}/>
//             }
//         </div>
//     );
// }

// export default Contacts;