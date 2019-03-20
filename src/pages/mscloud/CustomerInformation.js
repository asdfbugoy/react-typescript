import React, { Component } from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { ROUTER_THANKYOU } from 'stores/global'
import * as Components from 'components/customer-information'
import CustomerToolbarComponent from './CustomerToolbarComponent';
import TechnicalTermsCondition from 'components/mscloud/customer-information/TechnicalTermsCondition'
import "abortcontroller-polyfill"
class CustomerInformation extends Component {
    constructor(){
        super();
        this.state = {
            page: 'search',
            isFetching: false,
        }
        this._isMounted = false;
        this.abortController = new window.AbortController();
        this.onChangeComments = this.onChangeComments.bind(this);
        this.onSuccessCreateQuote = this.onSuccessCreateQuote.bind( this );
    }

    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        const {editMode, quoteId, rootStore } = this.props;
        if ( typeof rootStore.productMSCloud === 'undefined' ) {
            rootStore.createNewCloudProduct({});
        }

        if ( editMode && typeof quoteId !== 'undefine' && quoteId !== ''){
            this.setState({ isFetching: true });
            
            this.props.rootStore
                .retrieveMSQuoteById(quoteId)
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
        const { rootStore, route } = this.props;
        rootStore.createNewCloudProduct({});
        route.history.push(ROUTER_THANKYOU);
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
    
    onChangeComments(e){
        this.props.rootStore.customer.onChange({
            name: e.target.name,
            value: e.target.value
        })
    }

    renderByPage(){
        const { customer } = this.props.rootStore;
        return ({
            search: <Components.CustomerSearch 
                customer={customer} 
                onChangePage={this.onChangePage} 
                onCancel={this.onEditCancel.bind(this)}
                editMode={ this.props.editMode }
                isReady={customer.isReady} />,
            create: <Components.CustomerCreate customer={customer} onChangePage={this.onChangePage} />,
            view: <React.Fragment>
                <Components.CustomerView 
                    customer={customer}
                    onChangePage={this.onChangePage} />
                <Components.CorrespondenceAddress 
                    customer={customer} />
                <Components.ContactInformation 
                    customer={customer} />
                <Components.AuthorizedContactPerson 
                    customer={customer} />
                <div className="card border shadow mb-3">
                    <div className="card-body">
                        <div className="avenirHeavy mb-1">Comments:</div>
                        <div className="">
                            <textarea 
                                name="comments" 
                                type="text" 
                                className="form-control" 
                                value={customer.comments} 
                                onChange={this.onChangeComments} />
                        </div>
                    </div>
                </div>
                <TechnicalTermsCondition 
                    customer={customer} />
                <CustomerToolbarComponent
                     rootStore={this.props.rootStore}
                     editMode={ this.props.editMode }
                     uuid={ this.props.quoteId }
                     isCheckedTnC={customer.isTechnicalTermsCondition}
                     onSuccessCreateQuote={ this.onSuccessCreateQuote } />
                   
            </React.Fragment>
        })[this.state.page];
    }

    render() {
        const banner = {
            background: "img/hero2.jpg",
            textcolor: "",
            title: this.props.editMode ? 'Editing Quote' : 'Quotation Creation'
        }
        const { productMSCloud } = this.props.rootStore;

        const readyState = !this.state.isFetching && ( productMSCloud.__isStep_Customer_Ready || this.props.editMode );

        return (
            <article className="main background-very-light-gray">
                <Components.Banner {...banner} />
                <div className="container">
                    <Components.ProgressStep />
                    { productMSCloud.__isStep_Customer_Ready && this.renderHeading() }
                    { readyState && this.renderByPage() }
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
    quoteId: PropTypes.string,
};

export default observer(CustomerInformation)
