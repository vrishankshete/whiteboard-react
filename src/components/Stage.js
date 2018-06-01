import React from 'react';
import {connect} from 'react-redux';
import Sidebar from './Sidebar'
import Canvas from './Canvas';

import io from 'socket.io-client';
const socket = io(`${window.location.protocol}//${window.location.hostname}:8082`);


class Stage extends React.Component{
    render(){
        console.log(socket);
        return (
            <div>
                <div className="col-sm-1"> 
                    <Sidebar socket={socket}/>
                </div>
                <div className="col-sm-8"> 
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

export default connect(mapStateToProps, null)(Stage);