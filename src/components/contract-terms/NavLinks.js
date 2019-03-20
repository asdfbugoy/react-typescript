import React from 'react'

const NavLinks = (props) => {
    return (
        <div className="row align-items-center mb-3">
            <div className="col-auto">
                <Link to={ROUTER_SD_CUSTOMER} className="btn btn-singtel-go-primary mr-2">Next</Link>
            </div>
            <div className="col-auto">or</div>
            <div className="col mt-2 mt-sm-0">
                <Link to={ROUTER_SD_ADDON} className="avenirHeavy">Back to change Addons / Installation or Maintenance</Link>
            </div>
        </div>
    )
}
export default NavLinks