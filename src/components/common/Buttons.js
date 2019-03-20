import React from 'react';

const AsyncButton = (props) => {
	return (
		<button
			type="button"
			className={`${props.className} ${props.isAsync ? 'disabled' : ''}`}
			{...props}
			disabled={props.isAsync}
		>
			{props.isAsync && (
				<React.Fragment>
					<i className="fas fa-spinner fa-pulse" />
					{props.asyncText}
				</React.Fragment>
			)}
			{!props.isAsync && props.children}
		</button>
	);
};

export { AsyncButton };
