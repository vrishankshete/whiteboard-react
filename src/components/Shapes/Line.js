import React from 'react';

export default class Line extends React.Component{
    render(){
        let {style, x1, y1, x2, y2} = this.props.attributes;
        return (
            <line style={style} x1={x1} y1={y1} x2={x2} y2={y2}/>
        );
    }
} 