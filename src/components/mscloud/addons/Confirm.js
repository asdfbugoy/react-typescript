import React from 'react'

const Confirm = (props) => {
    return (
        <React.Fragment>
            <div className="modal-backdrop fade show"></div>
            <div className="modal d-block">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header d-none">
                            <h4 className="modal-title">Confirmation</h4>
                            <button type="button" className="close" data-dismiss="modal">
                                <span>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Warning! you can't edit your plans as soon as you click ok.
                            Are you sure you want to continue? 
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-singtel-go-primary">ok</button>
                            <button className="btn btn-singtel-go-primary-black">cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Confirm