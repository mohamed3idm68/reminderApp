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
// import ClosedDatePicker from "./closeDays/CloseDate";

class App extends Component {
  state = {
    formData: {
      text: "",
      date: new Date(),
    },
    errors: {
      text: "",
      date: "",
    },
    
  };

     mainDate = new Date("2024-8-28");
     maxDate = new Date("2024-9-28");
  
  validatForm = () => {
    const { formData } = this.state;
    let errors = {};
    let isValid = true;

    if (!formData.text.trim()) {
      errors.text = "text is required";

      isValid = false;
    }

    if (!formData.date.trim()) {
      errors.date = "date is requiresd";
      isValid = "false";
    }

    this.setState(errors);
    return isValid;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validatForm()) {
      console.log("form submitted", this.state.formData);
    } else {
      console.log("form has errors");
    }
  };

  handleChange = (e) => {
    const data = (e.target.name = e.target.value);
    this.setState({
      formData: {
        ...this.state.formData,
        data,
      },
    });
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
                <div className="date">
                  {moment(new Date(reminder.date)).fromNow()}
                </div>
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
    const { formData, errors } = this.state;
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
          <DatePicker
           className="form-control"
            placeholderText="selet time"
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
