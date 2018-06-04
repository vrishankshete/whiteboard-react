import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar'
import Canvas from './Canvas';
import * as actionCreator from '../store/actions';
import io from 'socket.io-client';
let socket;
class Stage extends React.Component{
    componentWillMount(){
        socket = io(`${window.location.protocol}//${window.location.hostname}:8082`);        
        if(this.props.roomId === -1){
            this.props.history.push("/");
        }
        // socket.on('connect', () => {
        //     if(this.props.roomId === -1){
        //         // this.props.roomIdEntered(this.props.match.params.roomId);
        //         // this.props.nameEntered(socket.id);
        //     }
        // });
    }

    componentWillUnmount(){
        socket.disconnect();
    }

    render(){
        return (
            <div>
                <div className="col-sm-1"> 
                    <Sidebar socket={socket}/>
                </div>
                <div className="col-sm-8"> 
                    RoomId: {this.props.roomId}  &nbsp;Name: {this.props.name}
                    <Canvas socket={socket}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        roomId: state.roomId,
        name: state.name,
        selectedTool: state.selectedTool
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        roomIdEntered:(roomId)=>dispatch(actionCreator.roomIdEntered(roomId)),
        nameEntered:(name)=>dispatch(actionCreator.nameEntered(name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stage);