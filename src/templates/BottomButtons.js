import React from 'react'

const Button = (props) => {
    return <React.Fragment>
        <div className="row align-items-center text-center text-sm-left">
            <div className="col-sm-auto"><a className="btn btn-singtel-go-primary" href="#/MSCloud/Overview">Save</a></div>
            <div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0"><span>or</span></div>
            <div className="col-sm-auto"><button type="button" className="btn btn-link">Reset Order Cart</button></div>
        </div>
    </React.Fragment>
}
export default Button