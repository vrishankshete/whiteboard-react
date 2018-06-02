import React from 'react';
import ToolTip from './ToolTip';

export default class Ellipse extends React.Component{

    renderShape(){
        let {style, cx, cy, rx, ry} = this.props.attributes;        
        let {showToolTip, name} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <ellipse style={style} cx={cx} cy={cy} rx={rx} ry={ry}/>                    
                    <ToolTip name={name} x={cx} y={cy}/>
                </g>
            );
        }                         
        return(<ellipse style={style} cx={cx} cy={cy} rx={rx} ry={ry}/>);
    }
    render(){
        return this.renderShape();
    }
} 