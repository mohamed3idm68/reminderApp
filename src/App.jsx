import { Component } from "react";
import "./App.css";
import { connect } from "react-redux";


import {
  add_reminder,
  clear_reminder,
  remove_reminder,
} from "./actions/action";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };


  

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
    console.log(this.props)
    return ( 
      <>
      
      <div className="App">
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
           className="form-control"
            placeholderText="select time"
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
       </div>
   </>

    )
     
  }}
    
      
     



export default connect(
  (state) => {
    return {
      reminders: state,
    };
  },
  { add_reminder, remove_reminder, clear_reminder }
)(App);



