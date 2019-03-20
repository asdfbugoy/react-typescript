import React from 'react'
import { Collapsable, CollapsableButton, CollapsableContent } from './../Collapsable'
import { CardLoading, OverlayLoading } from './../common/Loading'

class BOMList extends React.Component {
    state = {
        isFetching: false,
        bomList: []
    }

    componentDidMount() {
        this.fetchBOM()
    }

    componentDidUpdate(prevProps){
        if (prevProps.duration !== this.props.duration)  this.fetchBOM();
    }

    fetchBOM() {
        this.setState(({isFetching: true}))
        this.props.productStore.getBOM().then(data => {
            this.setState(({
                isFetching: false,
                bomList: data
            }))
        })
    }

    renderBOMList() {
        return this.state.bomList.map((profile, index) => this.renderBOM(profile, index));
    }

    renderBOM(profile, index) {
        let subTypes = []
        profile.boms.map(dBom => subTypes.push(dBom.subProductType))
        const newSubTypes = subTypes.sort().filter((d, i) => subTypes.indexOf(d) === i)
        let iNo = 0

        return <React.Fragment key={`boms_${index}`}>
            <h4>{profile.qty} x {profile.name} Site Profile #{index + 1}</h4>
            <table className="table table-bordered table-sm mb-4">
                <thead className="thead-light">
                    <tr>
                        <th>No.</th>
                        <th>Item Description</th>
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
                                {profile.boms.map((item, bomIndex) => {
                                    if(dNewSubTypes === item.subProductType) 
                                        return (
                                            <tr key={bomIndex}>
                                                <td>{++iNo}</td>
                                                <td>{item.name}</td>
                                                <td>{item.qty}</td>
                                            </tr>
                                        )
                                    return null
                                })}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    }

    render() {
        return <React.Fragment> <OverlayLoading open={this.state.isFetching} transparent={true} scrollable={true} /> {this.state.isFetching ? <CardLoading /> : <section>
                <div className="card shadow mb-4 border">
                    <div className="card-body p-3">
                        <CollapsableButton className="read-details dark-blue collapsed no-underline" collapse={this.props.collapse}>
                            <h4 className="museo mb-0">BOM List with Add-ons</h4>
                        </CollapsableButton>
                        <CollapsableContent collapse={this.props.collapse}>
                            <div className="pt-3 pb-3"><hr className="m-0" /></div>
                            {!this.state.isFetching && <div className="content">
                                {this.renderBOMList()}
                            </div>}
                            {this.state.isFetching && <div className="content">
                                <p><i className="fas fa-spinner fa-pulse fa-2x"></i> Loading content</p>
                            </div>}
                        </CollapsableContent>
                    </div>
                </div>
            </section>}
        </React.Fragment>
    }
}

export default BOMList