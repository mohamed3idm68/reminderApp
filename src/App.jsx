import { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { add_reminder  } from "./actions/action";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };


     renderReminder = () => {
       const {reminders} = this.props
        
       return (
        <ul className="list-group">
              {
                reminders.map((reminder) => {
                  return (
                     <li className="list-group-item">
                         <div>{reminder.text}</div>
                         <div>{reminder.date}</div>
                     </li>
                  )
                })
              }
        </ul>
       )

     }

  render() {
    console.log(this.props)
    return (
      <>
        <div className="App">
          <im src="" />
          <div className="reminder-title">
            <h1>What Should you DO ?</h1>
          </div>
          <input
            type="text"
            placeholder="enter what do you think"
            className="form-control"
            onChange={(e) => this.setState({ text: e.target.value })}
          />
          <input
            type="datetime-local"
            className="form-control"
            onChange={(e) => this.setState({ date: e.target.value })}
          />
          <button
            className="btn btn-primary btn-block"
            onClick={() => this.props.add_reminder(this.state.text, this.state.date)}
          >
            Add Reminder
          </button>
          {this.renderReminder()}
          <button className="btn btn-danger btn-block ">Clear Reminder</button>   
        </div>
      </>
    );
  }
}



export default connect(state => {
  console.log(state)
  return {
    reminders : state
  }
} , { add_reminder })(App);
