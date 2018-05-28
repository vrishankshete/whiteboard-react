import actionTypes from './actions'

const initialState = {
    counter:0,
    storedcounters:[]
}

const rootReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.SOME_OTHER_ACTION:
            console.log("SOME_OTHER_ACTION FIred", action.data);
            return state;
        break;
        case actionTypes.INCREMENT:
            //setTimeout(()=>console.log("Timeout"),2000);
            return {...state,
                counter: state.counter+1
            }
        case actionTypes.DECREMENT:
            return {...state,
                counter: state.counter-1                
            }
        case actionTypes.ADD_COUNTER:
            return {...state,
                counter: state.counter+action.payload                
            }
        case actionTypes.SUBTRACT_COUNTER:
            return {...state,
                counter: state.counter-action.payload                                
            }
        case actionTypes.SAVE_COUNTER:
        return {...state,
            storedcounters: state.storedcounters.concat(state.counter)                                
        }
        default :
            return state;
    }
}

export default rootReducer;