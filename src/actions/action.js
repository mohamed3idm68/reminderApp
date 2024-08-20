import { ADD_REMINDER, CLEAR_REMINDER, REMOVE_REMINDER } from "../action types/type";



export const add_reminder = (text , date) => {
    const action = {
        type:ADD_REMINDER,
        text,
        date,

        
    }

    console.log(action)
    return action
}


export const remove_reminder = (id) => {
    const action = {
        type:REMOVE_REMINDER,
        id,
    }

    return action;
}

export const clear_reminder = () => {
    const action = {
        type:CLEAR_REMINDER,
        
    }

    return action;
}


