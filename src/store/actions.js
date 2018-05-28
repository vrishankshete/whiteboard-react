const actionTypes = {
    INCREMENT:"INCREMENT",
    INCREMENT_ASYNC:"INCREMENT_ASYNC",
    DECREMENT:"DECREMENT",
    DECREMENT_ASYNC:"DECREMENT_ASYNC",
    ADD_COUNTER:"ADD_COUNTER",
    SUBTRACT_COUNTER:"SUBTRACT_COUNTER",
    SAVE_COUNTER:"SAVE_COUNTER",
    SOME_OTHER_ACTION:"SOME_OTHER_ACTION",
    SOME_ACTION:"SOME_ACTION"
}

export const someAction = ()=>{
    return {
        type:actionTypes.SOME_ACTION
    }
}

export const incrementSync = ()=>{
    return {
        type:actionTypes.INCREMENT
    }
}

export const increment = ()=>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(incrementSync());
        },2000);    
    }
}

export const decrement = ()=>{
    return {
        type:actionTypes.DECREMENT
    }
}

export const add_counter = (value)=>{
    return {
        type:actionTypes.ADD_COUNTER,
        payload:value
    }
}

export const subtract_counter = (value)=>{
    return {
        type:actionTypes.SUBTRACT_COUNTER,
        payload:value
    }
}

export const save_counter = ()=>{
    return {
        type:actionTypes.SAVE_COUNTER
    }
}

export default actionTypes;