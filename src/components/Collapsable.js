import React, { Component } from 'react';

class Collapsable extends Component {
	state = {
		isOpen: false,
		height: 0
	}
	contentRef = React.createRef()
	componentDidMount() {
		if (this.props.isOpen) this.setState(({
			isOpen: this.props.isOpen,
			height: this.contentRef.current ? this.contentRef.current.clientHeight : 0
		}))
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.isOpen !== prevProps.isOpen)
			this.setState(({
				isOpen: this.props.isOpen,
				height: this.props.isOpen && this.contentRef.current
					? this.contentRef.current.clientHeight
					: 0
			}))
	}
	toggle = () => () => {
		this.setState((prevState) => ({
			isOpen: !prevState.isOpen,
			height: !prevState.isOpen && this.contentRef.current ? this.contentRef.current.clientHeight : 0
		}))
	}
	setHeight = () => () => {
		setTimeout(() => this.setState(({ height: this.contentRef.current.clientHeight })), 0)
	}
	render() {
		const children = React.Children.map(this.props.children, (child) => {
			return React.cloneElement(child, {
				collapse: {
					isOpen: this.state.isOpen,
					height: this.state.height,
					toggle: this.toggle(),
					setHeight: this.setHeight(),
					contentRef: this.contentRef
				}
			})
		})
		return <div className={this.props.className}>
			{children}
		</div>
	}
}

const CollapsableContent = (props) => {
	return (
		<div className="collapsing" style={{ height: props.collapse.height + 'px' }}>
			<div className={props.className} ref={props.collapse.contentRef}>{props.children}</div>
		</div>
	)
}

const CollapsableButton = (props) => {
	const onClick = () => (e) => {
		e.preventDefault()
		props.collapse.toggle()
	}
	return (
		<a href="" className={props.className} onClick={onClick()}>
			<div className="row">
				<div className="col">{props.children}</div>
				<div className="col-auto">
					<img alt=""
						className="icons icon-collapsible m-0"
						src={`img/icons/collapse_button_${props.collapse.isOpen ? 'up' : 'down'}.png`}
					/>
				</div>
			</div>
		</a>
	)
}

export { Collapsable, CollapsableContent, CollapsableButton }
