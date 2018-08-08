import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from './actions';

class Home extends React.Component{

    constructor(props){
        super(props);
        this.name='';
        this.roomId='';
        this.state={
            errorMessage:''
        }
    }
    nameEntered(name){
        this.name=name;
    }
    roomIdEntered(roomId){
        this.roomId=roomId;  
    }
    enterRoom(){
        if(this.name === ''){
            this.setState({errorMessage:'Enter Name and 4 digit room id'});
            return;
        }
        if(isNaN(Number(this.roomId)) || this.roomId.length !== 4){
            this.setState({errorMessage:'Enter Name and 4 digit room id'});
            return;
        }
        this.props.nameEntered(this.name);
        this.props.roomIdEntered(this.roomId);
        this.props.history.push('/'+this.roomId);
    }
    
    render(){
        return (
            <div className="myStage">
                <br/><br/>
                <div className="form-group">
                    <div className="col-xs-4">
                        <label htmlFor="ex2">*Name:</label>
                        <input className="form-control" id="ex2" type="text" onBlur={(event)=>{this.nameEntered(event.target.value)}}/>
                    </div>
                    <div className="col-xs-4">
                        <label htmlFor="ex3">*Room Id:</label>
                        <input className="form-control" id="ex3" type="text" onBlur={(event)=>{this.roomIdEntered(event.target.value)}}/>
                    </div>
                </div>
                <br/><br/><br/>
                <button className="btn-primary" onClick={()=>{this.enterRoom()}}>Join Room</button>
                <div className="errorMessage">{this.state.errorMessage}</div>
                <div>A new room will be created if it does not exist</div>
            </div>
        );
    }
}

const mapStateToProos = (rootState) => {
    return {
        roomId: rootState.home.roomId,
        name: rootState.home.name
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        roomIdEntered:(roomId)=>dispatch(actionCreator.roomIdEntered(roomId)),
        nameEntered:(name)=>dispatch(actionCreator.nameEntered(name))
    }
}
export default connect(mapStateToProos, mapDispatchToProps)(Home);