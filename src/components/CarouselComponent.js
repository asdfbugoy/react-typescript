import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CarouselComponent extends React.PureComponent {
    render() {
        const { imageList, imageID, width } = this.props;
        return (
            <div>
                { imageList.map((image, index) => 
                    <img key={index} src={image} id={imageID} width={width} className="img-fluid list-carousel-img active"/>)}
            </div>
        )
    };
}

export default CarouselComponent;

CarouselComponent.propTypes = {
    imageID: PropTypes.string.isRequired,
    imageList: PropTypes.array.isRequired,
    width: PropTypes.string
}