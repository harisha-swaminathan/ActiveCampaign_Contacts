/* eslint-disable react/prop-types */
import Contact from './Contact';
import React from 'react';

function Table(props){
    return(
     <div className="table">
        {/* Setting all input values to readonly inorder to avoid the "add onchange handler" warning */}
        <div className="table__filterBar">
            <div>
                <button className="filterBar__button">Edit</button>
                <button className="filterBar__button">More...</button>
            </div>
           <div>
           <select className="filterBar__dropdown" value="tags">
                <option selected>All tags</option>
            </select>
            <select className="filterBar__dropdown" value="locations" readOnly>
                <option selected>All locations</option>
            </select>
            <input className="text-input"
              type="text"
              placeholder="Search"
              readOnly
            />
           </div>
        </div>
        {/* <div className="table__header">
            <input type="checkbox"/>
            <span>Contact</span>
            <span>Total Value</span>
            <span>Location</span>
            <span>Deals</span>
            <span>Tags</span>
        </div>
        <div className="table__rows">
            {props.contacts.map((contact)=>{
                return <div className="table__row">
                    <Contact key={contact.id} contact = {contact}/>
                </div>
            })}
        </div> */}
        <table>
            <tr className="table__header">
                <input type="checkbox"/> 
                <th>Contact</th>
                <th>Total Value</th>
                <th>Location</th>
                <th>Deals</th>
                <th>Tags</th>
            </tr>
            {props.contacts.map((contact)=>{
                return <tr key={contact.id}>
                    <Contact key={contact.id} contact = {contact}/>
                </tr>
            })}
        </table>
     </div>
    );
}

export default Table;






