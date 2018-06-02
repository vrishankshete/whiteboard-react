import React from 'react';
import ToolTip from './ToolTip';

export default class Rectangle extends React.Component{
    renderShape(){
        let {style, width, height, x, y} = this.props.attributes;
        let {showToolTip, name} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <rect style={style} width={width} height={height} x={x} y={y}/>
                    <ToolTip name={name} x={x} y={y}/>
                </g>
            );
        }                         
        return(<rect style={style} width={width} height={height} x={x} y={y}/> );
    }
    render(){
        return this.renderShape();
    }
} 