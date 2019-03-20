import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import { $mobx } from 'mobx';
import TooltipComponent from '../components/TooltipComponent'

class AnswerViewItem extends Component 
{
	constructor(props){
		super(props);
		this.state = {
			isToggle: false
		};
	}

	hover = (e) =>{
		this.setState({
			isToggle: !this.state.isToggle
		});
	}

	checkIfTooltipIsEmpty(tooltip) {
		return (tooltip !== undefined && tooltip !== '') ? <TooltipComponent toggle={{display: this.state.isToggle ? 'block' : 'none'}} tooltipstring={tooltip} /> : '';
	}

	render()
	{
		const {answer, size, tooltip} = this.props;

    	return (
			
			<div className={size ? size : 'col-md-4 col-lg-3 mb-3'}>
				<a data-toggle="tooltip"
				data-placement="top" 
				href="javascript:void(0);" 
				className={`card border ${ answer.styleChecked }`} 
				onClick={ (e) => {answer.doCheck();}}
				onMouseEnter={this.hover}
				onMouseLeave={this.hover}>
				{this.checkIfTooltipIsEmpty(tooltip)}
					<div className="position-absolute ml-2 mt-2"><i className="fas fa-check-circle"></i></div>
					<div className="card-body">
						<div className="pt-4 pb-4 text-center">
							{ answer.label.split('\n').map((item, index) => <React.Fragment key={index}>{item}<br/></React.Fragment> ) }
						</div>
				</div>
				</a>
			</div>
    	);
  	}
}

export default observer(AnswerViewItem);