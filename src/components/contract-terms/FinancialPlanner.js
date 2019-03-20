import React from 'react';
import Slider from '@material-ui/lab/Slider';
import { CardLoading, OverlayLoading } from './../common/Loading';

class FinancialPlanner extends React.Component {
	state = {
		pricePlanner: [],
		isLoading: false
	};
	componentDidMount() {
		this.getPricePlanner();
	}
	componentDidUpdate(prevProps) {
		if (prevProps.duration !== this.props.duration) this.getPricePlanner();
	}
	getPricePlanner() {
		this.setState({ isLoading: true });
		this.props.productStore.getPricePlanner().then((data) => {
			this.setState({ pricePlanner: data, isLoading: false });
			data.find((d, i) => {
				if (d.default) {
					this.props.productStore.setPlanner(d.id);
					this.props.slider.onChange(i);
				}
				return null;
			});
		});
	}
	onChangeSlider = () => (e, v) => {
		this.props.productStore.setPlanner(this.state.pricePlanner[v].id);
		this.props.slider.onChange(v);
	};
	render() {
		return (
			<section className="mb-4">
				<h2 className="title-text text-center mb-5 mt-5">Budget Planner</h2>
				<OverlayLoading open={this.state.isLoading} transparent={true} scrollable={true} />
				{!this.state.isLoading && this.state.pricePlanner.length > 0 ? (
					<div className="card shadow mb-4 border">
						<div className="card-body">
							<div className="row">
								<div className="col-sm-7">
									<div className="museoMedium special-text">Please choose your price on the bar </div>
									<Slider
										className="pt-4 pb-4"
										value={this.props.slider.value}
										min={0}
										max={this.state.pricePlanner.length - 1}
										step={1}
										onChange={this.onChangeSlider()}
									/>
									<div className="row">
										<div className="col">Original Monthly Price</div>
										<div className="col text-right">Pay Less Monthly</div>
									</div>
								</div>
								<div className="col-sm-5 border-left-sm border-0">
									<div className="row text-center">
										<div className="col">
											<div>
												Estimated <br /> Upfront Cost <br />(excludes GST)
											</div>
											<div className="font-size-32 museoMedium blue">
												S${this.state.pricePlanner[this.props.slider.value].otc ? (
													this.state.pricePlanner[this.props.slider.value].otc
												) : (
													0
												)}
											</div>
										</div>
										<div className="col">
											<div>
												Estimated <br /> Monthly Payment <br />(excludes GST)
											</div>
											<div className="font-size-32 museoMedium blue">
												S${this.state.pricePlanner[this.props.slider.value].rc}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<CardLoading />
				)}
			</section>
		);
	}
}

export default FinancialPlanner;
