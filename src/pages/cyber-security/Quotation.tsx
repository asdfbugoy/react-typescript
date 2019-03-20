import React, { FormEvent } from 'react'
import Banner from 'components/BannerComponent'
import ProgressStep from 'components/ProgressStep'
import * as Components from 'components/customer-information'
import PropTypes from 'prop-types'
import CustomerToolbarComponent from 'pages/mscloud/CustomerToolbarComponent'
import { ROUTER_THANKYOU } from 'stores/global'
//import rootStore from 'src/stores/STORESCHEMA';

interface IQuotationProps {
    editMode: string
    quoteId: string
    rootStore: {
        createNewProduct: Function
        product: TProduct
        retrieveQuoteById: Function
        customer: TCustomer
    }
    history: {
        push: Function
    }
}

type TProduct = {}

type TCustomer = {
    onChange: Function
    isReady: boolean
    comments: string
    isTechnicalTermsCondition: boolean
}

class Quotation extends React.Component<IQuotationProps> {
    static propTypes = {
        ready: PropTypes.bool,
        rootStore: PropTypes.object,
        history: PropTypes.object,
        editMode: PropTypes.bool,
        quoteId: PropTypes.string,
    }
    _isMounted = false;
    state = {
        banner: {
            background: "img/hero2.jpg",
            textcolor: "",
            title: this.props.editMode ? 'Editing Quote' : 'Quotation Creation'
        },
        page: 'search',
        isFetching: false,
    }
    componentDidMount() {
        this._isMounted = true;
        window.scrollTo(0, 0);
        const { editMode, quoteId, rootStore } = this.props;
        if (typeof rootStore.product === 'undefined') {
            rootStore.createNewProduct({
                productName: 'SD LAN'
            });
        }

        if (editMode && typeof quoteId !== 'undefined' && quoteId !== '') {
            this.setState({ isFetching: true });

            this.props.rootStore
                .retrieveQuoteById(quoteId)
                .then(() => {
                    if (this._isMounted) {
                        this.setState({
                            isFetching: false,
                            page: 'view'
                        })
                    }
                });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSuccessCreateQuote() {
        const { rootStore, history } = this.props;
        rootStore.createNewProduct({ productName: 'SD LAN' })
        history.push(ROUTER_THANKYOU);
    }

    onEditCancel() {
        this.setState({ page: 'view' });
    }

    onChangePage = (page: string) => {
        this.setState(({ page: page }))
    }

    renderHeading() {
        return this.props.editMode ? '' : <h2 className="title-text text-center mb-5">Customer Information</h2>;
    }

    onChangeComments = () => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.props.rootStore.customer.onChange({
            name: e.target.name,
            value: e.target.value
        })
    }
    renderByPage() {
        const { customer } = this.props.rootStore
        switch (this.state.page) {
            case 'search':
                return <Components.CustomerSearch
                    customer={customer}
                    onChangePage={this.onChangePage}
                    onCancel={this.onEditCancel.bind(this)}
                    editMode={this.props.editMode}
                    isReady={customer.isReady} />
            case 'create':
                return <Components.CustomerCreate customer={customer} onChangePage={this.onChangePage} />
            case 'view':
                return <React.Fragment>
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
                                    className="form-control"
                                    value={customer.comments}
                                    onChange={this.onChangeComments} />
                            </div>
                        </div>
                    </div>
                    <Components.TechnicalTermsCondition
                        customer={customer} />
                    <CustomerToolbarComponent
                        rootStore={this.props.rootStore}
                        editMode={this.props.editMode}
                        uuid={this.props.quoteId}
                        isCheckedTnC={customer.isTechnicalTermsCondition}
                        onSuccessCreateQuote={this.onSuccessCreateQuote} />

                </React.Fragment>
        }
    }
    render() {
        return <React.Fragment>
            <article className="main background-very-light-gray">
                <Banner {...this.state.banner} />
                <div className="container">
                    <ProgressStep />
                    {this.renderHeading()}
                    {this.renderByPage()}
                    {this.state.isFetching && <Components.ContentLoading />}
                </div>
            </article>
        </React.Fragment>
    }
}

export default Quotation