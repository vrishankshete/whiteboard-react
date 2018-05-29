import React from 'react';

export default class Rectangle extends React.Component{
    render(){
        let {style, width, height, x, y} = this.props.attributes;
        return (
            <rect style={style} width={width} height={height} x={x} y={y}/>
        );
    }
} 