import React from 'react'
import { QuantityComponent } from 'components/QuantityComponent'
const loop = [1,2,3]
const Card = (props) => {
    return <React.Fragment>
        {loop.map((d, i) => <article className={`card border shadow ${i < loop.length ? 'mb-4' : ''}`}>
            <section className="card-body p-3">
                <div className="row align-items-center mb-2">
                    <div className="col"><div className="sub-title-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, non!</div></div>
                    <div className="col-auto"><button className="btn btn-link p-0">EDIT</button></div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-1 col-sm-auto text-center d-none d-sm-block pr-0"><button className="btn btn-icon"><i className="fa fa-trash-alt"></i></button></div>
                    <div className="col-sm">
                        {loop.length > 1
                            ? <div className="background-very-light-gray pt-3 mb-3 mb-sm-0">
                                <ul className="row m-0 red">
                                    {loop.map((d, i) => <li className="col-sm-6 pr-0 mb-3 pl-0"><div className="pr-3 mr-3 dark-blue">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, aut.</div></li>)}
                                </ul>
                            </div>
                            : <div className="background-very-light-gray p-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, commodi?</div>}
                    </div>
                    <div className="col-sm-2 text-center pl-sm-0">
                        <QuantityComponent />
                        <i className="fa fa-check"></i>
                    </div>
                </div>
                <div className="row mt-3 text-center d-flex d-sm-none">
                    <div className="col"><button className="btn btn-icon"><i className="fa fa-pencil-alt"></i></button></div>
                    <div className="col"><button className="btn btn-icon"><i className="fa fa-trash-alt"></i></button></div>
                </div>
            </section>
        </article>)}
    </React.Fragment>
}

export default Card