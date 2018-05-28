import React from 'react';
import {FormControl} from 'react-bootstrap';

class Home extends React.Component{

    constructor(){
        super();
        this.state = {
            roomId:0,
            name:'ABC'
        }
    }

    roomIdEntered(roomId){
        this.setState({roomId});
    }
    nameEntered(name){
        this.setState({name});
    }
    enterRoom(){
        this.props.history.push('/stage/'+this.state.roomId);
    }
    render(){
        return (
            <div>
                <span> Your Name:  </span><FormControl className="input-name" onBlur={(event)=>{this.nameEntered(event.target.value)}}/>
                <FormControl bsSize="lg" className="input-roomid" onBlur={(event)=>{this.roomIdEntered(event.target.value)}}/>
                <button onClick={()=>{this.enterRoom()}}>Enter Room</button>
            </div>
        );
    }
}

export default Home;