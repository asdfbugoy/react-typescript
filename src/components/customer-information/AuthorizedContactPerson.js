import React from "react"
import { observer } from "mobx-react"
import Contact from './Contact'

const AuthorizedContactPerson = ({ customer }) => {
    const { isSameContact } = customer
    const onClick = (status) => (e) => {
        e.preventDefault()
        customer.toggleSameContact(status)
    }
    const { contactDetail, authorizedContactDetail } = customer
   
    return (
        <React.Fragment>
            <h3 className="title-text text-center mt-4 mb-4">Authorized Contact Person</h3>
            <div className={`card shadow mb-3 border ${isSameContact ? 'checked' : ''}`}>
                <div className="card-body pointer" onClick={onClick(true)}>
                    <div className="row">
                        <div className="col-1">
                            <span className={`fas fa-check-circle mb-0 red ${isSameContact ? '' : 'gray'}`} />
                        </div>
                        <div className="col">
                            <div className="special-text avenirMedium"><b>Same as Contact information</b></div>
                            {isSameContact && <React.Fragment>
                                <div>{contactDetail.firstName} {contactDetail.lastName}</div>
                                <div>{contactDetail.contactEmail}</div>
                                <div>{contactDetail.contactNumber}</div>
                            </React.Fragment>}
                        </div>
                    </div>
                </div>
            </div>
            <div className={`mb-3 card shadow border ${!isSameContact ? 'checked' : ''}`}>
                <div className="card-body pointer" onClick={onClick(false)}>
                    <div className="row">
                        <div className="col-1">
                            <span className={`fas fa-check-circle mb-0 red ${!isSameContact ? '' : 'gray'}`} />
                        </div>
                        <div className="col">
                            <p className="special-text avenirMedium"><b>Different Contact</b></p>
                            {!isSameContact && <Contact 
                                contact={authorizedContactDetail} 
                                accountId={customer.accountId}
                            />}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default observer(AuthorizedContactPerson)