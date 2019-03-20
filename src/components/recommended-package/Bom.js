import React from 'react'

const BOM = (props) => {
    return (
        <React.Fragment>
            <div className="modal-backdrop fade show"></div>
            <div className="modal d-block">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{props.title}</h4>
                            <button onClick={props.onCloseBom()} type="button" className="close" data-dismiss="modal">
                                <span>×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {props.bom.length && props.bom.map((data, index) => {
                                let subTypes = []
                                data.boms.map(dBom => subTypes.push(dBom.subProductType))
                                const newSubTypes = subTypes.sort().filter((d, i) => subTypes.indexOf(d) === i)
                                let iNo = 0
                                return (
                                    <div key={index}>
                                        <h4>{data.qty}x {data.package}</h4>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Description</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {newSubTypes.length > 0 && newSubTypes.map((dNewSubTypes, iNewSubTypes) => {
                                                    return (
                                                        <React.Fragment key={iNewSubTypes}>
                                                            <tr>
                                                                <td colSpan="3" className="background-very-light-gray">{dNewSubTypes}</td>
                                                            </tr>
                                                            {data.boms.map((dBom, iBom) => {
                                                                if (dNewSubTypes === dBom.subProductType)
                                                                    return (
                                                                        <tr key={iBom}>
                                                                            <td>{++iNo}</td>
                                                                            <td>{dBom.name}</td>
                                                                            <td>{dBom.qty}</td>
                                                                        </tr>
                                                                    )
                                                                return null
                                                            })}
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BOM