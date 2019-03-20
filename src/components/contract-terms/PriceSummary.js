import React from 'react'
import { CollapsableContent, CollapsableButton } from './../Collapsable'
import { BrowserView, TabletView, MobileOnlyView } from 'react-device-detect'
import { CardLoading, OverlayLoading } from './../common/Loading'

class PriceSummary extends React.Component {
    state = {
        isLoading: false,
        priceSummary: {}
    }
    componentDidMount() {
        this.getPriceSummary()
    }
    componentDidUpdate(prevProps) {
        if (prevProps.duration !== this.props.duration) this.getPriceSummary()
    }
    getPriceSummary() {
        this.setState(({isLoading: true}))
        this.props.productStore.getPriceSummary().then(data => this.setState(({ priceSummary: data, isLoading: false })))
    }
    render() {
        const styleFix = {
            height: '100px',
            overflow: 'hidden'
        }
        const commonClasses = 'col-md m-0 p-0 mb-3 mb-sm-0'
        return <React.Fragment> <OverlayLoading open={this.state.isLoading} transparent={true} scrollable={true} /> {this.state.isLoading ? <CardLoading /> : <section className="price-summary">
                <BrowserView>
                    <div className="card shadow mb-4 border p-0">
                        <div className="card-body p-sm-0 p-2">
                            <CollapsableButton className="read-details dark-blue d-block p-3 no-underline" collapse={this.props.collapse}>
                                <h4 className="museo mb-0">Price Summary ( for {this.props.productStore.selectedDuration} Months contract )</h4>
                            </CollapsableButton>
                            <CollapsableContent collapse={this.props.collapse}>
                                <div className="row m-0">
                                    <div className={`${commonClasses} font-size-14 font-size-16-lg`}>
                                        <div className="card border">
                                            <div className="card-body p-3">
                                                <div style={styleFix}></div>
                                                {this.state.priceSummary.priceAttributes && this.state.priceSummary.priceAttributes.map((d, i) => <div key={i} style={styleFix}>{d.name}</div>)}
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.priceSummary.profiles && this.state.priceSummary.profiles.map((d, i) => {
                                        return (
                                            <div key={i} className={commonClasses}>
                                                <div className="card border active">
                                                    <div className="card-body p-3 text-center">
                                                        <div style={styleFix}>
                                                            <div className="avenirHeavy">{d.name}</div>
                                                        </div>
                                                        {d.summary.map((dSummary, iSummary) => <div key={iSummary} style={styleFix}>{typeof dSummary.value !== 'undefined' ? dSummary.value : dSummary.name}</div>)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CollapsableContent>
                        </div>
                    </div>
                </BrowserView>
                <TabletView>
                    <div className="card shadow mb-4 border p-0">
                        <div className="card-body p-sm-0 p-2">
                            <CollapsableButton className="read-details dark-blue d-block p-3 no-underline" collapse={this.props.collapse}>
                                <h4 className="museo mb-0">Price Summary ( for {this.props.productStore.selectedDuration} Months contract )</h4>
                            </CollapsableButton>
                            <CollapsableContent collapse={this.props.collapse}>
                                <div className="row m-0">
                                    <div className={`${commonClasses} font-size-14 font-size-16-lg`}>
                                        <div className="card border">
                                            <div className="card-body p-3">
                                                <div style={styleFix}></div>
                                                {this.state.priceSummary.priceAttributes && this.state.priceSummary.priceAttributes.map((d, i) => <div key={i} style={styleFix}>{d.name}</div>)}
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.priceSummary.profiles && this.state.priceSummary.profiles.map((d, i) => {
                                        return (
                                            <div key={i} className={commonClasses}>
                                                <div className="card border active">
                                                    <div className="card-body p-3 text-center">
                                                        <div style={styleFix}>
                                                            <div className="avenirHeavy">{d.name}</div>
                                                        </div>
                                                        {d.summary.map((dSummary, iSummary) => <div key={iSummary} style={styleFix}>{typeof dSummary.value !== 'undefined' ? dSummary.value : dSummary.name}</div>)}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </CollapsableContent>
                        </div>
                    </div>
                </TabletView>
                <MobileOnlyView>
                    <div className="card shadow mb-4 border">
                        <div className="card-body p-3">
                            <CollapsableButton className="read-details dark-blue d-block no-underline" collapse={this.props.collapse}>
                                <h4 className="museo mb-0">Price Summary ( for {this.props.productStore.selectedDuration} Months contract )</h4>
                            </CollapsableButton>
                            <CollapsableContent collapse={this.props.collapse}>
                                <section className="pt-3">
                                    {this.state.priceSummary.profiles && this.state.priceSummary.profiles.map((d, i) => {
                                        return (
                                            <div className="card border shadow" key={i}>
                                                <div className="card-body p-2">
                                                    <div className="avenirHeavy text-center">{d.name}</div>
                                                    {d.summary.map((dSummary, iSummary) =>
                                                        <div key={iSummary}>
                                                            {this.state.priceSummary.priceAttributes.map((dPriceSummary, i) =>
                                                                dPriceSummary.id === dSummary.id &&
                                                                <div key={i} className="addon-mobile-card-body-title text-center">
                                                                    <strong>{dPriceSummary.name}</strong>
                                                                </div>)}
                                                            <div className="addon-mobile-card-body text-center" key={iSummary}>
                                                                {typeof dSummary.value !== 'undefined' ? dSummary.value : dSummary.name}
                                                            </div>
                                                        </div>)}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </section>
                            </CollapsableContent>
                        </div>
                    </div>
                </MobileOnlyView>
            </section>}
        </React.Fragment>
    }
}

export default PriceSummary