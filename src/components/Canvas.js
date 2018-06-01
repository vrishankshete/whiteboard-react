import React from 'react';
import {connect} from 'react-redux';
import Shape from './Shapes/Shape';
import helper from './Shapes/ShapeHelper';
import {Map} from 'immutable';

class Canvas extends React.Component{
    constructor(props){
        super(props);
        this.penDown = false;
        this.shape = {
            type:'',
            attributes:{
                style:{}
            }
        };
        this.state = {
            drawings:[],
            cursors:{},
            // shape: {
            //     type:'',
            //     attributes:{
            //         style:{}
            //     }
            // }
            shape: this.shape
        }
        this.bindSocketEvents();
    }

    bindSocketEvents(){
        this.props.socket.on('cursorStart', function(msg){
            this.setState({cursors:{...this.state.cursors, [msg.name]:msg.drawingData}});
        });
        this.props.socket.on('updateCursor', function(msg){
            this.setState({cursors:{...this.state.cursors, [msg.name]:msg.drawingData}});
            
        });
        this.props.socket.on('addDrawing', function(msg){
            this.setState({drawings:[...this.state.cursors, this.state.cursors[msg.name]]});            
        });
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
        svgStyle.fill='none';
        return svgStyle;
    }

    svgMouseDown(e){
        this.penDown = true;
        let style = this.getCommonSVGStyle(e);
        helper[this.props.selectedTool].penDown({x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY});
        //helper[this.props.selectedTool].initialValues.x = e.nativeEvent.offsetX;
        //helper[this.props.selectedTool].initialValues.y = e.nativeEvent.offsetY;]
        this.shape = {
            type:this.props.selectedTool,
            attributes:{
                style,
                ...helper[this.props.selectedTool].initialValues
            }
        };
        this.props.socket.emit('cursorStart', this.shape);
        this.setState({shape:this.shape});
    }
    svgMouseMove(e){
        if(this.penDown){
            let attr = helper[this.props.selectedTool].getAttributes(e.nativeEvent.offsetX,e.nativeEvent.offsetY);
            this.shape = {
                type:this.shape.type,
                attributes:{
                    style:this.shape.attributes.style,
                    ...attr
                }
            };
            this.setState({shape: this.shape});
            this.props.socket.emit('updateCursor', this.shape);
        }
    }
    svgMouseUp(e){
        if(this.penDown){
            this.penDown = false;
            if(helper[this.props.selectedTool].penUp){
                let attr = helper[this.props.selectedTool].penUp();
                this.shape = {
                    type:this.shape.type,
                    attributes:{
                        style:this.shape.attributes.style,
                        ...attr
                    }
                };
                // this.setState({shape: this.shape});
                // this.setState({drawings: [...this.state.drawings, this.shape]});
                //this.setState({shape: this.shape});
            }
            this.props.socket.emit('addDrawing', this.shape);
            this.setState({drawings: [...this.state.drawings, this.shape]});
            //this.setState({shape: this.shape});
        }
    }
    render(){
        //console.log(this.props.socket, "VRI");
        this.bindSocketEvents();
        return (
            <div> 
                <svg style={{border: '1px solid black',height:'500px',width:'100%',backgroundColor: 'black'}} 
                    onMouseDown={(e)=>this.svgMouseDown(e)}
                    onMouseMove={(e)=>this.svgMouseMove(e)}
                    onMouseUp={(e)=>this.svgMouseUp(e)}
                    onMouseLeave={(e)=>this.svgMouseUp(e)}>
                    {
                        this.state.drawings.map((drawing)=><Shape shape={drawing}/>)
                    }
                    <Shape shape={this.state.shape}/>

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