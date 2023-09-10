import {initialState} from "../store/reducers/root-reducer";

const KEY = "root";

export function loadState() {
    try {
        const serializedState = localStorage.getItem(KEY);
        const defaultRepresentation = JSON.parse(serializedState)
        if (defaultRepresentation !== null) {
            return {root: {...initialState, defaultRepresentation}};
        }else{
            return undefined
        }
    } catch (e) {
        return undefined;
    }
}

export async function saveState(state) {
    try {
        const serializedState = JSON.stringify(state.root.defaultRepresentation);
        localStorage.setItem(KEY, serializedState);
    } catch (e) {
    }
}
