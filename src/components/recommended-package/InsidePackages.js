import React from 'react'
import { isMobileOnly } from 'react-device-detect'
import { observer } from 'mobx-react'

const InsidePackages = ( {packageContent} ) => {
    return(
        <section className={`${isMobileOnly ? 'text-center' : ''} mb-5`}>
            <div className="card shadow background-light-gray">
                <div className="card-body pl-sm-5 pr-sm-5 pl-2 pr-2">
                    <h2 className="title-text-inside pt-sm-4 pb-sm-4">What is inside the package(s)?</h2>
                    <div>
                        { packageContent.length > 0 && packageContent.map( 
                            (data, index) => <InsidePackage key={index} {...data} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default observer(InsidePackages)

const InsidePackage = (props) => {
    const { title, content } = props;
    return (
        <div className="card shadow mb-4">
            <div className="card-body">
                <h4 id="networkprotection" className="sub-title-text">{title}</h4>
                <div>
                    { content.split('\n').map((item, index) => <React.Fragment key={index}>{item}<br/></React.Fragment> ) }
                </div>
            </div>
        </div>
    )
}