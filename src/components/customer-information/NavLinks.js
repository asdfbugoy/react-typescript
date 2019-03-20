import React from "react";
import PropTypes from 'prop-types';
import { observer } from "mobx-react"
import { ROUTER_SD_TERMS, REST_API_QUOTE_PDF, ROUTER_QUOTATION_DRAFT } from '../../stores/global';
import { Link } from 'react-router-dom';
import { OverlayLoading } from './../common/Loading'
class NavLinks extends React.Component {
    state = {
        isSaving: false,
        isCreating: false,
        isPDFCreating: false,
        isFetching: false,
        isManualDownload: false,
        manualDownloadURL: '',
        errorMessage: '',
    }

    onClickSaveQuote() {
        const { rootStore } = this.props;
        this.setState({
            isFetching: true,
            isSaving: true
        });
        rootStore.saveQuote(
                { isValidation: false }
            )
            .then((res) => {
                this.setState({
                    isFetching: false,
                    isSaving: false,
                    errorMessage: res.status > 299 ? res.body.Errors[0] : ''
                });
            })
            .catch(err => {
                this.setState({
                    isFetching: false,
                    isSaving: false,
                    errorMessage: 'There is error while submitting your quote. Please try again'
                })
            });
    }

    onClickCreateQuote() {
        const { isCheckedTnC, rootStore } = this.props;
        this.setState({
            isFetching: true,
            isCreating: true,
        });
        if (isCheckedTnC) {
            rootStore.createQuote()
                .then((res) => {
                    this.setState({
                        isFetching: false,
                        isCreating: false,
                        errorMessage: res.status > 299 ? res.body.Errors[0] : ''
                    });
                    if (res.status > 199 && res.status < 300) {
                        this.props.onSuccessCreateQuote();
                    }
                })
                .catch(err => {
                    this.setState({
                        isFetching: false,
                        isCreating: false,
                        errorMessage: 'There is error while submitting your quote. Please try again'
                    })
                });
        }
    }
    onClickCreatePDF() {
        const { isCheckedTnC, rootStore } = this.props;
        this.setState({
            isFetching: true,
            isPDFCreating: true,
            manualDownloadURL: `${REST_API_QUOTE_PDF}/${this.props.rootStore.product.packages.uuid}`,
        });
        if (isCheckedTnC) {
            rootStore.saveQuote(
                { isValidation: true }
            )
                .then((res) => {
                    // fail catching if status >= 300
                    if ( res.status > 299 ){
                        this.setState({
                            isFetching: false,
                            isPDFCreating: false,
                            errorMessage: res.body.Errors[0],
                            isManualDownload: false,
                        });
                        return null;
                    }
                    // successful
                    rootStore.downloadBlob({
                        url: `${REST_API_QUOTE_PDF}/${this.props.rootStore.product.packages.uuid}`,
                        fileName: 'Draft Quote.pdf',
                        mineType: 'application/pdf'
                    })
                    .then( (result)=>{
                        this.setState({
                            isFetching: false,
                            isPDFCreating: false,
                            errorMessage: '',
                            isManualDownload: result.statusCode > 299 ? true : false,
                        });
                    });
                    // window.open(`${REST_API_QUOTE_PDF}/${this.props.rootStore.product.packages.uuid}`, '_blank');
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        isFetching: false,
                        isPDFCreating: false,
                        isManualDownload: false,
                        manualDownloadURL: '',
                        errorMessage: 'There is error while submitting your quote. Please try again'
                    })
                });
        }
    }

    render() {
        const { isCheckedTnC, rootStore } = this.props;
        const { manualDownloadURL, isManualDownload, errorMessage } = this.state;
        return (
            <React.Fragment>
                {!rootStore.customer.isValidated &&
                    <div className="alert alert-warning">
                        <i className="fas fa-exclamation-circle fa-lg mr-2" />
                        <strong>Please fill up all mandatory information before generating draft PDF or creating new Quote</strong>
                    </div>}
                {errorMessage !== '' &&
                    <div className="alert alert-danger">
                        <i className="fas fa-exclamation-circle fa-lg mr-2" />
                        <strong>{errorMessage}</strong>
                    </div>}

                {isManualDownload &&
                    <div className="alert alert-info">
                        <i className="fas fa-file-pdf fa-lg mr-2" />
                        There is some restrictions from your browser settings, 
                        please <a href={manualDownloadURL} target="_blank">
                            <strong>click here</strong>
                        </a> for download the Draft Quote.
                    </div>}

                <div className="alert background-very-light-blue">
                    <div className="">
                        <div className="text-center text-sm-left">
                            <button
                                type="button"
                                className={`btn btn-singtel-go-primary mb-2 mr-2 ${!isCheckedTnC ? 'disabled' : ''}`}
                                disabled={!isCheckedTnC || this.state.isFetching}
                                onClick={() => this.onClickCreateQuote()}
                            >
                                {this.state.isCreating ?
                                    <span><i className="fas fa-spinner fa-pulse fa-lg" /> Creating quote...</span> :
                                    'Create Quote'}
                            </button>
                            <button
                                type="button"
                                className={`btn btn-singtel-go-primary-inverted mb-2  mr-2 ${!isCheckedTnC ? 'disabled' : ''}`}
                                disabled={!isCheckedTnC || this.state.isFetching}
                                onClick={() => this.onClickCreatePDF()}
                            >
                                {this.state.isPDFCreating ?
                                    <span><i className="fas fa-spinner fa-pulse fa-lg" /> Preparing PDF content...</span> :
                                    'Download Draft Quote'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-singtel-go-primary-inverted mb-2 mr-2"
                                disabled={this.state.isFetching}
                                onClick={() => this.onClickSaveQuote()}
                            >
                                {this.state.isSaving ?
                                    <span><i className="fas fa-spinner fa-pulse fa-lg" /> Saving Draft...</span> :
                                    'Save Draft'}
                            </button>
                            { this.props.editMode
                                ? <Link to={ROUTER_QUOTATION_DRAFT} className="mb-2 btn"><strong>BACK TO LIST</strong></Link>
                                : <Link to={ROUTER_SD_TERMS} className="mb-2 btn"><strong>BACK</strong></Link>
                            }
                        </div>
                        {/* <div className="col-lg-2 col-md-3 text-center">
                            <div>One Time Payment</div>
                            <h2 className="museoMedium">S$345</h2>
                        </div>
                        <div className="col-lg-2 col-md-3 text-center">
                            <div>Monthly Payment</div>
                            <h2 className="museoMedium">S$599</h2>
                        </div> */}
                    </div>
                </div>
                <OverlayLoading open={this.state.isFetching} />
            </React.Fragment>
        )
    }
}

NavLinks.propTypes = {
    editMode: PropTypes.bool
}

export default observer(NavLinks)