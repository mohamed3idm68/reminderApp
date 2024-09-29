import { useState, useEffect, useRef } from "react";
import "./App.css";
import "../src/components/App.css"
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

function App(props) {
  const [values, setValues] = useState({
    text: "",
    date: new Date(),
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [showWindow, setShowWindow] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mainDate = new Date();
  const audioRef = useRef(new Audio(sounds)); // Create the audio reference

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

      const id = setTimeout(() => {
        playSound();  // Play sound when reminder time hits
        setMessage("Time to take action!");
        setShowWindow(true); // Show the modal when timeout occurs
        console.log("Modal should show now."); // Debug log

        return () => clearTimeout(id);
      }, timeout);

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      setTimeoutId(id);
    } else {
      setMessage("Please set a future time.");
    }
  };

  const playSound = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true); // Update state to reflect that the audio is playing
    }
  };

  const handleSnooze = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset the audio to start position
      setIsPlaying(false); // Update state to reflect that audio has stopped
    }
    setShowWindow(false); // Close the window after snooze
    // Implement snooze logic here (you can set another timeout if required)
  };

  const handleComplete = () => {
    if (isPlaying) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset the audio to start position
      setIsPlaying(false); // Update state to reflect that audio has stopped
    }
    setShowWindow(false); // Close the window after complete
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
        <div className="div1">
          <div className="div2">
            <span className="close" onClick={() => setShowWindow(false)}>&times;</span>
            <h2>It is time now!</h2>
            <button className="btn btn-primary" onClick={handleSnooze}>
              Snooze
            </button>
            <button className="btn btn-secondary" onClick={handleComplete}>
              Complete
            </button>
          </div>
        </div>
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
        {errors.text && <h6 style={{ color: "red" }}>{errors.text}</h6>}
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
        {message}
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
