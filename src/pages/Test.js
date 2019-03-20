import React from 'react';
import { Collapsable, CollapsableContent, CollapsableButton } from './../components/Collapsable'

class Test extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <Collapsable>
                
                <Content />
            </Collapsable>
        );
    }
}

const Content = (props) => {
    const onClick = () => (e) => {
        props.collapse.toggle()
    }
    return (
        <article className="main background-very-light-gray pb-5 pt-5">
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col-sm">Header</div>
                            <CollapsableButton collapse={props.collapse}>TEST</CollapsableButton>
                            <div className="col-sm-auto"><button className="btn btn-link" onClick={onClick()}><i className="fa fa-arrow-down"></i></button></div>
                        </div>
                    </div>
                    <CollapsableContent collapse={props.collapse}>
                        <div className="card-body">
                            <div>asdfsadf</div>
                        </div>
                    </CollapsableContent>
                </div>
            </div>
        </article>
    )
}

export default Test;