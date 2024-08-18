import { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { add_reminder } from "./actions/action";

class App extends Component {
  state = {
    text: "",
    date: new Date(),
  };

  render() {
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
            onClick={() => add_reminder(this.state.text, this.state.date)}
          >
            Add Reminder
          </button>
          <button className="btn btn-danger btn-block ">Clear Reminder</button>
        </div>
      </>
    );
  }
}

export default connect(null, { add_reminder })(App);
