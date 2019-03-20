import React from 'react';

class InstallationMaintenance extends React.Component {
    state = {
        isForm: false,
    }
    componentDidMount() {
		//
    }
    showForm = () => () => {
		this.setState({isForm: true});
    }
    showView = () => () => { 
        this.setState({isForm: false});
    }
    render() {
        return (
            <React.Fragment>
                <h2 className="title-text text-center mb-5">Installation &amp; Maintenance</h2>
				{ this.props.packages && this.props.packages.misc &&
                <div className="card mb-4 border shadow">
                    { this.state.isForm ? 
						<InstallationMaintenanceForm priceParams={this.props.packages.misc} showView={this.showView()} />
						: <InstallationMaintenanceView priceParams={this.props.packages.misc} showForm={this.showForm()} />}
                </div>
				}
            </React.Fragment>
        )
    }
}

const InstallationMaintenanceView = (props) => {
    const onClickShowForm = () => (e) => {
        e.preventDefault();
        props.showForm();
    }
    return (
        <div className="card-body">
            <div className="row align-items-center">
                <div className="col">
                    <ul className="custom-list mb-sm-0 pl-3">
                        {props.priceParams.map((data, index) => 
                            <li key={index}><span>{data.name} {data.value}</span></li>
                        )}
                    </ul>
                </div>
                <div className="col-auto">
                    <a href="javascript:void(0)" onClick={onClickShowForm()}  className="btn btn-singtel-go-primary">Change Option</a>
                </div>
            </div>
        </div>
    )
}

const InstallationMaintenanceForm = (props) => {
    const onClickShowView = () => (e) => {
        e.preventDefault();
        props.showView();
    }
    const onClickSetActive = () =>(e) => {
        e.preventDefault();
        // console.log('modify state');
    }
    return (
        <div className="card-body">
            {props.priceParams.map((data, index) =>
                <section key={index}>
                    <h6 className="special-text mb-3">{data.name}</h6>

                    <div className="row">
                        { data.options.map((optionData, optionIndex) => 
							<AnswerViewItem answer={optionData} key={`misc_${index}_${optionIndex}`}/>
						)}
                    </div>
                </section>
            )}
            <div className="text-center">
                <a href="javascript:void(0)" onClick={onClickShowView()} className="btn btn-singtel-go-primary-inverted">Close</a>
            </div>
        </div>
    )
}
