import { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
<<<<<<< HEAD
import {
  add_reminder,
  clear_reminder,
  remove_reminder,
} from "./actions/action";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
=======
import { add_reminder  } from "./actions/action";
>>>>>>> 119260feb30bc247a35ae37e88f502a5e8d850d8

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };

<<<<<<< HEAD
  rendeRreminder = () => {
    const { reminders } = this.props;

    return (
      <ul className="list-group">
        {reminders.map((reminder) => {
          return (
            <>
              <li key={reminder.id} className="list-group-item">
                <div className="text">{reminder.text}</div>
                <div className="date">{moment(new Date(reminder.date)).fromNow()}</div>
                <div
                  className="remove btn btn-danger"
                  onClick={() => this.props.remove_reminder(reminder.id)}
                >
                  X
                </div>
              </li>
            </>
          );
        })}
      </ul>
    );
  };

  render() {
    console.log(this.props);
=======

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
>>>>>>> 119260feb30bc247a35ae37e88f502a5e8d850d8
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
            max-length="20"
            className="form-control"
            onChange={(e) => this.setState({ text: e.target.value })}
            value={this.state.text}
          />
          {/* <input
            type="datetime-local"
            className="form-control"
            onChange={(e) => this.setState({ date: e.target.value })}
            value={this.state.date}
          /> */}
          <DatePicker
           className="input2"
            placeholderText="selet your time"
            value={this.state.date}
            selected={this.state.date}
            onChange={(date) => this.setState({ date: date })}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="MMMM d, yyy h:mm aa"
            timeCaption="time"
          />
          <button
            className="btn btn-primary btn-block"
<<<<<<< HEAD
            onClick={() => {
              this.props.add_reminder(this.state.text, this.state.date);
              this.setState({ text: "", date: "" });
            }}
          >
            Add Reminder
          </button>
          {this.rendeRreminder()}
          <button
            className="btn btn-danger btn-block "
            onClick={() => this.props.clear_reminder()}
          >
            Clear Reminder
          </button>
=======
            onClick={() => this.props.add_reminder(this.state.text, this.state.date)}
          >
            Add Reminder
          </button>
          {this.renderReminder()}
          <button className="btn btn-danger btn-block ">Clear Reminder</button>   
>>>>>>> 119260feb30bc247a35ae37e88f502a5e8d850d8
        </div>
      </>
    );
  }
}

<<<<<<< HEAD
export default connect(
  (state) => {
    return {
      reminders: state,
    };
  },
  { add_reminder, remove_reminder, clear_reminder }
)(App);
=======


export default connect(state => {
  console.log(state)
  return {
    reminders : state
  }
} , { add_reminder })(App);
>>>>>>> 119260feb30bc247a35ae37e88f502a5e8d850d8
