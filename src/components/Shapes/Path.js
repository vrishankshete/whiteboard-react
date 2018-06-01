import React from 'react';

export default class Path extends React.Component{
    render(){
        let {style, d} = this.props.attributes;
        return (
            <path style={style} d={d}/>
        );
    }
} 