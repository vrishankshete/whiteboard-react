import React from 'react';
import {FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as actionCreator from '../store/actions'

class Home extends React.Component{
    enterRoom(){
        this.props.history.push('/'+this.props.roomId);
    }
    
    render(){
        return (
            <div>
                <span> Your Name:  </span><FormControl className="input-name" onBlur={(event)=>{this.props.nameEntered(event.target.value)}}/>
                <FormControl bsSize="lg" className="input-roomid" onBlur={(event)=>{this.props.roomIdEntered(event.target.value)}}/>
                <button onClick={()=>{this.enterRoom()}}>Enter Room</button>
            </div>
        );
    }
}

const mapStateToProos = (state) => {
    return {
        roomId: state.roomId,
        name: state.name
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        roomIdEntered:(roomId)=>dispatch(actionCreator.roomIdEntered(roomId)),
        nameEntered:(name)=>dispatch(actionCreator.nameEntered(name))
    }
}
export default connect(mapStateToProos, mapDispatchToProps)(Home);