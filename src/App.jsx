import { useRef, useState, useEffect } from "react";
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
import sounds from "../public/sounds/alarmSound.mp3";
import ReminderModal from "./components/ReminderModal";

function App(props) {
  const [values, setValues] = useState({
    text: "",
    date: new Date(),
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [reminderMessage, setReminderMessage] = useState("");
  const [showWindow, setShowWindow] = useState(false);

  const mainDate = new Date();

  const validateForm = () => {
    const { text, date } = values;
    let newErrors = {};
    let isValid = true;

    if (text.trim() === "") {
      newErrors.text = "Name is required";
      isValid = false;
    }

    if (date <= mainDate) {
      newErrors.date = "Date must be in the future";
      isValid = false;
    }

    setErrors(newErrors);
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

  const handleSetReminder = () => {
    const now = new Date();
    const reminderDate = new Date(values.date);

    if (reminderDate > now) {
      const timeout = reminderDate - now;
      setMessage(`Reminder set for ${reminderDate.toLocaleString()}`);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const id = setTimeout(() => {
        playSound();
        setMessage("Reminder: Time to take action!");
        // setReminderMessage("It is time");
        setShowWindow(true);
        console.log("right")
      }, timeout);

      setTimeoutId(id);
    } else {
      setMessage("Please set a future time.");
    }
  };

  const playSound = () => {
    const audio = new Audio(sounds);
    audio.play();
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const handleSnooze = () => {
    setShowWindow(false);
    // Implement snooze logic here
  };

  const handleComplete = () => {
    setShowWindow(false);
    // Implement complete logic here
  };

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

  return (
    <div className="App">
      {renderErrors()}
      {showWindow && (
        <ReminderModal 
          // message={reminderMessage}
          onSnooze={handleSnooze}
          onComplete={handleComplete}
          onClose={() => setShowWindow(false)}
        />
      )}
      <div className="reminder-title">
        <h1>What Should You Do?</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          placeholder="Enter what you think"
          maxLength="20"
          className="form-control"
          value={values.text}
          onChange={handleChange}
          required
        />
        {errors && <h3>{errors.text}</h3>}
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
        {/* {message && <div className="alert alert-info mt-3">{message}</div>} */}
        <button className="btn btn-primary btn-block" type="submit">
          Add Reminder
        </button>
        {renderReminder()}
        <button
          className="btn btn-danger btn-block"
          onClick={() => props.clear_reminder()}
        >
          Clear Reminders
        </button>
      </form>
    </div>
  );
}

export default connect(
  (state) => ({
    reminders: state,
  }),
  { add_reminder, remove_reminder, clear_reminder }
)(App);
