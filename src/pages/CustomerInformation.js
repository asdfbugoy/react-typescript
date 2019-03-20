import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { ROUTER_THANKYOU } from '../stores/global'
import * as Components from './../components/customer-information'

class CustomerInformation extends Component {
    _isMounted = false;
    state = {
        page: 'search',
        isFetching: false,
    }
    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        const {editMode, quoteId, rootStore } = this.props;
        if ( typeof rootStore.product === 'undefined' ) {
            rootStore.createNewProduct({
                productName:'SD LAN'
            });
        }

        if ( editMode && typeof quoteId !== 'undefine' && quoteId !== ''){
            this.setState({ isFetching: true });
            
            this.props.rootStore
                .retrieveQuoteById(quoteId)
                .then( () => {
                    if ( this._isMounted ) {
                        this.setState({
                            isFetching: false,
                            page: 'view'
                        })
                    }
                });
        }
    }

    componentWillUnmount(){
        this._isMounted = false;
    }

    onSuccessCreateQuote() {
        const { rootStore, history } = this.props;
        rootStore.createNewProduct({ productName: 'SD LAN' })
        history.push(ROUTER_THANKYOU);
    }

    onEditCancel(){
        this.setState( {page: 'view'} );
    }

    onChangePage = (page) => {
        this.setState(({ page: page }))
    }

    renderHeading(){
       return this.props.editMode ? '' : <h2 className="title-text text-center mb-5">Customer Information</h2>;
    }
    
    onChangeComments = (name) => (e) => {
        this.props.rootStore.customer.onChange({
            name: e.target.name,
            value: e.target.value
        })
    }

    renderByPage = () => ({
        search: <Components.CustomerSearch 
            customer={this.props.rootStore.customer} 
            onChangePage={this.onChangePage} 
            onCancel={this.onEditCancel.bind(this)}
            editMode={ this.props.editMode }
            isReady={this.props.rootStore.customer.isReady} />,
        create: <Components.CustomerCreate customer={this.props.rootStore.customer} onChangePage={this.onChangePage} />,
        view: <React.Fragment>
            <Components.CustomerView 
                customer={this.props.rootStore.customer}
                onChangePage={this.onChangePage} />
            <Components.CorrespondenceAddress 
                customer={this.props.rootStore.customer} />
            <Components.ContactInformation 
                customer={this.props.rootStore.customer} />
            <Components.AuthorizedContactPerson 
                customer={this.props.rootStore.customer} />
            <Components.SiteInstallationAddress 
                productStore={this.props.rootStore.product} />
            <div className="card border shadow mb-3">
                <div className="card-body">
                    <div className="avenirHeavy mb-1">Comments:</div>
                    <div className=""><textarea name="comments" type="text" className="form-control" value={this.props.rootStore.customer.comments} onChange={this.onChangeComments()}></textarea></div>
                </div>
            </div>
            <Components.TechnicalTermsCondition 
                customer={this.props.rootStore.customer} />
            <Components.NavLinks
                rootStore={this.props.rootStore}
                editMode={ this.props.editMode }
                isCheckedTnC={this.props.rootStore.customer.isTechnicalTermsCondition}
                onSuccessCreateQuote={this.onSuccessCreateQuote.bind(this)} />
        </React.Fragment>
    }[this.state.page])

    render() {
        const banner = {
            background: "img/hero2.jpg",
            textcolor: "",
            title: this.props.editMode ? 'Editing Quote' : 'Quotation Creation'
        }

        return (
            <article className="main background-very-light-gray">
                <Components.Banner {...banner} />
                <div className="container">
                    <Components.ProgressStep />
                    { this.renderHeading() }
                    {!this.state.isFetching && this.props.rootStore.product.packages && this.renderByPage()}
                    {this.state.isFetching && <Components.ContentLoading />}
                </div>
            </article>
        )
    }
}

CustomerInformation.propTypes = {
    ready: PropTypes.bool,
    rootStore: PropTypes.object,
    history: PropTypes.object,
    editMode: PropTypes.bool,

};

export default observer(CustomerInformation)
