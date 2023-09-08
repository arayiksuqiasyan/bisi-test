import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store'
import {Provider} from 'react-redux'
import {saveState} from "./helpers/rootStoreLocalStorage";
import debounce from "debounce";

// store.subscribe(
//     debounce(() => {
//         saveState(store.getState()).then();
//     }, 800)
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
