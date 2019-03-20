import React from "react"
import Contact from './Contact'

const ContactInformation = ({ customer }) => {
    return (
        <React.Fragment>
            <h3 className="title-text text-center mt-4 mb-4">Contact Information</h3>
            <div className="card shadow">
                <div className="card-body">
                    <Contact 
                        contact={customer.contactDetail} 
                        accountId={customer.accountId}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ContactInformation