import React from 'react';
import Rectangle from './Rectangle';

export default class Shape extends React.Component{

    renderShape(){
        switch(this.props.shape.type) {
            case 'rectangle': 
            return <Rectangle shape={this.props.shape}/>

            default:
            return <Rectangle shape={this.props.shape}/>            
        }
    }

    render(){
        return this.renderShape();
    }
} 