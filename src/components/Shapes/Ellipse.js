import React from 'react';

export default class Ellipse extends React.Component{
    render(){
        let {style, cx, cy, rx, ry} = this.props.attributes;
        return (
            <ellipse style={style} cx={cx} cy={cy} rx={rx} ry={ry}/>
        );
    }
} 