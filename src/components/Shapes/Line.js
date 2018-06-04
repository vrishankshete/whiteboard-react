import React from 'react';
import ToolTip from './ToolTip';

export default class Line extends React.Component{
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
        let {style, x1, y1, x2, y2} = this.props.attributes;            
        let {showToolTip, name, showOverlay, drawingId} = this.props;
        if(showToolTip){
            return (
                <g> 
                    <line style={style} x1={x1} y1={y1} x2={x2} y2={y2}/>                    
                    <ToolTip name={name} x={x2} y={y2}/>
                </g>
            );
        }                         
        if(showOverlay){
            let styleOverlay = {...style, strokeWidth:'15px', strokeLinecap:'round', opacity:0.5};
            return (
                <g> 
                    {this.state.mouseOverMe?<line style={styleOverlay} x1={x1} y1={y1} x2={x2} y2={y2}/>:''}
                    <line style={style} x1={x1} y1={y1} x2={x2} y2={y2}/>
                    <line onMouseDown={e=>e.stopPropagation()}
                        onMouseUp={(e)=>{e.stopPropagation(); return this.props.removeDrawing(drawingId);}}
                        onMouseOver={this.mouseEntered.bind(this)} onMouseOut={this.mouseOut.bind(this)}
                        style={{...styleOverlay, opacity:0}} x1={x1} y1={y1} x2={x2} y2={y2}/>
                </g>
            );
        }
        return(<line style={style} x1={x1} y1={y1} x2={x2} y2={y2}/>);
    }
    render(){
        return this.renderShape();
    }
} 