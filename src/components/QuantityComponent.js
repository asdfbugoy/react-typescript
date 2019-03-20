import React from 'react';

class QuantityComponent extends React.PureComponent {
	render(){
        const {onDecrementQuantity, onChangeQuantity, onIncrementQuantity, quantity, min=1, max=50} = this.props;
        let qtyNumber = Number(quantity);
		return(
            <div>
                <a href="javascript:void(0);"
                    onClick={(e) => {
                        e.preventDefault();
                        if ( qtyNumber > min ){
                            onDecrementQuantity();
                        }
                    }}>
                    <i className="fa fa-minus red font-size-14 font-size-10-sm font-size-14-lg"></i>
                </a>
                <input
                    className="quantity mr-2 ml-2" placeholder="1"
                    value={quantity}
                    onChange={ (e) => {
                        e.preventDefault();
                        if ( e.currentTarget.value === '' ) {
                            onChangeQuantity( min );
                        } else if ( !isNaN(e.currentTarget.value) &&  e.currentTarget.value >= min && e.currentTarget.value <= max ) {
                            onChangeQuantity( parseInt(e.currentTarget.value) );
                        }
                    }}
                />
                <a href="javascript:void(0);"
                    onClick={(e) => {
                        e.preventDefault();
                        if ( qtyNumber < max ){
                            onIncrementQuantity();
                        }
                    }}><i className="fa fa-plus red font-size-14 font-size-10-sm font-size-14-lg"></i></a>
            </div>
		)
	}
}

export { QuantityComponent };