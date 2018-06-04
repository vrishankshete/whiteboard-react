import React from 'react';
import ToolTip from './ToolTip';

export default class Ellipse extends React.Component{
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
        let {style, cx, cy, rx, ry} = this.props.attributes;        
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <ellipse style={style} cx={cx} cy={cy} rx={rx} ry={ry}/>
                    <ToolTip name={name} x={cx} y={cy}/>
                </g>
            );
        }
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'15px', opacity:0.5};
            return (
                <g> 
                    {this.state.mouseOverMe?<ellipse style={styleOverlay} cx={cx} cy={cy} rx={rx} ry={ry}/>:''}
                    <ellipse style={style} cx={cx} cy={cy} rx={rx} ry={ry}/>
                    <ellipse onMouseDown={e=>e.stopPropagation()}
                        onMouseUp={(e)=>{e.stopPropagation(); return this.props.removeDrawing(drawingId);}}
                        onMouseOver={this.mouseEntered.bind(this)} onMouseOut={this.mouseOut.bind(this)}
                        style={{...styleOverlay, opacity:0}} cx={cx} cy={cy} rx={rx} ry={ry}/>
                </g>
            );
        }
        return(<ellipse style={style} cx={cx} cy={cy} rx={rx} ry={ry}/>);
    }
    render(){
        return this.renderShape();
    }
} 