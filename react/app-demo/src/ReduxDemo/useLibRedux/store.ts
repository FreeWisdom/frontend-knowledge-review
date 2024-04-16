// store.js
import { legacy_createStore as createStore } from "redux";
import rootReducer from "./actionAndReducer.ts";

const store = createStore(rootReducer);

export default store;
