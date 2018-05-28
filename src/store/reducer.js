import actionTypes from './actions'

const initialState = {
    name:"ABC",
    roomId:0
}

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.ROOMID_ENTERED:
            return {...state, roomId: action.payload};
        break;
        case actionTypes.NAME_ENTERED:
            return {...state,
                name: action.payload
            }
        default :
            return state;
    }
}

export default rootReducer;