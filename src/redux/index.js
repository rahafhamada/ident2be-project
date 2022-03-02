import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import companyReducer from "./company/company.reducer";
import personsReducer from "./persons/persons.reducer";
import uiReducer from "./ui/ui.redusers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ui"],
};

const rootReducer = combineReducers({
  person: personsReducer,
  ui: uiReducer,
  company: companyReducer,
});

export default persistReducer(persistConfig, rootReducer);
