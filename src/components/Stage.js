import React from 'react';
import {connect} from 'react-redux';

class Stage extends React.Component{
    render(){
        return (
            <div>
                Stage : {this.props.match.params.roomId}
                {this.props.roomId}
                {this.props.name}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        roomId: state.roomId,
        name: state.name
    }
}

export default connect(mapStateToProps, null)(Stage);