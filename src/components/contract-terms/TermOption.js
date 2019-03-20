import React from 'react';
import { observer } from 'mobx-react';

const TermOption = (props) => {
	const { term, selectedDuration } = props;
	const onClick = () => (e) => {
		e.preventDefault();
		term.doCheck();
	};
	return (
		<a
			href="javascript:void(0)"
			onClick={onClick()}
			className={`card border shadow h-100 ${selectedDuration === term.duration ? 'active' : ''}`}
		>
			<div className="position-absolute ml-2 mt-2">
				<i className="fas fa-check-circle font-size-28" />
			</div>
			{term.default && <div className="ribbon right text-center text-uppercase">Best Value</div>}
			<div className="card-body">
				<div className="pt-4 pb-4 text-center">
					<small>
						<b className="text-uppercase">from</b>
					</small>
					<h1 className="museoMedium m-0 p-0">
						{term.rc} {term.currency}
					</h1>
					<small>
						per month<br />(excludes GST)
					</small>
					<p className="mt-4 mb-2">
						<span>
							{term.duration} {term.unit}s Contract
						</span>
					</p>
				</div>
			</div>
		</a>
	);
};

export default observer(TermOption);
