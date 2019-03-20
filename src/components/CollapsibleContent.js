import React from 'react';

class CollapsibleContent extends React.Component{
	constructor(){
		super();
		this.doToggleCollapse = this.doToggleCollapse.bind(this);
		this.state = {
			isActive: false
		}
	}

	doToggleCollapse(){
		this.setState({ isActive: !this.state.isActive });
		// window.$(`#addOn_collapsible_${this.props.key}`).collapse( this.state.isActive ? 'show':'hide');
	}

	render(){
		const { title, content, pic_type, more } = this.props.content
		const imageTypes = {
			PIC_AS: '',
			PIC_WAP: 'img/mr33.jpg',
			PIC_SWITCH: 'img/mx100.jpg',
			PIC_RSWITCH: 'img/ms120-24.jpg',
			PIC_CAM: 'img/mv12.jpg',
			PIC_CAB: ''
		}
		return (
			<section>
				<div className="card shadow mb-4 border">
					<div className="card-body">
						<div className="row mb-4">
							<div className="col-md">
								<h4 className="museo">{title}</h4>
								<p>{content}</p>
								{ more && more !== '' && 
									<div className={ this.state.isActive ? 'show': 'collapse' }>
									{ more.split('\n').map((item, index) => <React.Fragment key={index}>{item}<br/></React.Fragment> ) }
								</div>
								}
							</div>
							<div className="col-md-4 text-center">
								<div className="addons-product" style={{ backgroundImage: `url(${ imageTypes[pic_type]})`, backgroundSize: 'contain' }} />
							</div>
						</div>
						{ more && more !== '' && <div>
							<a href="javascript:void(0);" 
								className="read-details" 
								onClick={ this.doToggleCollapse }>
								{ this.state.isActive ? 'Hide Detail' : 'Read Detail'}
							</a>
						</div>
						}
					</div>
				</div>
			</section>
		)
	}
}

export { CollapsibleContent }