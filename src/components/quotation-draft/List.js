import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTER_SD_QUOTATION_DRAFT_EDIT, ROUTER_MS_QUOTATION_DRAFT_EDIT } from './../../stores/global'
import { observer } from "mobx-react"

const List = ({quoteStore, fetchQuote}) => {
    const onClickLoadMore = () => (e) => {
        fetchQuote(true)
    }
    const getLink = (name) => {
        switch (name) {
            case 'SD LAN':
                return ROUTER_SD_QUOTATION_DRAFT_EDIT
            case 'CLOUD':
                return ROUTER_MS_QUOTATION_DRAFT_EDIT
            default:
                return ROUTER_SD_QUOTATION_DRAFT_EDIT
        }
    }
    return (
        <React.Fragment>
            {quoteStore.quotes.length > 0 && <section className="pb-4">
                <h4 className="museo text-center pb-4 m-0">Search Result {quoteStore.isLoading && <i className='fas fa-spinner fa-spin'></i>}</h4>
                {quoteStore.quotes.map((data, key) => <div key={key} className="card shadow mb-4 border">
                    <div className="card-body">
                        <div className="row align-items-center text-md-left text-center">
                            <div className="col-md">
                                <h4 className="museo">
                                    <Link to={`${getLink(data.productName)}/${data.uuid}`}>
                                        {data.accountName !== '' ? data.accountName : '<i>Missing Information Quotation</i>'}
                                    </Link>
                                </h4>
                                <div><span className="avenirHeavy">Product:</span> {data.productName}</div>
                                <div><span className="avenirHeavy">Account Manager:</span> {data.am}</div>
                                <div><span className="avenirHeavy">Last Updated:</span> {data.getLastModifiedDate()}</div>
                            </div>
                            <div className="col-md border-left-md text-center">
                                <div className="row align-items-center">
                                    <div className="col-md">
                                        <span className="d-block mb-1">Upfront Payment</span>
                                        <span className="h3 museoMedium">{data.otc}</span>
                                    </div>
                                    <div className="col-md">
                                        <span className="d-block mb-1">Monthly Payment</span>
                                        <span className="h3 museoMedium">{data.rc}</span>
                                    </div>
                                    <div className="col-md-auto">
                                        <button
                                            type="button"
                                            disabled={data.isFetching}
                                            className="btn btn-icon"
                                            onClick={() => data.remove()}>
                                            <i className="fa fa-trash-alt qdl-trash" ></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}

                {quoteStore.showLoadMore && <div className="text-center">
                    <button type="button" className="btn btn-singtel-go-primary-black" onClick={onClickLoadMore()}>Load More {quoteStore.isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
                </div>}
            </section>}
            {!quoteStore.quotes.length && !quoteStore.isLoading && <h4 className="museo text-center pb-4 m-0">No Record Found</h4>}
        </React.Fragment>
    )
}

export default observer(List)