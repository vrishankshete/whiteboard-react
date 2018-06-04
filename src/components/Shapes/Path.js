import React from 'react';
import ToolTip from './ToolTip';

export default class Path extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            mouseOverMe:false
        }
    }
    mouseEntered(){
        this.setState({mouseOverMe:true});
    }
    mouseOut(){
        this.setState({mouseOverMe:false});
    }

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
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <path style={style} d={d}/>
                    <ToolTip name={name} x={points[points.length-1].x} y={points[points.length-1].y}/>
                </g>
            );
        }
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'15px', strokeLinecap:'round', opacity:0.5};
            return (
                <g> 
                    {this.state.mouseOverMe?<path style={styleOverlay} d={d}/>:''}
                    <path style={style} d={d}/>
                    <path onMouseDown={e=>e.stopPropagation()}
                        onMouseUp={(e)=>{e.stopPropagation(); return this.props.removeDrawing(drawingId);}}
                        onMouseOver={this.mouseEntered.bind(this)} onMouseOut={this.mouseOut.bind(this)}
                        style={{...styleOverlay, strokeDasharray:'', opacity:0}} d={d}/>
                </g>
            );
        }
        return(<path style={style} d={d}/>);
    }

    render(){
        return this.renderShape();
    }
} 