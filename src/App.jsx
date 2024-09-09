<<<<<<< HEAD
import { useRef, useState, useEffect } from "react";
=======
import { Component, useRef } from "react";
>>>>>>> 9909301408a257b75c69f5012da1a31c4798e2a4
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
<<<<<<< HEAD
import sounds from "../public/sounds/alarmSound.mp3";

function App(props) {
  const [values, setValues] = useState({
    text: "",
    date: new Date(),
  });

  const [errors, setErrors] = useState({
    text: 'name is requires',
    date: 'date is not right',
  });

  const [message, setMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  const mainDate = new Date();

  const validateForm = () => {
    const { text, date } = values;
    let newErrors = {};
    let isValid = true;

    if (text === "") {
      newErrors.text = "Name is required";
      isValid = false;
    }

    if (date === "") {
      newErrors.date = "Date is required";
      isValid = false;
    }

    setErrors(newErrors); // Set errors object directly

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      props.add_reminder(values.text, values.date);
      setValues({ text: "", date: new Date() });
      handleSetReminder();
    }
  };

  const handleDateChange = (date) => {
    setValues({ ...values, date });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
=======
import alarmSound from "./alarmSound/alarmSound.mp3"

class App extends Component {
  state = {
    text: "",
    date: new Date(),
    remindernotify: '',
    timeOutId: null,
  };





  minDate = new Date()
>>>>>>> 9909301408a257b75c69f5012da1a31c4798e2a4

  const handleSetReminder = () => {
    const now = new Date();
    const reminderDate = new Date(values.date);

    if (reminderDate > now) {
      const timeout = reminderDate - now;
      setMessage(`Reminder set for ${reminderDate.toLocaleString()}`);

      // Clear any existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set a new timeout
      const id = setTimeout(() => {
        playSound();
        setMessage('Reminder: Time to take action!');
      }, timeout);

      setTimeoutId(id);
    } else {
      setMessage('Please set a future time.');
    }
  };

  // Function to play the reminder sound
  const playSound = () => {
    const audio = new Audio(sounds);
    audio.play();
  };

  // Clean up the timeout when the component unmounts
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const renderErrors = () => {
    return Object.keys(errors).length > 0 ? (
      <div className="alert alert-danger">
        <strong>Error</strong>
        <ul>
          {Object.values(errors).map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </div>
    ) : null;
  };

  const renderReminder = () => {
    const { reminders } = props;

    return (
      <ul className="list-group">
        {reminders.map((reminder) => (
          <li key={reminder.id} className="list-group-item">
            <div className="text">{reminder.text}</div>
            <div className="date">
              {moment(new Date(reminder.date)).fromNow()}
            </div>
            <div
              className="remove btn btn-danger"
              onClick={() => props.remove_reminder(reminder.id)}
            >
              X
            </div>
          </li>
        ))}
      </ul>
    );
  };

<<<<<<< HEAD
  return (
    <div className="App">
      {renderErrors()}
      <div className="reminder-title">
        <h1>What Should you DO?</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Enter what do you think"
          maxLength="20"
          className="form-control"
          value={values.text}
          onChange={handleChange}
          required
        />
        <DatePicker
          className="form-control"
          placeholderText="Select time"
          selected={values.date}
          name="date"
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="MMMM d, yyyy h:mm aa"
          timeCaption="Time"
          minDate={mainDate}
        />
        {message && <div className="alert alert-info">{message}</div>}
        <button
          className="btn btn-primary btn-block"
          type="submit"
        >
          Add Reminder
        </button>
        {renderReminder()}
        <button
          className="btn btn-danger btn-block"
          onClick={() => props.clear_reminder()}
        >
          Clear Reminder
        </button>
      </form>
    </div>
  );
=======
  render() {
    console.log(this.props);


    

    return (
      <>
        <div className="App">
          <div className="reminder-title">
            <h1>What Should you DO ?</h1>
          </div>
          <form>
            <input
              type="text"
              placeholder="enter what do you think"
              max-length="20"
              className="form-control"
              onChange={(e) => this.setState({ text: e.target.value })}
              value={this.state.text}
              required
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
              minDate={this.minDate}
              required
            />
            <button
              className="btn btn-primary btn-block"
              type="submit"
              onClick={() => {
                if (this.state.text.trim() === "") {
                  return "";
                } else {
                  this.props.add_reminder(this.state.text, this.state.date);
                  this.setState({ text: "", date: "" });
                }
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
          </form>
        </div>
      </>
    );
  }
>>>>>>> 9909301408a257b75c69f5012da1a31c4798e2a4
}

export default connect(
  (state) => ({
    reminders: state,
  }),
  { add_reminder, remove_reminder, clear_reminder }
)(App);
