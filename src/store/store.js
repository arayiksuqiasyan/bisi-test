import {configureStore, combineReducers} from '@reduxjs/toolkit'
import rootReducer from "./reducers/root-reducer";
import {loadState} from "../helpers/rootStoreLocalStorage";

const reducers = combineReducers({root:rootReducer})

const store = configureStore({
    reducer: reducers,
    // preloadedState: loadState(),

})



export default store;
