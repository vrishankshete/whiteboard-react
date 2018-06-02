import React from 'react';

export default class ToolTip extends React.Component{
    render(){
        let {x, y, name} = this.props;
        return (
            <text style={{stroke:'red'}} x={x} y={y}>{name}</text>
        );
    }
} 