import React from 'react';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';
import Line from './Line';
import Path from './Path';

export default class Shape extends React.Component{

    renderShape(){
        switch(this.props.shape.type) {
            case 'rectangle': 
            return <Rectangle attributes={this.props.shape.attributes}/>

            case 'ellipse': 
            return <Ellipse attributes={this.props.shape.attributes}/>

            case 'line': 
            return <Line attributes={this.props.shape.attributes}/>

            case 'pen':
            case 'pencil':
            case 'eraser':
            return <Path attributes={this.props.shape.attributes}/>

            default:
                return null;
            //return <Rectangle attributes={this.props.shape.attributes}/>            
        }
    }

    render(){
        return this.renderShape();
    }
} 