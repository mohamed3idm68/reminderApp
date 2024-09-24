


const ReminderModal = ({ message, onSnooze, onComplete, onClose }) => {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>{message}</h2>
          <button onClick={onSnooze}>Snooze</button>
          <button onClick={onComplete}>Complete</button>
        </div>
      </div>
    );
  };
  

  export default ReminderModal;