import React from 'react';
import ToolTip from './ToolTip';

export default class Path extends React.Component{
    getSVGPath(rawPoints){
        let svgPath = 'M '+rawPoints[0].x+' '+rawPoints[0].y;
        let len = rawPoints.length;
        for(let i=1; i<len; i++){
            svgPath = svgPath + ' L' + rawPoints[i].x + ' ' + rawPoints[i].y;
        }
        return svgPath;
    }

    renderShape(){
        let {style, points} = this.props.attributes;
        let d = this.getSVGPath(points);
        let {showToolTip, name} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <path style={style} d={d}/>
                    <ToolTip name={name} x={points[points.length-1].x} y={points[points.length-1].y}/>
                </g>
            );
        }                         
        return(<path style={style} d={d}/>);
    }

    render(){
        return this.renderShape();
    }
} 