import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from '../store/actions';
import Shape from './Shapes/Shape';

class Canvas extends React.Component{
    constructor(){
        super();
        this.state = {
            penDown:false,
            drawings:[],
            shape: {
                type:'',
                style:{},
                width:1,
                height:1
            }
        }
    }

    getCommonSVGStyle(e){
        let svgStyle = {};
        //var strokeStyle="", strokeColor="", strokeWidth='strokeWidth:4px;';

        if(e.which === 3){
            svgStyle.stroke='red';
            //strokeColor = 'stroke:red;';
        }
        else{
            svgStyle.stroke='white';            
            //strokeColor = 'stroke:white;';
        }

        switch(this.props.selectedTool){
            case 'pen':
                //Default settings
            break;
            case 'pencil':
                svgStyle.strokeDasharray='5,5';
                //strokeStyle = "strokeDasharray:5,5;";
            break;
            case 'eraser':
                svgStyle.stroke='black';
                svgStyle.strokeWidth='20px';   
            break;
            default:
            break;
        }

        //svgElStyle = 'fill:none;' + strokeColor + strokeWidth + strokeStyle;
        return svgStyle;
    }

    svgMouseDown(e){
        this.setState({penDown:true});
        let style = this.getCommonSVGStyle(e);
        this.setState({
            shape: {
                type:'rectangle',
                style,
                width:10+this.state.shape.width,
                height:10+this.state.shape.height
            }
        });
    }
    svgMouseMove(e){
        if(this.state.penDown){
            console.log(e);
        }
    }
    svgMouseUp(e){
        this.setState({penDown:false});        
    }
    render(){
        return (
            <div> 
                <svg style={{border: '1px solid black',height:'500px',width:'100%',backgroundColor: 'black'}} 
                    onMouseDown={(e)=>this.svgMouseDown(e)}
                    onMouseMove={(e)=>this.svgMouseMove(e)}
                    onMouseUp={(e)=>this.svgMouseUp(e)}
                    onMouseLeave={(e)=>this.svgMouseUp(e)}>
                    <Shape shape={this.state.shape}/>
                    {/* {
                        this.state.allSVGElements.map()
                    } */}
                    {/* <circle style={{cx:40,cy:50, r:40, stroke:"green", strokeWidth:4, fill:"blue"}} />
                    <circle cx="100" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
                    <circle cx="150" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" /> */}
                </svg>
            </div>
        );
    }
}

const mapStateToProos = (state) => {
    return {
        selectedTool: state.selectedTool
    }
}
const mapDispatchToProps = null;
// (dispatch) => {
//     return {
//         toolChanged:(selectedTool)=>dispatch(actionCreator.toolChanged(selectedTool))
//     }
// }
export default connect(mapStateToProos, mapDispatchToProps)(Canvas);