import React from "react"
import { PDF_TnC } from '../../stores/global';
import Checkbox from '@material-ui/core/Checkbox'

const TechnicalTermsCondition = ({ customer }) => {
    const onChange = () => (e) => {
        customer.toggleTechnicalTermsCondition(e.target.checked)
    }
    return (
        <section className="">
            <div className="card shadow mb-3 border">
                <div className="card-body">
                    <div className="row">
                        <div className="col-1">
                            <Checkbox className="p-0" onChange={onChange()} checked={customer.isTechnicalTermsCondition} />
                        </div>
                        <div className="col">
                            <p className="m-0 avenirHeavy">I have advised customer on the <a href={PDF_TnC} target="_blank">Design Assumptions</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TechnicalTermsCondition