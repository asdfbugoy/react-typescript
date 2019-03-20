import React from 'react';
import { Link } from "react-router-dom";

const Hero = (props) => {
    const { backgroundImage, title } = props;
    return (
        <section className="hero d-flex align-items-center" style={{backgroundImage: backgroundImage}}>
            <div className="container">
                <h2 className="leading-text mb-0">{title}</h2>
            </div>
        </section>
    )
}
export default Hero;