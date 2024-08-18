import { ADD_REMINDER } from "../action types/type";



export const add_reminder = (text , date) => {
    const action = {
        type:ADD_REMINDER,
        text,
        date,

        
    }

    console.log(action)
    return action
}