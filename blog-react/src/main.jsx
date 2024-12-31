import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persist, store } from "./features/store";
import "./assets/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persist} loading={null}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);
