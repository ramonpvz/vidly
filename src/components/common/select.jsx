import React from 'react';

const Select = ({name, label, options, error, onChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} className="form-control" id={name} onChange={onChange}>
                {options.map( g => <option key={g._id} value={g._id}>{g.name}</option>)}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}
 
export default Select;