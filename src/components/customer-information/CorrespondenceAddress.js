import React from "react"
import { observer } from "mobx-react"
import CompactAddressViewItem from '../../components/CompactAddressViewItem';

const CorrespondenceAddress = (props) => {

    const onSelectAddress = (status) => (e) => {
        e.preventDefault()
        props.customer.toggleSameAddress(status);
    }

    const { primaryAddress, correspondenceAddress, isSameAddress } = props.customer;
    
    return (
        <React.Fragment>
            <h3 className="title-text text-center mt-4 mb-4">Correspondence Address</h3>
            <div className={`card shadow mb-3 border ${isSameAddress ? 'checked' : ''}`}>
                <div className="card-body pointer" onClick={ onSelectAddress(true) }>
                    <div className="row">
                        <div className="col-1">
                            <span className={`fas fa-check-circle mb-0 red ${isSameAddress ? '' : 'gray'}`} />
                        </div>
                        <div className="col">
                            <p className="special-text avenirMedium">
                                <b>Same as registered address</b>
                            </p>
                            {primaryAddress.isValid && <span>{primaryAddress.unitNo} {primaryAddress.address}</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className={`card shadow border ${!isSameAddress ? 'checked' : ''}`} >
                <div className="card-body pointer" onClick={ onSelectAddress(false) }>
                    <div className="row">
                        <div className="col-1">
                            <span className={`fas fa-check-circle mb-0 red pointer ${!isSameAddress ? '' : 'gray'}`}  />
                        </div>
                        <div className="col">
                            <p className={`special-text avenirMedium ${isSameAddress ? 'mb-0' : ''}`}>
                                <b>Different Address</b>
                            </p>
                            {!isSameAddress && <CompactAddressViewItem address={correspondenceAddress} />}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default observer(CorrespondenceAddress)