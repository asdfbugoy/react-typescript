import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";

import { 
	ROUTER_MS_CONTRACT_TERMS, 
	REST_CLOUD_QUOTE_PDF, 
	ROUTER_QUOTATION_DRAFT } from 'stores/global';
import { OverlayLoading } from 'components/common/Loading'
class CustomerToolbarComponent extends React.Component {

    constructor(){
        super();
        this.state = {
            isSaving: false,
            isCreating: false,
            isPDFCreating: false,
            isFetching: false,
            isManualDownload: false,
            manualDownloadURL: '',
            errorMessage: '',
        };
        this.onClickCreatePDF = this.onClickCreatePDF.bind(this);
        this.onClickCreateQuote = this.onClickCreateQuote.bind(this);
        this.onClickSaveQuote = this.onClickSaveQuote.bind(this);
    }
   
    onClickSaveQuote() {
        const { rootStore } = this.props;
        const uuid = this.props.editMode ? this.props.uuid : rootStore.productMSCloud.uuid;

        this.setState({
            isFetching: true,
            isSaving: true
        });
        rootStore.saveCloudQuote({
            isValidation: false,
            uuid
        }).then((res) => {
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
        const uuid = this.props.editMode ? this.props.uuid : rootStore.productMSCloud.uuid;
        this.setState({
            isFetching: true,
            isCreating: true,
        });
        if (isCheckedTnC) {
            rootStore.createCloudQuote({
                uuid: uuid
            })
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
                    console.error( err );
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
        const uuid = this.props.editMode ? this.props.uuid : rootStore.productMSCloud.uuid;
        this.setState({
            isFetching: true,
            isPDFCreating: true,
            manualDownloadURL: `${REST_CLOUD_QUOTE_PDF}?uuid=${uuid}`,
        });
        if (isCheckedTnC) {
            rootStore.saveCloudQuote({
                isValidation: true,
                uuid
            }).then((res) => {
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
                        url: `${REST_CLOUD_QUOTE_PDF}?uuid=${uuid}`,
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
                                onClick={ this.onClickCreateQuote }
                            >
                                {this.state.isCreating ?
                                    <span><i className="fas fa-spinner fa-pulse fa-lg" /> Creating quote...</span> :
                                    'Create Quote'}
                            </button>
                            <button
                                type="button"
                                className={`btn btn-singtel-go-primary-inverted mb-2  mr-2 ${!isCheckedTnC ? 'disabled' : ''}`}
                                disabled={!isCheckedTnC || this.state.isFetching}
                                onClick={ this.onClickCreatePDF }
                            >
                                {this.state.isPDFCreating ?
                                    <span><i className="fas fa-spinner fa-pulse fa-lg" /> Preparing PDF content...</span> :
                                    'Download Draft Quote'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-singtel-go-primary-inverted mb-2 mr-2"
                                disabled={this.state.isFetching}
                                onClick={ this.onClickSaveQuote }
                            >
                                {this.state.isSaving ?
                                    <span><i className="fas fa-spinner fa-pulse fa-lg" /> Saving Draft...</span> :
                                    'Save Draft'}
                            </button>
                            { this.props.editMode
                                ? <Link to={ROUTER_QUOTATION_DRAFT} className="mb-2 btn"><strong>BACK TO LIST</strong></Link>
                                : <Link to={ROUTER_MS_CONTRACT_TERMS} className="mb-2 btn"><strong>BACK</strong></Link> 
                            }
                        </div>
                    </div>
                </div>
                <OverlayLoading open={this.state.isFetching} />
            </React.Fragment>
        )
    }
}

CustomerToolbarComponent.propTypes = {
    editMode: PropTypes.bool,
    uuid: PropTypes.string
}

export default observer(CustomerToolbarComponent)