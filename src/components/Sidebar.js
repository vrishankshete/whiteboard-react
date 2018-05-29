import React from 'react';
import {connect} from 'react-redux';
import * as actionCreator from '../store/actions';
import {Nav, NavItem} from 'react-bootstrap';

class Sidebar extends React.Component{
    changeTool(e){
        if(e==='clearAll'){
            this.props.socket.emit("clearAll");
        }
        else{
            this.props.toolChanged(e)
        }
    }
    render(){
        return (
            <Nav bsStyle="pills" stacked activeKey={this.props.selectedTool} onSelect={(e)=>this.changeTool(e)}>
                <NavItem eventKey='pen'> Pen </NavItem>
                <NavItem eventKey='pencil'> Pencil </NavItem>
                <NavItem eventKey='eraser'> Eraser </NavItem>
                <NavItem eventKey='rectangle'> Rectangle </NavItem>
                <NavItem eventKey='ellipse'> Ellipse </NavItem>
                <NavItem eventKey='clearAll'> Clear All </NavItem>
            </Nav>
        );
    }
}

const mapStateToProos = (state) => {
    return {
        selectedTool: state.selectedTool
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toolChanged:(selectedTool)=>dispatch(actionCreator.toolChanged(selectedTool))
    }
}
export default connect(mapStateToProos, mapDispatchToProps)(Sidebar);