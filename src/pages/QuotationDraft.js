import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import * as Components from './../components/quotation-draft'

class QuotationDraft extends React.Component {
    componentDidMount() {
        this.fetchQuote()
        this.props.quoteStore.fetchAM()
    }
    
    fetchQuote = (isLoadMore) => {
        if (!this.props.quoteStore.isLoading) {
            this.props.quoteStore.toggleLoading(true)
            this.props.quoteStore.setPageNo(isLoadMore)
            this.props.quoteStore.fetchQuote(isLoadMore).then(() => this.props.quoteStore.toggleLoading(false))
        }
    }
    
    render() {
        const banner = {
            background: "img/hero4.jpg",
            textcolor: "",
            title: "Quotation Draft List"
        }
        return (
            <article className="main background-very-light-gray">
                <Components.Banner {...banner} />
                <div className="container">
                    <Components.Search quoteStore={this.props.quoteStore} fetchQuote={this.fetchQuote} />
                    <Components.List quoteStore={this.props.quoteStore} fetchQuote={this.fetchQuote} />
                </div>
            </article>
        )
    }
}
QuotationDraft.propTypes = {
    ready: PropTypes.bool,
    quoteStore: PropTypes.object,
    history: PropTypes.object
}
export default observer(QuotationDraft)
