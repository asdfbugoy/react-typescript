import React from 'react'
import Banner from 'components/BannerComponent'
import { QuantityComponent } from 'components/QuantityComponent'
import Checkbox from '@material-ui/core/Checkbox'
import { ROUTER_MS_CONTRACT_TERMS, ROUTER_MS_OVERVIEW } from 'stores/global'
import { Link } from 'react-router-dom'
import ProgressStep from 'components/ProgressStep';
import { ContentLoading } from 'components/common/Loading';
import { observer } from 'mobx-react'
import "abortcontroller-polyfill"
	
const tempState = {
	banner: {
		background: 'img/hero4.jpg',
		mobileBackground: 'img/hero4-mobile.jpg',
		textcolor: '',
		title: 'Add-ons'
	}
}

class Addons extends React.Component {
	constructor(){
		super();
		this.state = {
			isLoading: false
		}
		this.abortController = new window.AbortController();
	}
	componentDidMount() {
		this.setState({
			isLoading: true
		})
		this.props.rootStore.productMSCloud
			.getAddons({
				signal: this.abortController.signal
			})
			.then( () => {
				this.setState({
					isLoading: false
				})
			})
			.catch( error => {
				this.setState({
					isLoading: false
				})
			});
	}

	componentWillUnmount(){
		this.abortController.abort();
	}

	render() {
		const addons = this.props.rootStore.productMSCloud.addons
		const { productMSCloud } = this.props.rootStore;
		return (
			<article className="main background-very-light-gray pb-5">
				<Banner {...tempState.banner} />
				<div className="container">
					<ProgressStep />
					<h2 className="title-text text-center mb-5">Available Add-ons</h2>
					{productMSCloud.__isStep_Addon_Ready && !this.state.isLoading && <React.Fragment>
						<NewView addons={addons} />
						<div className="row align-items-center text-center text-sm-left">
							<div className="col-sm-auto">
								<Link to={ROUTER_MS_CONTRACT_TERMS} className="btn btn-singtel-go-primary">
									Next
								</Link>
							</div>
							<div className="col-sm-auto pt-3 pb-3 pt-sm-0 pb-sm-0">
								<span>or</span>
							</div>
							<div className="col-sm-auto">
								<Link to={ROUTER_MS_OVERVIEW} className="avenirHeavy">
								Back to Packages
								</Link>
							</div>
						</div>
					</React.Fragment>
					}
					{ this.state.isLoading && <ContentLoading />}
				</div>
			</article>
		);
	}
}
export default observer(Addons)

const NewView = observer((props) => {
	const { addons } = props
	return (
		<section className="mb-5">
			{addons.map((d, i) => <div key={i} className="card border shadow mb-2">
				<div className="card-body">
					<div className="row align-items-center">
						<div className="col text-center text-sm-left mb-3 mb-sm-0">
							<div className="avenirHeavy mb-2">{d.title}</div>
							<div>
								{ d.description.split('\n').map( (item, index) => 
									<React.Fragment key={index}>{item}<br/></React.Fragment> ) 
								}
							</div>
						</div>
						<div className="col-md-3 col-lg-2 text-center">
							{d.dataType === 'checkbox' && <Checkbox
								onChange={ ()=>d.toggleCheckbox() }
								checked={ d.__isChecked }
							/>}
							{d.dataType === 'Number' && <QuantityComponent
								quantity={d.qty}
								onDecrementQuantity={d.decrementQty}
								onChangeQuantity={d.changeQty}
								onIncrementQuantity={d.increaseQty}
								min={0}
								max={100}
							/>}
						</div>
					</div>
				</div>
			</div>)}
		</section>
	)
})

const InputOption = observer((props) => {
	const { d } = props
	switch (d.dataType) {
		case 'checkbox':
			return <Checkbox
				onChange={(e) => d.checkBoxQty(e.currentTarget.checked)}
				checked={d.getQtyBoolean()}
			/>
		case 'Number':
			return <QuantityComponent
				quantity={d.quantity}
				onDecrementQuantity={d.decrementQty}
				onChangeQuantity={d.changeQty}
				onIncrementQuantity={d.increaseQty}
				min={0}
				max={100}
			/>
		default:
			return <input />
	}
})