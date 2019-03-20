import React from "react"
import { observer } from "mobx-react";
import { ContactAutoSuggest } from '../common';

const Contact = ({contact, accountId}) => {
    const { firstName, lastName, contactNumber, contactEmail, mobileNumber } = contact;
    
    return (
        <React.Fragment>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label >First Name: <span className="red avenirHeavy">*</span></label>
                    <ContactAutoSuggest 
                        accountId={accountId}
                        contact={contact}
                        placeholder="e.g: John"
                        name="firstName"
                        value={firstName}
                    />
                </div>
                <div className="col-md-6">
                    <label>Last Name:</label>
                    <ContactAutoSuggest 
                        accountId={accountId}
                        contact={contact}
                        placeholder="e.g: White"
                        name="lastName"
                        value={lastName}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <label>Email Address: <span className="red avenirHeavy">*</span></label>
                    <ContactAutoSuggest 
                        accountId={accountId}
                        contact={contact}
                        placeholder="e.g: john.white@mail.com"
                        name="contactEmail"
                        value={contactEmail}
                    />
                </div>
                <div className="col-md-6 col-lg-3">
                    <label htmlFor="">Business Contact No.:
                        <span className="red avenirHeavy">*</span></label>
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="e.g: +65 6564 2342" 
                        name="contactNumber"
                        value={contactNumber} 
                        onChange={ (e) => contact.onChange({
                            name: e.target.name,
                            value: e.target.value
                        })}  />
                </div>
                <div className="col-md-6 col-lg-3">
                    <label htmlFor="">Mobile Number:</label>
                    <input 
                        className="form-control"
                        type="text"
                        placeholder="e.g: +65 6564 2342"
                        name="mobileNumber"
                        value={mobileNumber}
                        onChange={ (e) => contact.onChange({
                            name: e.target.name,
                            value: e.target.value
                        })}  />
                </div>
            </div>
        </React.Fragment>
    )
}

export default observer(Contact)