import React from 'react'
import Banner from 'components/BannerComponent'
import ProgressStep from 'components/ProgressStep'
import * as Components from 'components/contract-terms'
import { Collapsable, CollapsableContent, CollapsableButton } from 'components/Collapsable'
import { ROUTER_CYBER_SECURITY_OVERVIEW, ROUTER_CYBER_SECURITY_QUOTATION } from 'stores/global'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'
import { ContentLoading, CardLoading } from 'components/common/Loading'

interface IContractProps {
    rootStore: {
        productCyberSecurity: {
            contract: Tcontract
        }
    }
}

type Tcontract = {
    getTerms: Function
    terms: Array<Tterm>
    summary: Tsummary
    selectedDuration: number
    getSummary: Function
    boms: Array<Tboms>
    getBom: Function
}

type Tsummary = {
    priceSummary: Array<TpriceSummary>
    upfrontCostTotal: number
    grandTotal: number
}

type Tterm = {
    duration: number
}

type TpriceSummary = {
    name: string
    upfrontCost: number
    monthlyCost: number
    quantity: number
}

type Tboms = {
    name: string
    boms: Array<tbomsBoms>
}

type tbomsBoms = {
    name: string
    qty: number
    subProductType: string
}

class Contract extends React.Component<IContractProps> {
    state = {
        banner: {
            background: 'img/hero4.jpg',
            mobileBackground: 'img/hero4-mobile.jpg',
            textcolor: '',
            title: 'Contract Terms & Conditions'
        }
    }
    componentDidMount() {
        const { contract } = this.props.rootStore.productCyberSecurity
        contract.getTerms()
    }

    render() {
        const { contract } = this.props.rootStore.productCyberSecurity
        const { terms, summary } = contract
        return <React.Fragment>
            <article className="main background-very-light-gray">
                <Banner {...this.state.banner} />
                <div className="container">
                    <ProgressStep />
                    <h2 className="title-text text-center mb-5 mt-5">Available Contract Duration</h2>

                    {terms.length > 0
                        ? <section className="mb-4">
                            <div className="row">
                                {terms.sort((a, b) => a.duration - b.duration).map((d, i) => <div key={i} className="col-md mb-3 mb-sm-0">
                                    <Components.TermOption
                                        term={d}
                                        selectedDuration={contract.selectedDuration}
                                    />
                                </div>)}
                            </div>
                        </section>
                        : <ContentLoading />}

                    <Wrapper contract={contract} duration={contract.selectedDuration} />
                    {/* <Collapsable className=""><Bom contract={contract} duration={contract.selectedDuration} /></Collapsable>
                    <Collapsable className=""><Summary contract={contract} duration={contract.selectedDuration} /></Collapsable>
                    <BottomLink summary={summary} /> */}
                </div>
            </article>
        </React.Fragment>
    }
}

export default observer(Contract)

interface IBomProps {
    contract: Tcontract
    duration: number
    collapse: Tcollapse
}

type Tcollapse = {}

const Bom = observer(class Bom extends React.Component<IBomProps> {
    state = {
        isLoading: false
    }
    componentDidUpdate(prevProps: IBomProps) {
        const contract = this.props.contract
        if (prevProps.duration !== this.props.duration) {
            this.setState(({ isLoading: true }))
            contract.getBom().then(() => this.setState(({ isLoading: false })))
        }
    }
    render() {
        const { boms } = this.props.contract
        return !this.state.isLoading && boms.length > 0
            ? <div className="card border shadow mb-4">
                <CollapsableButton collapse={this.props.collapse} className="sub-title-text no-underline p-3">BOM List</CollapsableButton>
                <CollapsableContent className="" collapse={this.props.collapse}>
                    <hr className="m-0" />
                    {boms.map((d, i) => <React.Fragment key={i}>
                        <div className="sub-title-text p-3">{d.name}</div>
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0">
                                <thead>
                                    <tr className="thead-light">
                                        <th>no.</th>
                                        <th>name</th>
                                        <th>qty</th>
                                        <th>type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {d.boms.map((dBom, iBom: number) => <tr key={iBom}>
                                        <td>{iBom}</td>
                                        <td>{dBom.name}</td>
                                        <td>{dBom.qty}</td>
                                        <td>{dBom.subProductType}</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>)}
                </CollapsableContent>
            </div>
            : <CardLoading />
    }
})

const Summary = observer(class Summary extends React.Component<IBomProps> {
    state = {
        isLoading: false
    }
    componentDidUpdate(prevProps: IBomProps) {
        const contract = this.props.contract
        if (prevProps.duration !== this.props.duration) {
            this.setState(({ isLoading: true }))
            contract.getSummary().then(() => this.setState(({ isLoading: false })))
        }
    }
    render() {
        const { summary } = this.props.contract
        return !this.state.isLoading && summary
            ? <div className="card border shadow mb-4">
                <CollapsableButton collapse={this.props.collapse} className="sub-title-text no-underline p-3">Price Summary</CollapsableButton>
                <CollapsableContent className="" collapse={this.props.collapse}>
                    <hr className="m-0" />
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0">
                            <thead>
                                <tr className="thead-light">
                                    <th>name</th>
                                    <th>Upfront cost</th>
                                    <th>Monthly cost</th>
                                    <th>Quantity</th>
                                    <th>Grand total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summary.priceSummary.map((d, i) => <tr key={i}>
                                    <td>{d.name}</td>
                                    <td>{d.upfrontCost}</td>
                                    <td>{d.monthlyCost}</td>
                                    <td>{d.quantity}</td>
                                    <td>{d.quantity}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </CollapsableContent>
            </div>
            : <CardLoading />
    }
})

type TBottomLinkProps = {
    summary: Tsummary
}

const BottomLink = (props: TBottomLinkProps) => {
    const { summary } = props
    return summary
        ? <section className="card background-very-light-blue">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-sm mb-3 mb-sm-0">
                        <div className="row align-items-center text-center text-sm-left">
                            <div className="col-sm-auto">
                                <Link to={ROUTER_CYBER_SECURITY_QUOTATION} className="btn btn-singtel-go-primary">Next</Link>
                            </div>
                            <div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0"><span>or</span></div>
                            <div className="col-sm-auto">
                                <Link to={ROUTER_CYBER_SECURITY_OVERVIEW} className="btn btn-link">Back</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm border-left-sm border-0">
                        <div className="row text-center align-items-center">
                            <div className="col">
                                <div>Upfront Cost</div>
                                <div className="font-size-32 museoMedium blue">S${summary.upfrontCostTotal}</div>
                            </div>
                            <div className="col">
                                <div>Monthly</div>
                                <div className="font-size-32 museoMedium blue">S${summary.grandTotal}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        : <CardLoading />
}

interface IWrapperProps {
    contract: Tcontract
    duration: number
}

const Wrapper = observer(class Wrapper extends React.Component<IWrapperProps> {
    state = {
        isLoadingBom: false,
        isLoadingSummary: false
    }
    componentDidUpdate(prevProps: IWrapperProps) {
        const contract = this.props.contract
        if (prevProps.duration !== this.props.duration) {
            this.setState(({
                isLoadingBom: true,
                // isLoadingSummary: true
            }))
            // contract.getBom().then(() => this.setState(({ isLoadingBom: false })))
            contract.getSummary().then(() => this.setState(({ isLoadingSummary: false })))
        }
    }
    render() {
        const { boms, summary } = this.props.contract
        return <React.Fragment>
            {/* {boms.length > 0 && !this.state.isLoadingBom
                ? <Collapsable className="card border shadow mb-4">
                    <CollapsableButton className="sub-title-text no-underline p-3">BOM List</CollapsableButton>
                    <CollapsableContent className="">
                        <hr className="m-0" />
                        {boms.map((d, i) => <React.Fragment key={i}>
                            <div className="sub-title-text p-3">{d.name}</div>
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr className="thead-light">
                                            <th>no.</th>
                                            <th>name</th>
                                            <th>qty</th>
                                            <th>type</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {d.boms.map((dBom, iBom) => <tr key={iBom}>
                                            <td>{iBom}</td>
                                            <td>{dBom.name}</td>
                                            <td>{dBom.qty}</td>
                                            <td>{dBom.subProductType}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </React.Fragment>)}
                    </CollapsableContent>
                </Collapsable>
                : <CardLoading />} */}

            {summary && !this.state.isLoadingSummary
                ? <React.Fragment>
                    <Collapsable className="card border shadow mb-4">
                        <CollapsableButton className="sub-title-text no-underline p-3">Price Summary</CollapsableButton>
                        <CollapsableContent className="">
                            <div className="table-responsive">
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr className="thead-light">
                                            <th>name</th>
                                            <th>Upfront cost</th>
                                            <th>Monthly cost</th>
                                            <th>Quantity</th>
                                            <th>Grand total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {summary.priceSummary.map((d, i) => <tr key={i}>
                                            <td>{d.name}</td>
                                            <td>{d.upfrontCost}</td>
                                            <td>{d.monthlyCost}</td>
                                            <td>{d.quantity}</td>
                                            <td>{d.quantity}</td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </CollapsableContent>
                    </Collapsable>
                </React.Fragment>
                : <CardLoading />}
            {summary && !this.state.isLoadingSummary
                ? <section className="card background-very-light-blue">
                    <div className="card-body">
                        <div className="row align-items-center">
                            <div className="col-sm mb-3 mb-sm-0">
                                <div className="row align-items-center text-center text-sm-left">
                                    <div className="col-sm-auto">
                                        <Link to={ROUTER_CYBER_SECURITY_QUOTATION} className="btn btn-singtel-go-primary">Next</Link>
                                    </div>
                                    <div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0"><span>or</span></div>
                                    <div className="col-sm-auto">
                                        <Link to={ROUTER_CYBER_SECURITY_OVERVIEW} className="btn btn-link">Back</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm border-left-sm border-0">
                                <div className="row text-center align-items-center">
                                    <div className="col">
                                        <div>Upfront Cost</div>
                                        <div className="font-size-32 museoMedium blue">S${summary.upfrontCostTotal}</div>
                                    </div>
                                    <div className="col">
                                        <div>Monthly</div>
                                        <div className="font-size-32 museoMedium blue">S${summary.grandTotal}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                : <CardLoading />}
        </React.Fragment>
    }
})