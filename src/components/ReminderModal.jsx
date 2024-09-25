import "./App.css"


const ReminderModal = ({ message, onSnooze, onComplete, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{message}</h2>
          <button className="btn btn-primary" onClick={onSnooze}>Snooze</button>
          <button className="btn btn-secondary" onClick={onComplete}>Complete</button>
        </div>
      </div>
    );
  };
  

  export default ReminderModal;