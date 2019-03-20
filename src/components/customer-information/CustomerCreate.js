import React from "react"
import { observer } from "mobx-react"
import CompactAddressViewItem from '../../components/CompactAddressViewItem';

const CustomerCreate = ({ customer, onChangePage }) => {
    const { accountName, accountBRN, primaryAddress } = customer
    const onChange = () => (e) => {
        customer.onChange({
            name: e.target.name,
            value: e.target.value
        })
    }
    const onClickCancel = () => (e) => {
        e.preventDefault()
        onChangePage('search')
    }
    return (
        <section className="pb-5">
            <div className="card shadow">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="">Company Code:</label>
                            <input className="form-control" type="text" placeholder="e.g: BRN1234567" value={accountBRN} onChange={onChange()} name="accountBRN" />
                        </div>
                        <div className="col-md mb-3">
                            <label htmlFor="">Company Name:</label>
                            <input className="form-control" type="text" placeholder="e.g: FRESH LOOK CONSTRUCTION PTE. LTD" value={accountName} onChange={onChange()} name="accountName" />
                        </div>
                    </div>
                    <CompactAddressViewItem address={primaryAddress} />
                    <div className="text-center mt-5">
                        <button type="button" className="btn btn-singtel-go-primary mr-1">Save</button>
                        <button type="button" onClick={onClickCancel()} className="btn btn-singtel-go-primary-black">Cancel</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(CustomerCreate)