import React from 'react';
import ToolTip from './ToolTip';

export default class Rectangle extends React.Component{
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

    renderShape(){
        let {style, width, height, x, y} = this.props.attributes;
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <rect style={style} width={width} height={height} x={x} y={y}/>
                    <ToolTip name={name} x={x} y={y}/>
                </g>
            );
        }
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'15px', opacity:0.5};
            return (
                <g> 
                    {this.state.mouseOverMe?<rect style={styleOverlay} width={width} height={height} x={x} y={y}/>:''}
                    <rect style={style} width={width} height={height} x={x} y={y}/>
                    <rect onMouseDown={e=>e.stopPropagation()}
                        onMouseUp={(e)=>{e.stopPropagation(); return this.props.removeDrawing(drawingId);}}
                        onMouseOver={this.mouseEntered.bind(this)} onMouseOut={this.mouseOut.bind(this)}
                        style={{...styleOverlay, opacity:0}} width={width} height={height} x={x} y={y}/>
                </g>
            );
        }
        return(<rect style={style} width={width} height={height} x={x} y={y}/> );
    }
    render(){
        return this.renderShape();
    }
}