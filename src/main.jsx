import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from "react-redux";
import Reminder from "./reducers/reducer.js";
import { createStore } from "redux";




const store = createStore(Reminder)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store ={store}>
      <App />
    </Provider>
  </StrictMode>
);
