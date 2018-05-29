let helper = {
    'rectangle': {
        initialValues:{
            width:1,
            height:1,
            x:0,
            y:0
        },
        getAttributes: function(cx, cy){
            let {x,y} = this.initialValues;
            if(x < cx && y < cy){
				return {x, y, width:cx-x, height:cy-y};
			}
			else if(x < cx && y > cy){
				return {x, y:cy, width:cx-x, height:y-cy};
			}
			else if(x > cx && y < cy){
				return {x:cx, y, width:x-cx, height:cy-y};
			}
			else if(x > cx && y > cy){
				return {x:cx, y:cy, width:x-cx, height:y-cy};
			}
			else{
				return {x:cx, y:cy, width:1, height:1};
			}
        }
    },
    'ellipse':{
        initialValues:{
            rx:1,
            ry:1,
            cx:0,
            cy:0
        },
        getEllipseCenter: function(start, end){
			return {
				cx: (start.x+end.x)/2,
				cy: (start.y+end.y)/2
			}
		},
		getRadii: function(startx, endx, starty, endy){
			return {rx:(endx.x-startx.x)/2, ry:(endy.y-starty.y)/2};
		},
        getAttributes: function(cx, cy){
            let {x,y} = this.initialValues;
            if(x < cx && y < cy){
				let {cx:acx, cy:acy} = this.getEllipseCenter({x:cx,y:cy}, {x:x, y:y});
				let {rx, ry} = this.getRadii({x:x},{x:cx},{y:y},{y:cy});
				return {cx:acx, cy:acy, rx, ry};
			}
			else if(x < cx && y > cy){
				let {cx:acx, cy:acy} = this.getEllipseCenter({x:cx,y:cy}, {x:x, y:y});
				let {rx, ry} = this.getRadii({x:x},{x:cx},{y:cy},{y:y});
				return {cx:acx, cy:acy, rx, ry};
			}
			else if(x > cx && y < cy){
				let {cx:acx, cy:acy} = this.getEllipseCenter({x:cx,y:cy}, {x:x, y:y});
				let {rx, ry} = this.getRadii({x:cx},{x:x},{y:y},{y:cy});
				return {cx:acx, cy:acy, rx, ry};
			}
			else if(x > cx && y > cy){
				let {cx:acx, cy:acy} = this.getEllipseCenter({x:cx,y:cy}, {x:x, y:y});
				let {rx, ry} = this.getRadii({x:cx},{x:x},{y:cy},{y:y});
				return {cx:acx, cy:acy, rx, ry};
			}
			else{
				return {cx:cx, cy:cy, rx:1, ry:1};
			}
        }
    }
}

export default helper;