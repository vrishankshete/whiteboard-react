import React from 'react';

export default class Rectangle extends React.Component{
    render(){
        //let [shape] = this.props.shape;
        return (
            <rect style={this.props.shape.style} width={this.props.shape.width} height={this.props.shape.height}/>
        );
    }
} 