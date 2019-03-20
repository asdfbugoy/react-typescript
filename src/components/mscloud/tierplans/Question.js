import React from 'react'
import { observer } from 'mobx-react';
const Question = (props) => {
    const { product, toggleLoading } = props
    const { sourceList, question, setSelectedValue, setActive } = product.question
    const onClick = (value) => (e) => {
        e.preventDefault()
        toggleLoading(true)
        product.getPackageOffer(value).then(() => {
            setSelectedValue(value)
            setActive()
            toggleLoading(false)
        })
    }
    return (
        <React.Fragment>
            <div className="mb-3 mt-3 special-text">{question}</div>
            <div className="row">
                {sourceList.map((d, i) => <div key={i} className="col-md-4 col-lg-3 mb-3">
                    <a
                        href=""
                        className={`card border h-100 ${d.isSelected ? 'active' : ''}`}
                        data-toggle="tooltip"
                        data-placement="top"
                        title=""
                        onClick={onClick(d.value)}
                    >
                        <div className="position-absolute ml-2 mt-2">
                            <i className="fas fa-check-circle" />
                        </div>
                        <div className="card-body">
                            <div className="pt-4 pb-4 text-center">{d.label}</div>
                        </div>
                    </a>
                </div>)}
            </div>
        </React.Fragment>
    )
}

export default observer(Question)