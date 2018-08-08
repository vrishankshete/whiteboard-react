import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar/Sidebar'
import Canvas from './Canvas';
//import * as actionCreator from './Home/actions';
import io from 'socket.io-client';
let socket;
class Stage extends React.Component{
    componentWillMount(){
        //let port = (window.location.port===0||window.location.port==='')?80:window.location.port;
        //socket = io(`${window.location.protocol}//${window.location.hostname}:${port}`);
        socket = io();
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
                <div className="col-sm-11 no-scroll"> 
                    RoomId: {this.props.roomId}  &nbsp;Name: {this.props.name}
                    <Canvas socket={socket}/>
                </div>
                <div className="col-sm-1"> 
                    <Sidebar socket={socket}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (rootState) => {
    return{
        roomId: rootState.home.roomId,
        name: rootState.home.name,
        selectedTool: rootState.sidebar.selectedTool
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         roomIdEntered:(roomId)=>dispatch(actionCreator.roomIdEntered(roomId)),
//         nameEntered:(name)=>dispatch(actionCreator.nameEntered(name))
//     }
// }
const mapDispatchToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(Stage);