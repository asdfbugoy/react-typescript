import React from "react"

const CustomerView = ({customer, onChangePage}) => {
    const onClickSearch = () => (e) => {
        e.preventDefault()
        onChangePage('search')
    }
    return (
        <React.Fragment>
            <div className="card shadow">
                <div className="card-body">
                    <div className="text-right avenirHeavy"><a href="javascript:void(0)" onClick={onClickSearch()}>Change Customer</a></div>
                    <div className="row">
                        <div className="col-xl-2 col-md-3">
                            <div className="special-text avenirMedium">Company Name:</div>
                        </div>
                        <div className="col-xl-10 col-md-9 mb-3">
                            <div>{customer.accountName}</div>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <div className="special-text avenirMedium">Company Code:</div>
                        </div>
                        <div className="col-xl-10 col-md-9 mb-3">
                            <div>{customer.accountBRN}</div>
                        </div>
                        <div className="col-xl-2 col-md-3">
                            <div className="special-text avenirMedium">Address:</div>
                        </div>
                        <div className="col-xl-10 col-md-9 mb-3">
                            <div>{customer.primaryAddress.blockNo} {customer.primaryAddress.streetName} {customer.primaryAddress.unitNo} {customer.primaryAddress.countryName} {customer.primaryAddress.postalCode}</div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CustomerView