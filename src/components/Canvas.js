import React from 'react';
import {connect} from 'react-redux';
import Shape from './Shapes/Shape';
import helper from './Shapes/ShapeHelper';

class Canvas extends React.Component{
    constructor(){
        super();
        this.state = {
            penDown:false,
            drawings:[],
            shape: {
                type:'',
                attributes:{
                    style:{}
                }
            }
        }
    }

    getCommonSVGStyle(e){
        let svgStyle = {};
        (e.which === 3)?svgStyle.stroke='red':svgStyle.stroke='white';
        switch(this.props.selectedTool){
            case 'pencil':
                svgStyle.strokeDasharray='5,5';
            break;
            case 'eraser':
                svgStyle.stroke='black';
                svgStyle.strokeWidth='20px';   
            break;
            default:
            break;
        }
        return svgStyle;
    }

    svgMouseDown(e){
        this.setState({penDown:true});
        let style = this.getCommonSVGStyle(e);
        helper[this.props.selectedTool].initialValues.x = e.nativeEvent.offsetX;
        helper[this.props.selectedTool].initialValues.y = e.nativeEvent.offsetY;
        this.setState({
            shape: {
                type:this.props.selectedTool,
                attributes:{
                    style,
                    ...helper[this.props.selectedTool].initialValues
                }
            }
        });
    }
    svgMouseMove(e){
        if(this.state.penDown){
            let attr = helper[this.props.selectedTool].getAttributes(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
            this.setState({
                shape: {
                    type:this.state.shape.type,
                    attributes:{
                        style:this.state.shape.attributes.style,
                        ...attr
                    }
                }
            }); 
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
                        this.state.allSVElements.map()
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