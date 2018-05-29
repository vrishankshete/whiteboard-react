import React from 'react';
import Rectangle from './Rectangle';
import Ellipse from './Ellipse';

export default class Shape extends React.Component{

    renderShape(){
        switch(this.props.shape.type) {
            case 'rectangle': 
            return <Rectangle attributes={this.props.shape.attributes}/>

            case 'ellipse': 
            return <Ellipse attributes={this.props.shape.attributes}/>

            default:
            return <Rectangle attributes={this.props.shape.attributes}/>            
        }
    }

    render(){
        return this.renderShape();
    }
} 