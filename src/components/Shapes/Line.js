import React from 'react';
import ToolTip from './ToolTip';

export default class Line extends React.Component{
    renderShape(){
        let {style, x1, y1, x2, y2} = this.props.attributes;            
        let {showToolTip, name} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <line style={style} x1={x1} y1={y1} x2={x2} y2={y2}/>                    
                    <ToolTip name={name} x={x2} y={y2}/>
                </g>
            );
        }                         
        return(<line style={style} x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    render(){
        return this.renderShape();
    }
} 