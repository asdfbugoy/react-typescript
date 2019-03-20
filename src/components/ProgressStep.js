import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import ProgressStepConfiguration from 'utils/ProgressStepConfiguration'

const ProgressStep = (props) => {
    const { index, title, activeIndex, config } = props;
    const defaultClassNames = "item d-flex align-items-center";
    let status;
    if(index < activeIndex) status = "done";
    if(index === activeIndex) status = "active";
    return (
        <div className={`${defaultClassNames} ${status}`}>
            <div className="bar"></div>
            <Link to={config.pages[index].pathname} className="circle d-block"></Link>
            <div className="title">{title}</div>
            <div className="bar"></div>
        </div>
    )
};

const ProgressSteps = (props) => {
    const config = ProgressStepConfiguration.find((d) => {
        var re = new RegExp(d.product, 'g')
        if(props.location.pathname.match(re)) return d
    })
    const activeIndex = config.pages.findIndex(data => data.pathname === props.location.pathname);
    const showProgresSteps = activeIndex === -1 ? false : true;
    return (
        <section>
            {showProgresSteps && <div className="card shadow mb-5">
                <div className="card-body mt-3 mb-3">
                    <div className="process-status d-flex justify-content-center">
                        {config.pages.map((data, index) => <ProgressStep config={config} key={index} index={index} title={data.title} activeIndex={activeIndex} /> )}
                    </div>
                </div>
            </div>}
        </section>
    )
}

ProgressSteps.propTypes = {
    location: PropTypes.shape({pathname: PropTypes.string.isRequired}).isRequired
}

export default withRouter(ProgressSteps);