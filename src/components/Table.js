/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Contacts from './Contacts';
import ErrorsContext from '../context/errorsContext';

function Table() {
  const [error, setError] = useState('');
  return (
    <ErrorsContext.Provider value={{ error, setError }}>
      {!!error && (
      <p className="table__error">
        {error}
        . Refresh and try again
      </p>
      )}
      <div className="table">
        <div className="filterBar">
          <div>
            <button className="filterBar__button" type="button">Edit</button>
            <button className="filterBar__button" type="button">More...</button>
          </div>
          <div>
            <select className="filterBar__dropdown" defaultValue="All tags">
              <option>All tags</option>
            </select>
            <select className="filterBar__dropdown" defaultValue="All locations">
              <option>All locations</option>
            </select>
            <input
              className="filterBar__search"
              type="text"
              placeholder="Search"
              readOnly
            />
          </div>
        </div>
        <table>
          <thead>
            <tr className="table__header">
              <th><input type="checkbox" /></th>
              <th>Contact</th>
              <th>Total Value</th>
              <th>Location</th>
              <th>Deals</th>
              <th>Tags</th>
            </tr>
          </thead>
          <Contacts />
        </table>
      </div>
    </ErrorsContext.Provider>
  );
}

export default Table;
