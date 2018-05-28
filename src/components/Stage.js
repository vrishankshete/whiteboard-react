import React from 'react';

class Stage extends React.Component{
    render(){
        return (
            <div>
                Stage : {this.props.match.params.roomId}
            </div>
        );
    }
}

export default Stage;