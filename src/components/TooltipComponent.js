import React, { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import { $mobx } from 'mobx';

const Tooltip = (props) => {
    const { toggle , tooltipstring } = props;
    
    const tooltipStyle = {
        bottom:'110%',
        width:'100%',
        position:'absolute'
    }

    const tooltipTextStyle = {
        textAlign: 'center',
        bottom:'20%',
        margin: 'auto',
        padding: '5px 5px',
        borderRadius: '5px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#A2AAAD',
        backgroundColor: 'white',
        fontSize: '12px',
        color: '#A2AAAD',
        position:'absolute'
    }
    
    const tooltipArrow = {
        content: "",
        position: 'absolute',
        top: '100%',
        left:'50%',
        marginLeft: '-5px',
        borderWidth: '5px',
        borderStyle: 'solid',
        borderColor: '#A2AAAD transparent transparent transparent',
    }

	return (
        <div style= {tooltipStyle}>
            <div style={toggle}>
                {toggle && 
                    <div style={tooltipTextStyle}>
                        {tooltipstring}
                        <div style={tooltipArrow}/> 
                    </div>
                }
            </div>
        </div>
	)
}

export default observer(Tooltip);