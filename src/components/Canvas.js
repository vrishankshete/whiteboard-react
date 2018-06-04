import React from 'react';
import {connect} from 'react-redux';
import Shape from './Shapes/Shape';
import helper from './Shapes/ShapeHelper';
//import {Map} from 'immutable';

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
        this.toolTip = {
            show:false,
            style:{stroke:'red'}
        };
        this.cursors = {};
        this.drawings = [];
        this.state = {
            toolTip:this.toolTip,
            drawings:[],
            cursors:{},
            shape: this.shape
        }
    }

    componentDidMount(){
        this.bindSocketEvents();
        this.props.socket.emit("room id", this.props.roomId);
        this.props.socket.emit("submit name", this.props.name);
    }
    // componentWillReceiveProps(nextProps){
    //     if(this.props.roomId === -1 && nextProps.roomId != -1){
    //         this.props.socket.emit("room id", nextProps.roomId);
    //         this.props.socket.emit("submit name", nextProps.name);
    //     }
    // }

    bindSocketEvents(){
        this.props.socket.on('cursorStart', (msg)=>{
            this.cursors = {...this.cursors, [msg.name]:msg.drawingData}
            this.setState({cursors:this.cursors});
        });
        this.props.socket.on('updateCursor',(msg)=>{
            this.cursors[msg.name] = msg.drawingData;
            this.setState({cursors:this.cursors});
        });
        this.props.socket.on('addDrawing', (msg)=>{
            //if(this.cursors[msg.name]){
                this.drawings = [...this.drawings, msg];
                console.log("DRAWINGS:::: ",this.drawings);
                this.setState({drawings:this.drawings});
            //}
            delete this.cursors[msg.name];
            this.setState({cursors:this.cursors});
        });
        this.props.socket.on('removeDrawing', (msg)=>{
            // this.drawings = [...this.drawings, msg.drawingData];
            // this.setState({drawings:this.drawings});
            // delete this.cursors[msg.name];
            // this.setState({cursors:this.cursors});  
        });
        this.props.socket.on('initDrawings',(msg)=>{
            //this.drawings = msg.map(drawing=>drawing.drawingData);
            this.drawings = msg;
            this.setState({drawings:this.drawings});
            
        });
        this.props.socket.on('clearAll',()=>{
            this.drawings = [];
            this.setState({drawings:this.drawings});
            
        });
    }

    removeDrawing(drawingId){
        this.drawings = this.drawings.filter(drawing=>drawing.drawingId != drawingId);
        this.setState({drawings:this.drawings});        
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
            }
            this.props.socket.emit('addDrawing', this.shape);
            // this.drawings = [...this.drawings, this.shape];
            // this.setState({drawings: this.drawings});
            this.shape = {
                type:'',
                attributes:{
                    style:{}
                }
            };
            this.setState({shape: this.shape});
        }
    }
    renderCursors(){
        let constArr = [];
        let cursors = this.state.cursors;
        for (const cursor in cursors) {
            constArr.push(<Shape showToolTip={true} name={cursor} shape={cursors[cursor]}/>);
        }
        return constArr;
    }
    render(){
        return (
            <div> 
                <svg style={{cursor:'pointer',border: '1px solid black',height:'500px',width:'100%',backgroundColor: 'black'}} 
                    onMouseDown={(e)=>this.svgMouseDown(e)}
                    onMouseMove={(e)=>this.svgMouseMove(e)}
                    onMouseUp={(e)=>this.svgMouseUp(e)}
                    onMouseLeave={(e)=>this.svgMouseUp(e)}
                    onTouchStart={(e)=>this.svgMouseDown(e)}
                    onTouchMove={(e)=>this.svgMouseMove(e)}
                    onTouchEnd={(e)=>this.svgMouseUp(e)}>
                    {
                        this.state.drawings.map((drawing)=>{console.log("HERRE",drawing); return <Shape removeDrawing={this.removeDrawing.bind(this)} drawingId={drawing.drawingId} showOverlay={true} shape={drawing.drawingData}/>})
                    }
                    {
                        this.renderCursors()
                    }
                    <Shape showToolTip={false} shape={this.state.shape}/>

                </svg>
            </div>
        );
    }
}

const mapStateToProos = (state) => {
    return {
        selectedTool: state.selectedTool,
        roomId: state.roomId,
        name: state.name
    }
}
const mapDispatchToProps = null;
// (dispatch) => {
//     return {
//         toolChanged:(selectedTool)=>dispatch(actionCreator.toolChanged(selectedTool))
//     }
// }
export default connect(mapStateToProos, mapDispatchToProps)(Canvas);