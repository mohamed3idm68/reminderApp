import { ADD_REMINDER, CLEAR_REMINDER, REMOVE_REMINDER } from "../action types/type";
import { bake_cookie, read_cookie } from "sfcookies";

const Reminder = (state = [] , action) => {
    let reminders = [];

    state = read_cookie('reminders')

    if (action.type === ADD_REMINDER){
        reminders = [...state , {text:action.text , date: action.date , id: Math.random()}]
        console.log("from reducer", reminders)
        bake_cookie('reminders' , reminders)
        return reminders;
    } else if (action.type === REMOVE_REMINDER) {
           reminders= state.filter((reminder) => reminder.id !== action.id)
           bake_cookie('reminders' , reminders)
           return reminders;
    } else if (action.type=== CLEAR_REMINDER) {
        reminders = []
        bake_cookie('reminders' , reminders)
        return reminders
    }
    else{
       return state
    }
   
   
}


export default Reminder;